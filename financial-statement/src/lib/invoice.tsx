/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, onSnapshot } from 'firebase/firestore';
// Adjust the import based on your Firebase configuration
import {
  Container,
  Paper,
  Title,
  Text,
  Table,
  SegmentedControl,
  LoadingOverlay,
} from '@mantine/core';
import { invoice } from './types'; // Adjust the import based on where you have defined your types
import { db } from '@xcycle-tools/config';
import ManualEntry from './manualEntry';
export function Invoice() {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const [invoiceData, setInvoiceData] = useState<invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState('details');
  useEffect(() => {
    if (invoiceId) {
      try {
        const docRef = doc(db, 'invoice', invoiceId);
        onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            setInvoiceData(docSnap.data() as invoice);
          } else {
            console.error('No such document!');
          }
        });
      } catch (error) {
        console.error('Error fetching document:', error);
      } finally {
        setLoading(false);
      }
    }
    return () => {
      setInvoiceData(null);
    };
  }, [invoiceId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!invoiceData) {
    return <div>Invoice not found</div>;
  }

  const {
    invoiceImages,
    invoiceData: transactionInfo,
    transactionType,
  } = invoiceData;
  if (!transactionInfo) return <LoadingOverlay visible />;
  return (
    <Container p={16}>
      <Title order={2}>Invoice Details</Title>
      <div className="text-center">
        <SegmentedControl
          value={previewMode}
          onChange={(e) => setPreviewMode(e)}
          data={['details', 'image']}
        />
      </div>
      {previewMode === 'image' ? (
        <div>
          <Title order={3} mt="md">
            Invoice Image
          </Title>
          <img
            src={invoiceImages}
            alt="Invoice"
            style={{ width: '100%', marginTop: '10px' }}
          />
        </div>
      ) : (
        <ManualEntry mode={transactionType} invoice={transactionInfo} />
        // <Paper shadow="sm" p="md">
        //   <Text>Invoice Number: {transactionInfo?.invoiceNumber}</Text>
        //   <Text>Vendor Name: {transactionInfo?.vendorName}</Text>
        //   <Text>Invoice Date: {transactionInfo?.invoiceDate}</Text>
        //   <Text>Total Amount: {transactionInfo?.totalInvoiceAmount}</Text>

        //   <Title order={3} mt="md">
        //     Items
        //   </Title>
        //   <Table>
        //     <thead>
        //       <tr>
        //         <th>Description</th>
        //         <th>Quantity</th>
        //         <th>Rate</th>
        //         <th>Total</th>
        //       </tr>
        //     </thead>
        //     <tbody>
        //       {transactionInfo?.items.map((item, index) => (
        //         <tr key={index}>
        //           <td>{item.itemServiceDescription}</td>
        //           <td>{item.quantity}</td>
        //           <td>{item.ratePerUnit}</td>
        //           <td>{item.totalItemAmount}</td>
        //         </tr>
        //       ))}
        //     </tbody>
        //   </Table>
        //   {/* Displaying GST and other financial details */}
        //   <Title order={3} mt="md">
        //     Financial Details
        //   </Title>
        //   <Text>CGST Amount: {transactionInfo?.cgstAmount || 0}</Text>
        //   <Text>SGST Amount: {transactionInfo?.sgstAmount || 0}</Text>
        //   <Text>IGST Amount: {transactionInfo?.igstAmount || 0}</Text>
        //   <Text>TDS Deducted: {transactionInfo?.tdsDeducted || 0}</Text>
        //   <Text>Discount: {transactionInfo?.discount || 0}</Text>
        //   <Text>Payment Mode: {transactionInfo?.paymentMode}</Text>
        //   <Text>Payment Amount: {transactionInfo?.paymentAmount}</Text>
        //   <Text>Category Head: {transactionInfo?.category}</Text>
        //   {/* Additional details */}
        //   {transactionInfo?.narrationRemarks && (
        //     <Text mt="md">Remarks: {transactionInfo.narrationRemarks}</Text>
        //   )}
        // </Paper>
      )}
    </Container>
  );
}
