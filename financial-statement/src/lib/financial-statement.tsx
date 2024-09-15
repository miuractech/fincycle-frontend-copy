/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';
import {
  ActionIcon,
  Badge,
  Button,
  Container,
  NumberFormatter,
  Popover,
  Text,
  Title,
} from '@mantine/core';
import { Link } from 'react-router-dom';
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QuerySnapshot,
  updateDoc,
  where,
} from 'firebase/firestore';
import DataTable from 'react-data-table-component';
import { getStatusColor, invoice, ItemDetail } from './types';
import { db } from '@xcycle-tools/config';
import TransactionPreview from './transactionPreview';
import { IconPencil } from '@tabler/icons-react';
import JournalEntry from './journalEntry';
import { EmployeeProfile } from '@xcycle-tools/types';
export function Transactions({
  companyId,
  employeeId,
  employeeProfile,
}: {
  companyId: string;
  employeeId?: string;
  employeeProfile?: EmployeeProfile;
}) {
  const [invoices, setInvoices] = useState<invoice[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(companyId);
  
  useEffect(() => {
    const fetchInvoices = async () => {
      if (companyId) {
        try {
          // console.log( companyId,
          //   employeeId,);

          let querySnapshot: QuerySnapshot<DocumentData, DocumentData>;
          if (employeeId)
            querySnapshot = await getDocs(
              query(
                collection(db, 'invoice'),
                where('companyId', '==', companyId),
                where('employeeId', '==', employeeId),
                orderBy('invoiceData.uploadedDate', 'desc'),
                limit(25)
              )
            );
          else {
            querySnapshot = await getDocs(
              query(
                collection(db, 'invoice'),
                where('companyId', '==', companyId),
                orderBy('invoiceData.uploadedDate', 'desc'),
                limit(25)
              )
            );
          }
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
  }, [companyId, employeeId]);

  const columns: any = [
    {
      name: 'Invoice Number',
      selector: (row: invoice) => <TransactionPreview row={row} />,
    },
    {
      name: 'Status',
      selector: (row: invoice) => (
        <Popover>
          <Popover.Target >
            <Badge className='cursor-pointer' color={getStatusColor(row.status)}> {row.status} </Badge>
          </Popover.Target>
          <Popover.Dropdown>
            <div className="grid gap-4 ">
              <Text>
                Select Status
              </Text>
              
            {['created' , 'approved' , 'rejected'].map(status=>(
              <div>
              <Button onClick={()=>{
                updateDoc(doc(collection(db,"invoice"),row.id),{status})
                const targetIndex = invoices.findIndex(i=>i.id === row.id)
                const duplicate = [...invoices]
                // @ts-ignore
                duplicate.splice(targetIndex,1,{...row, status})
                setInvoices(duplicate)
                 // @ts-ignore
              }} fullWidth color={getStatusColor(status)} >
                {status}
              </Button>
              </div>
            ))}
            </div>
          </Popover.Dropdown>
        </Popover>
      ),
    },
    {
      name: 'Invoice Date',
      selector: (row: invoice) => {
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
      name: 'Vendor Name',
      selector: (row: invoice) => row.invoiceData?.vendorName || 'N/A',
    },
    
    {
      name: 'GSTN',
      selector: (row: invoice) => row.invoiceData?.gstin || 'N/A',
    },
    {
      name: 'Total Amount',
      selector: (row: invoice) => (
        <NumberFormatter
        className='font-bold'
          value={row.invoiceData?.totalInvoiceAmount.toFixed(2) || 0}
          decimalScale={2}
          thousandSeparator
          prefix="₹"
        />
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
      name: 'Journal Entry',
      selector: (row: invoice) => {
        if (row.invoiceData?.journal?.lines && row.invoiceData.journal.lines.length > 0)
          return <JournalEntry invoiceData={row.invoiceData} />;
        else return 'N/A';
      },
    },
   
    // {
    //   name: 'Payment Mode',
    //   selector: (row: invoice) => row.invoiceData?.paymentMode,
    // },
    
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
  const employeeColumns: any = [
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
  ];
  console.log("access",employeeProfile);
  
  return (
    <Container bg={'#fff'} fluid>
        
    
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 p-6">
          <Title ta={'center'} order={5} className='flex items-center justify-center'>Transaction Statements <div className="flex gap-4 p-4">
      {employeeId && (
          <Link to={'add'}>
            <Button>Add Invoice</Button>
          </Link>
            )}
          <Button
          className='ml-0 md:ml-11'
            onClick={() => {
              // Define the CSV header
              const header = [
                'Invoice Number',
                'Vendor Name',
                'Total Amount',
                'Payment Mode',
                'Invoice Date',
                'GSTIN',
                'Category',
                'Items',
                'Narration/Remarks',
              ];

              // Convert items to string
              const itemsToString = (items: ItemDetail[]) => {
                return items
                  .map(
                    (item) =>
                      `${item.itemServiceDescription} (Qty: ${item.quantity}, Rate: ${item.ratePerUnit}, Total: ${item.totalItemAmount})`
                  )
                  .join(' <->');
              };

              // Map invoice data to CSV rows
              const rows = invoices.map((invoice) => [
                invoice.invoiceData?.invoiceNumber || '',
                invoice.invoiceData?.vendorName.replace(',', '-') || '',
                invoice.invoiceData?.totalInvoiceAmount.toFixed(2) || '',
                invoice.invoiceData?.paymentMode || '',
                invoice.invoiceData?.invoiceDate || '',
                invoice.invoiceData?.gstin || '',
                invoice.invoiceData?.category || '',
                invoice.invoiceData?.items
                  ? itemsToString(invoice.invoiceData.items)
                  : '',
                invoice.invoiceData?.narrationRemarks || '',
              ]);

              // Create CSV content
              const csvContent = [header, ...rows]
                .map((e) => e.join(','))
                .join('\n');

              // Create a Blob from the CSV content
              const blob = new Blob([csvContent], {
                type: 'text/csv;charset=utf-8;',
              });

              // Create a link to download the Blob as a file
              const link = document.createElement('a');
              const url = URL.createObjectURL(blob);
              link.setAttribute('href', url);
              link.setAttribute('download', 'invoices.csv');
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            variant='outline'
          >
            export
          </Button>
        </div></Title>
          <div>
            <DataTable
              // title="Transaction Statements"
              style={{ border: '1px solid gray' }}
              columns={
                employeeProfile?.access !== 'employee'
                  ? columns
                  : employeeColumns
              }
              data={invoices}
              pagination
            />
          </div>
        </div>
      )}
    </Container>
  );
}
