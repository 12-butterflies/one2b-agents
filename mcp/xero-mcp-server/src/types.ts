// Xero API response types

export interface XeroContact {
  ContactID: string;
  Name: string;
  EmailAddress?: string;
  IsSupplier?: boolean;
  IsCustomer?: boolean;
  AmountDue?: number;
  AmountOverdue?: number;
  Balances?: {
    AccountsReceivable?: { Outstanding: number; Overdue: number };
    AccountsPayable?: { Outstanding: number; Overdue: number };
  };
}

export interface XeroInvoice {
  InvoiceID: string;
  InvoiceNumber?: string;
  Type: 'ACCREC' | 'ACCPAY';
  Status: string;
  AmountDue: number;
  AmountPaid: number;
  AmountCredited?: number;
  SubTotal?: number;
  TotalTax?: number;
  Total?: number;
  Date: string;
  DueDate?: string;
  Contact: {
    ContactID: string;
    Name: string;
  };
  CurrencyCode?: string;
  Reference?: string;
}

export interface XeroPayment {
  PaymentID: string;
  Date: string;
  Amount: number;
  Reference?: string;
  PaymentType?: string;
  Status?: string;
  Account: {
    AccountID: string;
    Code?: string;
    Name?: string;
  };
  Invoice?: {
    InvoiceID: string;
    InvoiceNumber?: string;
    Contact?: {
      Name: string;
    };
  };
  CurrencyRate?: number;
}

export interface XeroBankTransaction {
  BankTransactionID: string;
  Type: string;
  Date: string;
  Total: number;
  SubTotal?: number;
  TotalTax?: number;
  Reference?: string;
  Status?: string;
  IsReconciled?: boolean;
  BankAccount: {
    AccountID: string;
    Code?: string;
    Name?: string;
  };
  Contact?: {
    ContactID: string;
    Name: string;
  };
  LineItems?: Array<{
    Description?: string;
    UnitAmount?: number;
    TaxAmount?: number;
    LineAmount?: number;
  }>;
  CurrencyCode?: string;
}

export interface XeroAccount {
  AccountID: string;
  Code?: string;
  Name: string;
  Type: string;
  Status: string;
  Description?: string;
  TaxType?: string;
  EnablePaymentsToAccount?: boolean;
  ShowInExpenseClaims?: boolean;
  Class?: string;
  ReportingCode?: string;
  ReportingCodeName?: string;
  HasAttachments?: boolean;
  UpdatedDateUTC?: string;
}

// Normalised output types returned by tools

export interface InvoiceRecord {
  invoice_id: string;
  invoice_number: string;
  type: string;
  status: string;
  contact_name: string;
  date: string;
  due_date: string;
  amount_due: number;
  amount_paid: number;
  total: number;
  currency: string;
  reference: string;
}

export interface PaymentRecord {
  payment_id: string;
  date: string;
  amount: number;
  reference: string;
  payment_type: string;
  account_name: string;
  account_code: string;
  invoice_number: string;
  contact_name: string;
}

export interface BankTransactionRecord {
  bank_transaction_id: string;
  type: string;
  date: string;
  total: number;
  reference: string;
  description: string;
  status: string;
  is_reconciled: boolean;
  bank_account_name: string;
  contact_name: string;
}

export interface AccountRecord {
  account_id: string;
  code: string;
  name: string;
  type: string;
  class: string;
  status: string;
  description: string;
  tax_type: string;
}

export interface ContactRecord {
  contact_id: string;
  name: string;
  email: string;
  is_customer: boolean;
  is_supplier: boolean;
  accounts_receivable_outstanding: number;
  accounts_receivable_overdue: number;
  accounts_payable_outstanding: number;
  accounts_payable_overdue: number;
}

export interface PaginatedResponse<T> {
  [key: string]: unknown;
  total: number;
  count: number;
  offset: number;
  has_more: boolean;
  next_offset?: number;
  data: T[];
}
