import { useState } from 'react';
import { invoice, ItemDetail, TransactionInformationSummary } from './types';
import { Center, Image, Modal, SegmentedControl } from '@mantine/core';
import {
  Card,
  Text,
  Group,
  Divider,
  Grid,
  Title,
  Space,
  Badge,
} from '@mantine/core';
import ZoomImage from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';
type Props = {
  row: invoice;
};

export default function TransactionPreview({ row }: Props) {
  const [modal, setModal] = useState(false);
  const [preview, setPreview] = useState('invoice');
  const {
    invoiceNumber,
    invoiceDate,
    discount,
    totalInvoiceAmount,
    transactionCurrency,
    vendorName,
    gstin,
    items,
    paymentMode,
    journalEntry,
    paymentAmount,
    category,
    tdsDeducted,
    cgstAmount,
    sgstAmount,
    igstAmount,
    narrationRemarks,
  } = row.invoiceData as TransactionInformationSummary;
  
  return  (
    <>
      <Text
        c={'blue'}
        className="cursor-pointer"
        onClick={() => setModal(true)}
      >
        {row.invoiceData?.invoiceNumber?row.invoiceData.invoiceNumber:'N/A'}
      </Text>
      <Modal fullScreen opened={modal} onClose={() => setModal(false)}>
        <Title ta={'center'} >
          Invoice Number - 
          {invoiceNumber}
        </Title>
        <br />
        <div className="grid grid-cols-2 gap-4">
        <Card bg={'#fff'} withBorder h={'full'} mih={600}>
            <Title order={3} ta={'center'} >Scanned Invoice</Title>
            <ZoomImage>
              <Image
                w={'100%'}
                className="max-h-[600px]"
                src={row.invoiceImages}
              />
            </ZoomImage>
          </Card>
          <Card bg={'#fff'} shadow="sm" padding="lg" radius="md" withBorder>
            <Title order={3} ta='center'>Transaction Summary</Title>

            <Divider my="sm" />

            <Grid>
              <Grid.Col span={6}>
                <Text fw={500}>Invoice Number:</Text>
                <Text>{invoiceNumber}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text fw={500}>Invoice Date:</Text>
                <Text>{new Date(invoiceDate).toLocaleDateString()}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text fw={500}>Vendor Name:</Text>
                <Text>{vendorName}</Text>
              </Grid.Col>
              {gstin && <Grid.Col span={6}>
                <Text fw={500}>GSTIN:</Text>
                <Text>{gstin}</Text>
              </Grid.Col>}
              {paymentMode && <Grid.Col span={6}>
                <Text fw={500}>Payment Mode:</Text>
                <Text>{paymentMode} </Text>
              </Grid.Col>}
            
              {category && (
                <Grid.Col span={6}>
                  <Text fw={500}>Category:</Text>
                  <Text>{category}</Text>
                </Grid.Col>
              )}
              {discount && (
                <Grid.Col span={6}>
                  <Text fw={500}>Discount:</Text>
                  <Text>
                    {transactionCurrency} {discount.toFixed(2)}
                  </Text>
                </Grid.Col>
              )}
              {tdsDeducted && (
                <Grid.Col span={6}>
                  <Text fw={500}>TDS Deducted:</Text>
                  <Text>
                    {transactionCurrency} {tdsDeducted.toFixed(2)}
                  </Text>
                </Grid.Col>
              )}
              <Grid.Col span={6}>
                <Text fw={500}>Total Invoice Amount:</Text>
                <Text>
                  {transactionCurrency} {totalInvoiceAmount.toFixed(2)}
                </Text>
              </Grid.Col>
              {cgstAmount && (
                <Grid.Col span={6}>
                  <Text fw={500}>CGST Amount:</Text>
                  <Text>
                    {transactionCurrency} {cgstAmount.toFixed(2)}
                  </Text>
                </Grid.Col>
              )}
              {sgstAmount && (
                <Grid.Col span={6}>
                  <Text fw={500}>SGST Amount:</Text>
                  <Text>
                    {transactionCurrency} {sgstAmount.toFixed(2)}
                  </Text>
                </Grid.Col>
              )}
              {igstAmount && (
                <Grid.Col span={6}>
                  <Text fw={500}>IGST Amount:</Text>
                  <Text>
                    {transactionCurrency} {igstAmount.toFixed(2)}
                  </Text>
                </Grid.Col>
              )}
              {narrationRemarks && (
                <Grid.Col span={12}>
                  <Text fw={500}>Narration/Remarks:</Text>
                  <Text>{narrationRemarks}</Text>
                </Grid.Col>
              )}
              <Grid.Col span={12}>
                <Text fw={500}>Journal Entry Level 1:</Text>
                <Badge>{journalEntry.level1}</Badge>
              </Grid.Col>
            </Grid>

            <Space h="md" />

            <Title order={4}>Items</Title>
            <Divider my="sm" />

            {items.map((item: ItemDetail, index: number) => (
              <Group
                key={index}
                justify="apart"
                style={{ marginBottom: '8px' }}
              >
                <Text>
                  {index + 1}. {item.itemServiceDescription}
                </Text>
                <Text>
                  {transactionCurrency} {item.totalItemAmount.toFixed(2)}
                </Text>
              </Group>
            ))}
          </Card>
          
        </div>
      </Modal>
    </>
  )
}
