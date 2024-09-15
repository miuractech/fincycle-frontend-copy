// validationSchema.ts
import * as yup from 'yup';

export const itemDetailSchema = yup.object().shape({
  itemServiceDescription: yup.string().required('Item/Service Description is required'),
  quantity: yup.number().min(1, 'Quantity must be greater than 0').required('Quantity is required'),
  ratePerUnit: yup.number().min(0, 'Rate per Unit must be greater than 0').required('Rate per Unit is required'),
  totalItemAmount: yup.number().min(0, 'Total Item Amount must be greater than 0').required('Total Item Amount is required'),
  discount: yup.number().min(0, 'Discount cannot be negative').optional(),
  cgstAmount: yup.number().min(0, 'CGST Amount cannot be negative').optional(),
  sgstAmount: yup.number().min(0, 'SGST Amount cannot be negative').optional(),
  igstAmount: yup.number().min(0, 'IGST Amount cannot be negative').optional(),
});

export const transactionInformationSummarySchema = yup.object().shape({
  invoiceNumber: yup.string(),
  invoiceDate: yup.string().required('Invoice Date is required'), // You can further validate date format if needed
  totalInvoiceAmount: yup.number().min(0, 'Total Invoice Amount must be greater than 0').required('Total Invoice Amount is required'),
  transactionCurrency: yup.string().required('Transaction Currency is required'),
  vendorName: yup.string().required('vendor Name is required'),
  gstin: yup.string(),
  items: yup.array().of(itemDetailSchema).min(1, 'At least one item is required'),
  paymentMode: yup.string().required('Payment Mode is required'),
  paymentAmount: yup.number().min(0, 'Payment Amount must be greater than 0').required('Payment Amount is required'),
  category: yup.string().optional(),
  tdsDeducted: yup.number().optional(),
  narrationRemarks: yup.string().optional(),
});
