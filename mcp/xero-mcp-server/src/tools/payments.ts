import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { xeroGet, handleXeroError } from '../services/xero-client.js';
import type { XeroPayment, PaymentRecord, PaginatedResponse } from '../types.js';
import { CHARACTER_LIMIT, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../constants.js';

function parseXeroDate(xeroDate: string | undefined): string {
  if (!xeroDate) return '';
  const match = xeroDate.match(/\/Date\((\d+)([+-]\d{4})?\)\//);
  if (match) return new Date(parseInt(match[1])).toISOString().split('T')[0];
  return xeroDate;
}

function normalisePayment(p: XeroPayment): PaymentRecord {
  return {
    payment_id: p.PaymentID,
    date: parseXeroDate(p.Date),
    amount: p.Amount ?? 0,
    reference: p.Reference ?? '',
    payment_type: p.PaymentType ?? '',
    account_name: p.Account?.Name ?? '',
    account_code: p.Account?.Code ?? '',
    invoice_number: p.Invoice?.InvoiceNumber ?? '',
    contact_name: p.Invoice?.Contact?.Name ?? '',
  };
}

const GetPaymentsInputSchema = z
  .object({
    status: z
      .enum(['AUTHORISED', 'DELETED', 'ALL'])
      .default('AUTHORISED')
      .describe("Payment status: 'AUTHORISED' for confirmed payments, 'ALL' for all."),
    limit: z
      .number()
      .int()
      .min(1)
      .max(MAX_PAGE_SIZE)
      .default(DEFAULT_PAGE_SIZE)
      .describe('Maximum payments to return (1-100, default 20).'),
    offset: z
      .number()
      .int()
      .min(0)
      .default(0)
      .describe('Pagination offset.'),
  })
  .strict();

type GetPaymentsInput = z.infer<typeof GetPaymentsInputSchema>;

export function registerPaymentsTool(server: McpServer): void {
  server.registerTool(
    'xero_get_payments',
    {
      title: 'Get Xero Payments',
      description: `List payments received/made in Xero with amount, date, account, and reference.

Payments are records of money received against invoices or made against bills.

Args:
  - status: 'AUTHORISED' | 'DELETED' | 'ALL' (default: 'AUTHORISED')
  - limit: 1-100 results (default 20)
  - offset: pagination offset (default 0)

Returns JSON with fields:
  total, count, offset, has_more, next_offset,
  data[]: { payment_id, date, amount, reference, payment_type,
            account_name, account_code, invoice_number, contact_name }

Examples:
  - "Show all payments" → default params
  - "Page 2 of payments" → offset=20`,
      inputSchema: GetPaymentsInputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: true,
      },
    },
    async (params: GetPaymentsInput) => {
      try {
        const apiParams: Record<string, string | number | boolean> = {};
        if (params.status !== 'ALL') {
          apiParams['Status'] = params.status;
        }

        const data = await xeroGet<{ Payments: XeroPayment[] }>('/Payments', apiParams);
        const all = data.Payments ?? [];

        const sliced = all.slice(params.offset, params.offset + params.limit);
        const normalised = sliced.map(normalisePayment);

        const response: PaginatedResponse<PaymentRecord> = {
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
