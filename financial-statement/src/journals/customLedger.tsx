/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';
import { getStatusColor, invoice, ItemDetail } from '../lib/types';
import {
  and,
  collection,
  DocumentData,
  getDocs,
  limit,
  or,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from 'firebase/firestore';
import { db } from '@xcycle-tools/config';
import TransactionPreview from '../lib/transactionPreview';
import JournalEntry from '../lib/journalEntry';
import { ActionIcon, Badge, Button, Container, NumberFormatter, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IconPencil } from '@tabler/icons-react';
import DataTable from 'react-data-table-component';

type Props = {
  ledgerKey: string;
  companyId: string;
};

export default function CustomLedger({ ledgerKey, companyId }: Props) {
  const [invoices, setInvoices] = useState<invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvoices = async () => {
      if (companyId) {
        try {
          // console.log( companyId,
          //   employeeId,);

          const querySnapshot = await getDocs(
            query(
              collection(db, 'invoice'),
              and(where('companyId', '==', companyId),
              or(where('invoiceData.journal.to', '==', ledgerKey),
              where('invoiceData.journal.to', '==', ledgerKey))),
              orderBy('invoiceData.uploadedDate', 'desc'),
              limit(25)
            )
          );

          const invoicesData = querySnapshot.docs.map(
            (doc) => ({ ...doc.data(), id: doc.id } as invoice)
          );
          setInvoices(invoicesData);
        } catch (error) {
          console.error('Error fetching invoices:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchInvoices();
  }, [companyId, ledgerKey]);

  const columns: any = [
    {
      name: 'Invoice Number',
      selector: (row: invoice) => <TransactionPreview row={row} />,
    },
    {
      name: 'Vendor Name',
      selector: (row: invoice) => row.invoiceData?.vendorName || 'N/A',
    },
    {
      name: 'GSTN',
      selector: (row: invoice) => row.invoiceData?.gstin || 'N/A',
    },
    {
      name: 'Journal Entry',
      selector: (row: invoice) => {
        if (row.invoiceData?.journal?.lines)
          return <JournalEntry invoiceData={row.invoiceData} />;
        else return 'N/A';
      },
    },
    {
      name: 'Status',
      selector: (row: invoice) => (
        <Badge color={getStatusColor(row.status)}> {row.status} </Badge>
      ),
    },
    {
      name: 'Type',
      selector: (row: invoice) => (
        <Text
          c={
            row.transactionType === 'cash payment' ||
            row.transactionType === 'purchase'
              ? 'pink'
              : 'indigo'
          }
          size="xs"
          fw={800}
        >
          {row.transactionType.toUpperCase()}
        </Text>
      ),
    },
    {
      name: 'Total Amount',
      selector: (row: invoice) => (
        <NumberFormatter
          value={row.invoiceData?.totalInvoiceAmount.toFixed(2) || 0}
          decimalScale={2}
          thousandSeparator
          prefix="₹"
        />
      ),
    },
    // {
    //   name: 'Payment Mode',
    //   selector: (row: invoice) => row.invoiceData?.paymentMode,
    // },
    {
      name: 'Invoice Date',
      selector: (row: invoice) => {
        console.log(row.invoiceData?.invoiceDate);
        if (row.invoiceData?.invoiceDate) {
          try {
            return row.invoiceData?.invoiceDate
              ? // @ts-ignore
                row.invoiceData?.invoiceDate.toDate()?.toLocaleDateString('IN')
              : 'N/A';
          } catch (error) {
            try {
              return row.invoiceData?.invoiceDate
                ? new Date(row.invoiceData?.invoiceDate)?.toLocaleDateString(
                    'IN'
                  )
                : 'N/A';
            } catch (error) {
              return 'N/A';
            }
          }
        }
      },
    },
    {
      name: 'Edit',
      selector: (row: invoice) => (
        <Link to={`edit/${row.id}`}>
          <ActionIcon>
            <IconPencil />
          </ActionIcon>
        </Link>
      ),
    },
  ];

  return (
    <Container fluid>       
       
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 p-6">
          <div>
            <DataTable
              title="Transaction Statements"
              style={{ border: '1px solid gray' }}
              columns={columns}
              data={invoices}
              pagination
            />
          </div>
        </div>
      )}
    </Container>
  );
}
