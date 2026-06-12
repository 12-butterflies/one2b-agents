import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { xeroGet, handleXeroError } from '../services/xero-client.js';
import type { XeroContact, ContactRecord, PaginatedResponse } from '../types.js';
import { CHARACTER_LIMIT, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from '../constants.js';

function normaliseContact(c: XeroContact): ContactRecord {
  return {
    contact_id: c.ContactID,
    name: c.Name,
    email: c.EmailAddress ?? '',
    is_customer: c.IsCustomer ?? false,
    is_supplier: c.IsSupplier ?? false,
    accounts_receivable_outstanding:
      c.Balances?.AccountsReceivable?.Outstanding ?? 0,
    accounts_receivable_overdue:
      c.Balances?.AccountsReceivable?.Overdue ?? 0,
    accounts_payable_outstanding:
      c.Balances?.AccountsPayable?.Outstanding ?? 0,
    accounts_payable_overdue:
      c.Balances?.AccountsPayable?.Overdue ?? 0,
  };
}

const GetContactsInputSchema = z
  .object({
    role: z
      .enum(['CUSTOMER', 'SUPPLIER', 'ALL'])
      .default('ALL')
      .describe(
        "Contact role: 'CUSTOMER' (has sales invoices), 'SUPPLIER' (has bills), 'ALL' for both."
      ),
    name_filter: z
      .string()
      .optional()
      .describe('Optional: partial name search (case-insensitive).'),
    include_archived: z
      .boolean()
      .default(false)
      .describe('Include archived/inactive contacts.'),
    limit: z
      .number()
      .int()
      .min(1)
      .max(MAX_PAGE_SIZE)
      .default(DEFAULT_PAGE_SIZE)
      .describe('Maximum contacts to return (1-100, default 20).'),
    offset: z
      .number()
      .int()
      .min(0)
      .default(0)
      .describe('Pagination offset.'),
  })
  .strict();

type GetContactsInput = z.infer<typeof GetContactsInputSchema>;

export function registerContactsTool(server: McpServer): void {
  server.registerTool(
    'xero_get_contacts',
    {
      title: 'Get Xero Contacts',
      description: `List contacts (customers and/or suppliers) from Xero with name, email, and outstanding balances.

Returns both customers (entities with sales invoices) and suppliers (entities with bills), depending on the role filter.

Args:
  - role: 'CUSTOMER' | 'SUPPLIER' | 'ALL' (default: 'ALL')
  - name_filter: optional partial name search
  - include_archived: include inactive contacts (default false)
  - limit: 1-100 results (default 20)
  - offset: pagination offset (default 0)

Returns JSON with fields:
  total, count, offset, has_more, next_offset,
  data[]: { contact_id, name, email, is_customer, is_supplier,
            accounts_receivable_outstanding, accounts_receivable_overdue,
            accounts_payable_outstanding, accounts_payable_overdue }

Note: Balance fields show outstanding amounts owed to/from you.

Examples:
  - "List all customers" → role='CUSTOMER'
  - "Find supplier called Acme" → role='SUPPLIER', name_filter='Acme'
  - "Who owes us money?" → role='CUSTOMER' then check accounts_receivable_outstanding`,
      inputSchema: GetContactsInputSchema,
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        idempotentHint: true,
        openWorldHint: true,
      },
    },
    async (params: GetContactsInput) => {
      try {
        const apiParams: Record<string, string | number | boolean> = {
          includeArchived: params.include_archived,
        };

        if (params.role === 'CUSTOMER') apiParams['IsCustomer'] = true;
        if (params.role === 'SUPPLIER') apiParams['IsSupplier'] = true;
        if (params.name_filter) apiParams['SearchTerm'] = params.name_filter;

        const data = await xeroGet<{ Contacts: XeroContact[] }>('/Contacts', apiParams);
        let all = data.Contacts ?? [];

        // Client-side name filter fallback if Xero SearchTerm not supported
        if (params.name_filter) {
          const q = params.name_filter.toLowerCase();
          all = all.filter(
            (c) =>
              c.Name.toLowerCase().includes(q) ||
              (c.EmailAddress ?? '').toLowerCase().includes(q)
          );
        }

        const sliced = all.slice(params.offset, params.offset + params.limit);
        const normalised = sliced.map(normaliseContact);

        const response: PaginatedResponse<ContactRecord> = {
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
