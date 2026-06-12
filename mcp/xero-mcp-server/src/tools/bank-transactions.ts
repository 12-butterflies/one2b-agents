import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { xeroGet, handleXeroError } from '../services/xero-client.js';
import type { XeroBankTransaction, BankTransactionRecord, PaginatedResponse } from '../types.js';
import { CHARACTER_LIMIT, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../constants.js';

function parseXeroDate(xeroDate: string | undefined): string {
  if (!xeroDate) return '';
  const match = xeroDate.match(/\/Date\((\d+)([+-]\d{4})?\)\//);
  if (match) return new Date(parseInt(match[1])).toISOString().split('T')[0];
  return xeroDate;
}

function getDescription(txn: XeroBankTransaction): string {
  if (txn.LineItems && txn.LineItems.length > 0) {
    const desc = txn.LineItems[0].Description;
    if (desc) return desc;
  }
  return txn.Reference ?? '';
}

function normaliseBankTxn(txn: XeroBankTransaction): BankTransactionRecord {
  return {
    bank_transaction_id: txn.BankTransactionID,
    type: txn.Type ?? '',
    date: parseXeroDate(txn.Date),
    total: txn.Total ?? 0,
    reference: txn.Reference ?? '',
    description: getDescription(txn),
    status: txn.Status ?? '',
    is_reconciled: txn.IsReconciled ?? false,
    bank_account_name: txn.BankAccount?.Name ?? '',
    contact_name: txn.Contact?.Name ?? '',
  };
}

const GetBankTransactionsInputSchema = z
  .object({
    status: z
      .enum(['AUTHORISED', 'DELETED', 'ALL'])
      .default('AUTHORISED')
      .describe("Transaction status: 'AUTHORISED' for confirmed, 'ALL' for all."),
    type: z
      .enum(['SPEND', 'RECEIVE', 'SPEND-OVERPAYMENT', 'RECEIVE-OVERPAYMENT', 'ALL'])
      .default('ALL')
      .describe("Transaction type: 'SPEND' for outgoing, 'RECEIVE' for incoming, 'ALL' for both."),
    limit: z
      .number()
      .int()
      .min(1)
      .max(MAX_PAGE_SIZE)
      .default(DEFAULT_PAGE_SIZE)
      .describe('Maximum transactions to return (1-100, default 20).'),
    offset: z
      .number()
      .int()
      .min(0)
      .default(0)
      .describe('Pagination offset.'),
  })
  .strict();

type GetBankTransactionsInput = z.infer<typeof GetBankTransactionsInputSchema>;

export function registerBankTransactionsTool(server: McpServer): void {
  server.registerTool(
    'xero_get_bank_transactions',
    {
      title: 'Get Xero Bank Transactions',
      description: `List bank transactions in Xero with amount, date, description, and type.

Bank transactions are spend/receive records linked to bank accounts, separate from invoice payments.

Args:
  - status: 'AUTHORISED' | 'DELETED' | 'ALL' (default: 'AUTHORISED')
  - type: 'SPEND' | 'RECEIVE' | 'ALL' (default: 'ALL')
  - limit: 1-100 results (default 20)
  - offset: pagination offset (default 0)

Returns JSON with fields:
  total, count, offset, has_more, next_offset,
  data[]: { bank_transaction_id, type, date, total, reference, description,
            status, is_reconciled, bank_account_name, contact_name }

Examples:
  - "Show all bank transactions" → default params
  - "Show only incoming" → type='RECEIVE'
  - "Unreconciled spend" → type='SPEND'`,
      inputSchema: GetBankTransactionsInputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: true,
      },
    },
    async (params: GetBankTransactionsInput) => {
      try {
        const apiParams: Record<string, string | number | boolean> = {};
        if (params.status !== 'ALL') apiParams['Status'] = params.status;
        if (params.type !== 'ALL') apiParams['Type'] = params.type;

        const data = await xeroGet<{ BankTransactions: XeroBankTransaction[] }>(
          '/BankTransactions',
          apiParams
        );
        const all = data.BankTransactions ?? [];

        const sliced = all.slice(params.offset, params.offset + params.limit);
        const normalised = sliced.map(normaliseBankTxn);

        const response: PaginatedResponse<BankTransactionRecord> = {
          total: all.length,
          count: normalised.length,
          offset: params.offset,
          has_more: all.length > params.offset + params.limit,
          ...(all.length > params.offset + params.limit
            ? { next_offset: params.offset + params.limit }
            : {}),
          data: normalised,
        };

        let text = JSON.stringify(response, null, 2);
        if (text.length > CHARACTER_LIMIT) {
          const truncated = normalised.slice(0, Math.max(1, Math.floor(normalised.length / 2)));
          response.data = truncated;
          response.count = truncated.length;
          (response as unknown as Record<string, unknown>).truncated = true;
          text = JSON.stringify(response, null, 2);
        }

        return { content: [{ type: 'text', text }], structuredContent: response };
      } catch (err) {
        return { content: [{ type: 'text', text: handleXeroError(err) }] };
      }
    }
  );
}
