import { MantineColor } from '@mantine/core';

export interface ItemDetail {
  itemServiceDescription: string;
  quantity: number;
  ratePerUnit: number;
  totalItemAmount: number;
}
export interface JournalEntryLine {
  account: string;  // Account name or code
  debit: number;    // Debit amount (use 0 if no debit)
  credit: number;   // Credit amount (use 0 if no credit)
  accountHead: string; // Optional description for the line item
  narration?:string
}
export type transactionType =
  | 'sales'
  | 'purchase'
  | 'cash payment'
  | 'cash receipt';
export interface TransactionInformationSummary {
  type: transactionType;
  invoiceNumber: string;
  uploadedDate: any;
  invoiceDate: string | Date;
  discount?: number;
  totalInvoiceAmount: number;
  transactionCurrency: string;
  vendorName: string;
  gstin: string;
  items: ItemDetail[];
  paymentMode:  "cash" | "bank" | "credit";
  journal?:{lines:JournalEntryLine[]}
  journalEntry: {
    level1:
      | '100000 - Assets'
      | '200000 - Liabilities'
      | '300000 - Equity'
      | '400000 - Revenue'
      | '500000 - Expenses'; // pick one based on the nature of the transaction

    level4: string;
    level2: string;
    level3: string;
  };
  paymentAmount: number;
  category?: string;
  tdsDeducted?: number;
  cgstAmount?: number;
  sgstAmount?: number;
  igstAmount?: number;
  narrationRemarks?: string;
}

export interface invoice {
  invoiceImages: string;
  mode: string;
  id:string
  status: 'created' | 'approved' | 'rejected' | 'modified';
  transactionType: transactionType;
  invoiceData?: TransactionInformationSummary;
}

export function getStatusColor(
  status: 'created' | 'approved' | 'rejected' | 'modified'
): MantineColor {
  switch (status) {
    case 'created':
      return 'blue';
    case 'approved':
      return 'green';
    case 'rejected':
      return 'red';
    case 'modified':
      return 'yellow';
    default:
      return 'gray';
  }
}
