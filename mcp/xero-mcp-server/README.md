# Xero MCP Server

Read-only MCP server for Xero accounting data. Exposes 5 tools for invoices, payments, bank transactions, accounts, and contacts. Runs via stdio — compatible with Claude Desktop and Cowork.

---

## Tools

| Tool | Description |
|---|---|
| `xero_get_invoices` | List invoices with status, amounts, contact, dates |
| `xero_get_payments` | List payments with amount, date, account, reference |
| `xero_get_bank_transactions` | List bank transactions with amount, date, description, type |
| `xero_get_accounts` | List chart of accounts with type and class |
| `xero_get_contacts` | List customers/suppliers with email and outstanding balances |

---

## Setup

### Step 1 — Register your app in the Xero Developer Portal

1. Go to [developer.xero.com/app-manager](https://developer.xero.com/app-manager)
2. Click **New app**
3. Fill in:
   - **App name**: `One 2b MCP` (or anything you like)
   - **Integration type**: Web app
   - **Company or application URL**: `http://localhost`
   - **Redirect URI**: `http://localhost:8080/callback`  ← **exact value, no trailing slash**
4. Save the app
5. Copy the **Client ID** and **Client Secret**

### Step 2 — Create your .env file

```bash
cp .env.example .env
```

Open `.env` and fill in:

```
XERO_CLIENT_ID=paste_your_client_id_here
XERO_CLIENT_SECRET=paste_your_client_secret_here
```

Leave `XERO_TENANT_ID`, `XERO_ACCESS_TOKEN`, and `XERO_REFRESH_TOKEN` blank — they are filled in automatically by the auth flow.

### Step 3 — Install dependencies and build

```bash
npm install
npm run build
```

### Step 4 — Run the OAuth flow

```bash
npm run auth
```

This will:
1. Open your browser to the Xero login page
2. Ask you to authorise the app for your Xero organisation
3. Receive the callback at `http://localhost:8080/callback`
4. Exchange the code for tokens
5. Write `XERO_ACCESS_TOKEN`, `XERO_REFRESH_TOKEN`, and `XERO_TENANT_ID` to your `.env`

If you have multiple Xero organisations, the first one is selected automatically. Edit `XERO_TENANT_ID` in `.env` to switch organisations.

---

## Required .env Variables

| Variable | Where to get it | Set manually? |
|---|---|---|
| `XERO_CLIENT_ID` | Xero Developer Portal | Yes |
| `XERO_CLIENT_SECRET` | Xero Developer Portal | Yes |
| `XERO_TENANT_ID` | Set by `npm run auth` | Auto |
| `XERO_ACCESS_TOKEN` | Set by `npm run auth` | Auto |
| `XERO_REFRESH_TOKEN` | Set by `npm run auth` | Auto |

---

## Token Refresh

Access tokens expire after 30 minutes. The server refreshes them automatically on any 401 response, saves the new tokens back to `.env`, and retries the request transparently. Refresh tokens are long-lived (60 days) but reset each time they are used.

---

## Adding to Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "xero": {
      "command": "node",
      "args": ["/Users/jasonpeterstevens/one2b-agents/mcp/xero-mcp-server/dist/index.js"],
      "env": {
        "XERO_CLIENT_ID": "your_client_id",
        "XERO_CLIENT_SECRET": "your_client_secret",
        "XERO_TENANT_ID": "your_tenant_id",
        "XERO_ACCESS_TOKEN": "your_access_token",
        "XERO_REFRESH_TOKEN": "your_refresh_token"
      }
    }
  }
}
```

Or use the `.plugin` file for Cowork installation (see below).

---

## Scopes

The OAuth flow requests these Xero scopes:

- `accounting.transactions.read`
- `accounting.contacts.read`
- `accounting.accounts.read`
- `accounting.bankstatements.read`
- `offline_access` (enables refresh tokens)
- `openid profile email`

---

## Development

```bash
npm run dev      # TypeScript watch mode
npm run build    # Compile to dist/
npm start        # Run compiled server
npm run auth     # Re-run OAuth flow
```

Logs go to stderr (as required by stdio MCP servers). stdout is reserved for the MCP protocol.

---

## Notes

- All tools are read-only (`readOnlyHint: true`). No data is written to Xero.
- Xero's free API tier allows 60 requests/minute and 5,000 requests/day.
- The `get_accounts` tool does not return live balances — use Xero's Reports API for P&L/Balance Sheet (out of scope for this server).
- Dates are normalised from Xero's `/Date(ms)/` format to ISO `YYYY-MM-DD`.
