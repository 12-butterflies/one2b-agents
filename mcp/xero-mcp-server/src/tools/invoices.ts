import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { xeroGet, handleXeroError } from '../services/xero-client.js';
import type { XeroInvoice, InvoiceRecord, PaginatedResponse } from '../types.js';
import { CHARACTER_LIMIT, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../constants.js';

function parseXeroDate(xeroDate: string | undefined): string {
  if (!xeroDate) return '';
  // Xero returns dates as /Date(milliseconds+offset)/
  const match = xeroDate.match(/\/Date\((\d+)([+-]\d{4})?\)\//);
  if (match) {
    return new Date(parseInt(match[1])).toISOString().split('T')[0];
  }
  return xeroDate;
}

function normaliseInvoice(inv: XeroInvoice): InvoiceRecord {
  return {
    invoice_id: inv.InvoiceID,
    invoice_number: inv.InvoiceNumber ?? '',
    type: inv.Type === 'ACCREC' ? 'Sales Invoice' : 'Bill',
    status: inv.Status,
    contact_name: inv.Contact?.Name ?? '',
    date: parseXeroDate(inv.Date),
    due_date: parseXeroDate(inv.DueDate),
    amount_due: inv.AmountDue ?? 0,
    amount_paid: inv.AmountPaid ?? 0,
    total: inv.Total ?? 0,
    currency: inv.CurrencyCode ?? 'USD',
    reference: inv.Reference ?? '',
  };
}

const GetInvoicesInputSchema = z
  .object({
    status: z
      .enum(['DRAFT', 'SUBMITTED', 'DELETED', 'AUTHORISED', 'VOIDED', 'PAID', 'ALL'])
      .default('AUTHORISED')
      .describe("Invoice status filter. Use 'AUTHORISED' for active invoices, 'PAID' for paid, 'ALL' for all."),
    type: z
      .enum(['ACCREC', 'ACCPAY', 'ALL'])
      .default('ALL')
      .describe("Invoice type: 'ACCREC' for sales invoices, 'ACCPAY' for bills, 'ALL' for both."),
    contact_name: z
      .string()
      .optional()
      .describe('Optional: filter by contact/customer name (partial match).'),
    limit: z
      .number()
      .int()
      .min(1)
      .max(MAX_PAGE_SIZE)
      .default(DEFAULT_PAGE_SIZE)
      .describe('Maximum invoices to return (1-100, default 20).'),
    offset: z
      .number()
      .int()
      .min(0)
      .default(0)
      .describe('Pagination offset — number of invoices to skip.'),
  })
  .strict();

type GetInvoicesInput = z.infer<typeof GetInvoicesInputSchema>;

export function registerInvoicesTool(server: McpServer): void {
  server.registerTool(
    'xero_get_invoices',
    {
      title: 'Get Xero Invoices',
      description: `List invoices from Xero with status, amounts, contact name, dates.

Returns both sales invoices (ACCREC) and bills (ACCPAY) depending on the type filter.

Args:
  - status: 'AUTHORISED' | 'PAID' | 'DRAFT' | 'VOIDED' | 'ALL' (default: 'AUTHORISED')
  - type: 'ACCREC' (sales) | 'ACCPAY' (bills) | 'ALL' (default: 'ALL')
  - contact_name: optional partial name filter
  - limit: 1-100 results (default 20)
  - offset: pagination offset (default 0)

Returns JSON with fields:
  total, count, offset, has_more, next_offset,
  data[]: { invoice_id, invoice_number, type, status, contact_name, date,
            due_date, amount_due, amount_paid, total, currency, reference }

Examples:
  - "Show outstanding invoices" → status='AUTHORISED'
  - "Show paid bills" → type='ACCPAY', status='PAID'
  - "Invoices for Acme Corp" → contact_name='Acme'`,
      inputSchema: GetInvoicesInputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: true,
      },
    },
    async (params: GetInvoicesInput) => {
      try {
        const apiParams: Record<string, string | number | boolean> = {
          page: Math.floor(params.offset / 100) + 1,
          unitdp: 2,
        };

        // Xero API only accepts a single status or uses "where" clause
        if (params.status !== 'ALL') {
          apiParams['Statuses'] = params.status;
        }
        if (params.type !== 'ALL') {
          apiParams['Type'] = params.type;
        }
        if (params.contact_name) {
          apiParams['ContactName'] = params.contact_name;
        }

        const data = await xeroGet<{ Invoices: XeroInvoice[] }>('/Invoices', apiParams);
        const all = data.Invoices ?? [];

        // Apply client-side pagination within the page
        const sliced = all.slice(params.offset % 100, (params.offset % 100) + params.limit);
        const normalised = sliced.map(normaliseInvoice);

        const response: PaginatedResponse<InvoiceRecord> = {
          total: all.length,
          count: normalised.length,
          offset: params.offset,
          has_more: all.length > (params.offset % 100) + params.limit,
          ...(all.length > (params.offset % 100) + params.limit
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
          (response as unknown as Record<string, unknown>).truncation_message =
            `Response truncated to ${truncated.length} invoices. Use offset to page.`;
          text = JSON.stringify(response, null, 2);
        }

        return { content: [{ type: 'text', text }], structuredContent: response };
      } catch (err) {
        return { content: [{ type: 'text', text: handleXeroError(err) }] };
      }
    }
  );
}
