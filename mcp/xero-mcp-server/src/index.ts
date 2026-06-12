#!/usr/bin/env node
/**
 * Xero MCP Server — stdio transport
 *
 * Exposes 5 read-only tools for Xero accounting data:
 *   xero_get_invoices, xero_get_payments, xero_get_bank_transactions,
 *   xero_get_accounts, xero_get_contacts
 *
 * Prerequisites: run "npm run auth" once to complete OAuth flow.
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { initTokens } from './services/xero-client.js';
import { registerInvoicesTool } from './tools/invoices.js';
import { registerPaymentsTool } from './tools/payments.js';
import { registerBankTransactionsTool } from './tools/bank-transactions.js';
import { registerAccountsTool } from './tools/accounts.js';
import { registerContactsTool } from './tools/contacts.js';

const server = new McpServer({
  name: 'xero-mcp-server',
  version: '1.0.0',
});

// Register all tools
registerInvoicesTool(server);
registerPaymentsTool(server);
registerBankTransactionsTool(server);
registerAccountsTool(server);
registerContactsTool(server);

async function main(): Promise<void> {
  // Load and validate tokens from .env
  try {
    initTokens();
  } catch (err) {
    console.error(
      `[xero-mcp] Auth error: ${err instanceof Error ? err.message : String(err)}`
    );
    console.error('[xero-mcp] Run "npm run auth" to complete OAuth setup.');
    process.exit(1);
  }

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('[xero-mcp] Server running via stdio');
}

main().catch((err) => {
  console.error('[xero-mcp] Fatal error:', err);
  process.exit(1);
});
