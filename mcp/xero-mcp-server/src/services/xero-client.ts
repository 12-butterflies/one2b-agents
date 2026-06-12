import axios, { AxiosError } from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { XERO_TOKEN_URL, XERO_API_BASE } from '../constants.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// .env lives at the project root (two levels up from src/services/)
const ENV_PATH = path.resolve(__dirname, '../../.env');

export function loadEnv(): void {
  dotenv.config({ path: ENV_PATH });
}

export function updateEnvFile(updates: Record<string, string>): void {
  let content = '';
  try {
    content = fs.readFileSync(ENV_PATH, 'utf-8');
  } catch {
    content = '';
  }

  const lines = content.split('\n');
  const lineIndex: Record<string, number> = {};

  lines.forEach((line, i) => {
    const match = line.match(/^([A-Z_0-9]+)=/);
    if (match) lineIndex[match[1]] = i;
  });

  for (const [key, value] of Object.entries(updates)) {
    const escaped = value.replace(/\n/g, '\\n');
    const newLine = `${key}=${escaped}`;
    if (key in lineIndex) {
      lines[lineIndex[key]] = newLine;
    } else {
      lines.push(newLine);
    }
  }

  const cleaned = lines.filter((l) => l.trim() !== '');
  fs.writeFileSync(ENV_PATH, cleaned.join('\n') + '\n');
}

// Module-level token state — refreshed in place
let _accessToken: string | null = null;
let _refreshToken: string | null = null;

export function initTokens(): void {
  loadEnv();
  _accessToken = process.env.XERO_ACCESS_TOKEN ?? null;
  _refreshToken = process.env.XERO_REFRESH_TOKEN ?? null;

  if (!_accessToken || !_refreshToken) {
    throw new Error(
      'Missing Xero tokens. Run "npm run auth" to complete OAuth flow first.'
    );
  }
}

async function doRefresh(): Promise<void> {
  if (!_refreshToken) {
    throw new Error('No refresh token. Run "npm run auth" to re-authenticate.');
  }

  const clientId = process.env.XERO_CLIENT_ID;
  const clientSecret = process.env.XERO_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('XERO_CLIENT_ID and XERO_CLIENT_SECRET must be set in .env');
  }

  const response = await axios.post(
    XERO_TOKEN_URL,
    new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: _refreshToken,
      client_id: clientId,
      client_secret: clientSecret,
    }).toString(),
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      timeout: 15000,
    }
  );

  _accessToken = response.data.access_token as string;
  _refreshToken = response.data.refresh_token as string;

  // Persist refreshed tokens
  process.env.XERO_ACCESS_TOKEN = _accessToken;
  process.env.XERO_REFRESH_TOKEN = _refreshToken;
  updateEnvFile({
    XERO_ACCESS_TOKEN: _accessToken,
    XERO_REFRESH_TOKEN: _refreshToken,
  });
}

export async function xeroGet<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean>
): Promise<T> {
  const tenantId = process.env.XERO_TENANT_ID;

  if (!tenantId) {
    throw new Error('XERO_TENANT_ID not set in .env');
  }
  if (!_accessToken) {
    throw new Error('Not authenticated. Run "npm run auth".');
  }

  const makeRequest = async (): Promise<T> => {
    const response = await axios.get<T>(`${XERO_API_BASE}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${_accessToken}`,
        'Xero-tenant-id': tenantId,
        Accept: 'application/json',
      },
      params,
      timeout: 30000,
    });
    return response.data;
  };

  try {
    return await makeRequest();
  } catch (err) {
    if (axios.isAxiosError(err) && err.response?.status === 401) {
      // Token expired — refresh and retry once
      await doRefresh();
      return await makeRequest();
    }
    throw err;
  }
}

export function handleXeroError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const e = error as AxiosError;
    if (e.response) {
      switch (e.response.status) {
        case 400:
          return `Error 400: Bad request — check your filter parameters.`;
        case 401:
          return `Error 401: Unauthorised — run "npm run auth" to re-authenticate.`;
        case 403:
          return `Error 403: Forbidden — check your Xero app scopes.`;
        case 404:
          return `Error 404: Resource not found.`;
        case 429:
          return `Error 429: Rate limit hit — Xero allows 60 req/min. Wait a moment and retry.`;
        case 500:
          return `Error 500: Xero server error. Try again shortly.`;
        default:
          return `Error ${e.response.status}: Xero API error — ${JSON.stringify(e.response.data)}`;
      }
    }
    if (e.code === 'ECONNABORTED') return 'Error: Request timed out.';
    return `Error: Network error — ${e.message}`;
  }
  return `Error: ${error instanceof Error ? error.message : String(error)}`;
}
