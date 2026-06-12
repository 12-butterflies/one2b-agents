#!/usr/bin/env node
/**
 * Xero OAuth 2.0 Authorization Code Flow
 *
 * Run once with: npm run auth
 * Opens the browser, handles the callback, writes tokens to .env.
 */

import http from 'http';
import { URL } from 'url';
import crypto from 'crypto';
import axios from 'axios';
import * as path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { updateEnvFile } from './services/xero-client.js';
import {
  XERO_AUTH_URL,
  XERO_TOKEN_URL,
  XERO_CONNECTIONS_URL,
  REDIRECT_URI,
  AUTH_CALLBACK_PORT,
  SCOPES,
} from './constants.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ENV_PATH = path.resolve(__dirname, '../.env');
dotenv.config({ path: ENV_PATH });

const clientId = process.env.XERO_CLIENT_ID;
const clientSecret = process.env.XERO_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  console.error(
    'Error: XERO_CLIENT_ID and XERO_CLIENT_SECRET must be set in .env before running auth.'
  );
  process.exit(1);
}

const state = crypto.randomBytes(16).toString('hex');

const authUrl = new URL(XERO_AUTH_URL);
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('client_id', clientId);
authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
authUrl.searchParams.set('scope', SCOPES);
authUrl.searchParams.set('state', state);

console.log('\nXero OAuth 2.0 — Authorization Code Flow');
console.log('==========================================');
console.log('\nOpening browser to authorize Xero access...');
console.log('\nIf the browser does not open automatically, visit this URL:\n');
console.log(authUrl.toString());
console.log('\nWaiting for callback on http://localhost:8080/callback ...\n');

// Try to open browser
try {
  const { default: open } = await import('open');
  await open(authUrl.toString());
} catch {
  console.log('(Could not auto-open browser — paste the URL above manually.)');
}

// Start local HTTP server to receive callback
await new Promise<void>((resolve, reject) => {
  const server = http.createServer(async (req, res) => {
    if (!req.url?.startsWith('/callback')) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }

    const callbackUrl = new URL(req.url, `http://localhost:${AUTH_CALLBACK_PORT}`);
    const returnedState = callbackUrl.searchParams.get('state');
    const code = callbackUrl.searchParams.get('code');
    const error = callbackUrl.searchParams.get('error');

    if (error) {
      res.writeHead(400, { 'Content-Type': 'text/html' });
      res.end(`<h2>Authorization failed: ${error}</h2><p>Close this window and try again.</p>`);
      server.close();
      reject(new Error(`Xero authorization failed: ${error}`));
      return;
    }

    if (returnedState !== state) {
      res.writeHead(400, { 'Content-Type': 'text/html' });
      res.end('<h2>State mismatch — possible CSRF attack.</h2>');
      server.close();
      reject(new Error('State mismatch in OAuth callback'));
      return;
    }

    if (!code) {
      res.writeHead(400, { 'Content-Type': 'text/html' });
      res.end('<h2>No authorization code received.</h2>');
      server.close();
      reject(new Error('No code in OAuth callback'));
      return;
    }

    try {
      // Exchange code for tokens
      const tokenRes = await axios.post(
        XERO_TOKEN_URL,
        new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: REDIRECT_URI,
          client_id: clientId!,
          client_secret: clientSecret!,
        }).toString(),
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          timeout: 15000,
        }
      );

      const accessToken: string = tokenRes.data.access_token;
      const refreshToken: string = tokenRes.data.refresh_token;
      const expiresIn: number = tokenRes.data.expires_in;

      // Fetch tenant (organisation) list
      const connectionsRes = await axios.get<Array<{ tenantId: string; tenantName: string }>>(
        XERO_CONNECTIONS_URL,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
          timeout: 10000,
        }
      );

      const connections = connectionsRes.data;

      if (!connections.length) {
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end('<h2>No Xero organisations connected.</h2>');
        server.close();
        reject(new Error('No organisations returned from Xero connections endpoint'));
        return;
      }

      // Use the first organisation; list all for the user to pick from in console
      const tenantId = connections[0].tenantId;

      console.log('\n✓ Tokens received successfully!');
      console.log(`  Expires in: ${expiresIn}s`);
      console.log('\nConnected organisations:');
      connections.forEach((c, i) => {
        const marker = i === 0 ? ' ← selected (first)' : '';
        console.log(`  ${i + 1}. ${c.tenantName} (${c.tenantId})${marker}`);
      });
      if (connections.length > 1) {
        console.log(
          '\n  To use a different organisation, update XERO_TENANT_ID in .env manually.'
        );
      }

      // Write all tokens to .env
      updateEnvFile({
        XERO_ACCESS_TOKEN: accessToken,
        XERO_REFRESH_TOKEN: refreshToken,
        XERO_TENANT_ID: tenantId,
      });

      console.log('\n✓ .env updated with access token, refresh token, and tenant ID.');
      console.log('  You can now start the MCP server: npm start\n');

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`
        <html>
          <body style="font-family:sans-serif;max-width:500px;margin:80px auto;text-align:center">
            <h2>✓ Xero Connected</h2>
            <p>Organisation: <strong>${connections[0].tenantName}</strong></p>
            <p>Tokens saved. You can close this window and start the MCP server.</p>
          </body>
        </html>
      `);

      server.close();
      resolve();
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'text/html' });
      res.end(`<h2>Token exchange failed</h2><pre>${err}</pre>`);
      server.close();
      reject(err);
    }
  });

  server.listen(AUTH_CALLBACK_PORT, () => {
    // Server is listening — browser was already opened above
  });

  server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      reject(
        new Error(
          `Port ${AUTH_CALLBACK_PORT} is already in use. Stop any other process on that port and try again.`
        )
      );
    } else {
      reject(err);
    }
  });
});
