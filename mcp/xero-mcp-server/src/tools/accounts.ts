import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { xeroGet, handleXeroError } from '../services/xero-client.js';
import type { XeroAccount, AccountRecord, PaginatedResponse } from '../types.js';
import { CHARACTER_LIMIT, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../constants.js';

function normaliseAccount(a: XeroAccount): AccountRecord {
  return {
    account_id: a.AccountID,
    code: a.Code ?? '',
    name: a.Name,
    type: a.Type,
    class: a.Class ?? '',
    status: a.Status,
    description: a.Description ?? '',
    tax_type: a.TaxType ?? '',
  };
}

const ACCOUNT_TYPES = [
  'BANK', 'CURRENT', 'CURRLIAB', 'DEPRECIATN', 'DIRECTCOSTS', 'EQUITY',
  'EXPENSE', 'FIXED', 'INVENTORY', 'LIABILITY', 'NONCURRENT', 'OTHERINCOME',
  'OVERHEADS', 'PREPAYMENT', 'REVENUE', 'SALES', 'TERMLIAB', 'PAYGLIABILITY',
  'SUPERANNUATIONEXPENSE', 'SUPERANNUATIONLIABILITY', 'WAGESEXPENSE', 'ALL',
] as const;

const GetAccountsInputSchema = z
  .object({
    type: z
      .enum(ACCOUNT_TYPES)
      .default('ALL')
      .describe(
        "Account type filter. Common values: 'BANK', 'REVENUE', 'EXPENSE', 'EQUITY', 'CURRENT', 'CURRLIAB', 'ALL'."
      ),
    status: z
      .enum(['ACTIVE', 'ARCHIVED', 'ALL'])
      .default('ACTIVE')
      .describe("Account status: 'ACTIVE' (default), 'ARCHIVED', or 'ALL'."),
    limit: z
      .number()
      .int()
      .min(1)
      .max(MAX_PAGE_SIZE)
      .default(DEFAULT_PAGE_SIZE)
      .describe('Maximum accounts to return (1-100, default 20).'),
    offset: z
      .number()
      .int()
      .min(0)
      .default(0)
      .describe('Pagination offset.'),
  })
  .strict();

type GetAccountsInput = z.infer<typeof GetAccountsInputSchema>;

export function registerAccountsTool(server: McpServer): void {
  server.registerTool(
    'xero_get_accounts',
    {
      title: 'Get Xero Chart of Accounts',
      description: `List the chart of accounts from Xero with type, class, and status.

This returns the full chart of accounts — income, expense, asset, liability, and equity accounts.

Args:
  - type: account type filter (BANK / REVENUE / EXPENSE / EQUITY / CURRENT / CURRLIAB / ALL)
  - status: 'ACTIVE' | 'ARCHIVED' | 'ALL' (default: 'ACTIVE')
  - limit: 1-100 results (default 20)
  - offset: pagination offset (default 0)

Returns JSON with fields:
  total, count, offset, has_more, next_offset,
  data[]: { account_id, code, name, type, class, status, description, tax_type }

Note: Xero does not return real-time balances via this endpoint.
      Use get_bank_transactions or get_invoices for financial balances.

Examples:
  - "Show bank accounts" → type='BANK'
  - "Show all expense accounts" → type='EXPENSE'
  - "Show revenue accounts" → type='REVENUE'`,
      inputSchema: GetAccountsInputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: true,
      },
    },
    async (params: GetAccountsInput) => {
      try {
        const apiParams: Record<string, string | number | boolean> = {};
        if (params.type !== 'ALL') apiParams['Type'] = params.type;
        if (params.status !== 'ALL') apiParams['Status'] = params.status;

        const data = await xeroGet<{ Accounts: XeroAccount[] }>('/Accounts', apiParams);
        const all = data.Accounts ?? [];

        const sliced = all.slice(params.offset, params.offset + params.limit);
        const normalised = sliced.map(normaliseAccount);

        const response: PaginatedResponse<AccountRecord> = {
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
