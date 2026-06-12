export const XERO_AUTH_URL = 'https://login.xero.com/identity/connect/authorize';
export const XERO_TOKEN_URL = 'https://identity.xero.com/connect/token';
export const XERO_CONNECTIONS_URL = 'https://api.xero.com/connections';
export const XERO_API_BASE = 'https://api.xero.com/api.xro/2.0';
export const REDIRECT_URI = 'http://localhost:8080/callback';
export const AUTH_CALLBACK_PORT = 8080;

export const SCOPES = [
  'accounting.invoices.read',
  'accounting.payments.read',
  'accounting.banktransactions.read',
  'accounting.contacts.read',
  'accounting.settings.read',
  'offline_access',
  'openid',
  'profile',
  'email',
].join(' ');

export const CHARACTER_LIMIT = 25000;
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
