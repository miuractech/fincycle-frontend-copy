/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DateInput } from '@mantine/dates';
import '@mantine/dates/styles.css';
import {
  ItemDetail,
  TransactionInformationSummary,
  transactionType,
} from './types';
import { useForm, yupResolver } from '@mantine/form';
import { transactionInformationSummarySchema } from './validate';
import {
  Accordion,
  ActionIcon,
  Button,
  NumberInput,
  Select,
  Table,
  Textarea,
  TextInput,
} from '@mantine/core';
import {
  IconCategory,
  IconNote,
  IconPaywall,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react';
import ItemDetailForm from './addNewItem';
import { useEffect } from 'react';
import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@xcycle-tools/config';
import { useNavigate, useParams } from 'react-router-dom';

export default function ManualEntry({
  invoice,
  mode,
}: {
  invoice?: TransactionInformationSummary;
  mode: transactionType;
}) {
  const { invoiceId } = useParams<{ invoiceId: string }>();
  const navigate = useNavigate();
  const form = useForm<TransactionInformationSummary>({
    initialValues: {
      // @ts-ignore
      type: '',
      invoiceNumber: '',
      invoiceDate: '',
      totalInvoiceAmount: 0,
      transactionCurrency: '',
      vendorName: '',
      gstin: '',
      uploadedDate: serverTimestamp(),
      items: [],
      // @ts-ignore
      paymentMode: '',
      paymentAmount: 0,
      cgstAmount: 0,
      sgstAmount: 0,
      igstAmount: 0,
      discount: 0,
      accountHead: '',
      tdsDeducted: undefined,
      narrationRemarks: '',
    },

    validate: yupResolver(transactionInformationSummarySchema),
  });
  console.log(invoice);

  useEffect(() => {
    if (invoice) {
      const data = { ...invoice };
      // @ts-ignore
      if (!invoice.invoiceDate) data['invoiceDate'] = new Date();
      else if (typeof invoice.invoiceDate === 'string')
        data['invoiceDate'] = new Date(invoice.invoiceDate);
      form.setValues(data);
    }
    return () => {
      form.reset();
    };
  }, [invoice]);
  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        try {
          console.log(values);
          if (!values.invoiceDate)
            // @ts-ignore
            values['invoiceDate'] = new Date().toString();
          // @ts-ignore
          // values['journal'] =
          //   (mode === 'purchase' || mode === 'cash payment')
          //     ? {
          //         from: values.paymentMode,
          //         to: values.journalEntry.level4,
          //       }
          //     : {
          //         from: values.journalEntry.level4,
          //         to: values.paymentMode,
          //       };
          //       console.log(values['journal']);
                
          await setDoc(doc(collection(db, 'invoice'), invoiceId), {
            status: 'created',
            invoiceData: values,
          },{merge:true});
          form.reset();
          navigate('/');
        } catch (error) {
          console.log(error);
        }
      })}
      className=" rounded-lg mx-auto"
    >
      <Accordion defaultValue="header">
        <Accordion.Item key={'header'} value={'header'}>
          <Accordion.Control icon={<IconNote />}>Header</Accordion.Control>
          <Accordion.Panel>
            <TextInput
              label="Invoice Number"
              placeholder="Invoice number"
              {...form.getInputProps('invoiceNumber')}
              className=" mt-4"
            />
            {typeof form.values.invoiceDate === 'string' ||
              (Object.prototype.toString.call(form.values.invoiceDate) ===
                '[object Date]' && (
                <DateInput
                  label="Invoice Date"
                  placeholder="YYYY-MM-DD"
                  {...form.getInputProps('invoiceDate')}
                  className=" mt-4"
                />
              ))}
            <TextInput
              label="Vendor Name"
              placeholder="Vendor name"
              {...form.getInputProps('vendorName')}
              className=" mt-4"
            />
            <TextInput
              label="GSTIN"
              placeholder="GSTIN"
              {...form.getInputProps('gstin')}
              className=" mt-4"
            />
            <Select
              data={['cash', 'bank', 'credit']}
              label="Payment Mode"
              placeholder="Payment mode"
              {...form.getInputProps('paymentMode')}
              className=" mt-4"
            />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item key={'items'} value={'items'}>
          <Accordion.Control icon={<IconCategory />}>Items</Accordion.Control>
          <Accordion.Panel>
            <div className="overflow-x-auto">
              <Table
                withColumnBorders
                withTableBorder
                withRowBorders
                className="p-4 overflow-x-auto"
              >
                <thead>
                  <tr>
                    <th className="w-48 p-1 text-left">Service Description</th>
                    <th className="w-24 p-1 text-left ">Quantity</th>
                    <th className="w-24 p-1 text-left">Rate per Unit</th>
                    <th className="w-24 p-1 text-left ">Total Item Amount</th>
                    <th className="w-24 p-1 text-left "></th>
                  </tr>
                </thead>
                <tbody>
                  {form.values.items.map((item, index) => (
                    <tr key={item.itemServiceDescription}>
                      <td className=" p-1">{item.itemServiceDescription}</td>
                      <td className=" p-1">{item.quantity}</td>
                      <td className=" p-1">{item.ratePerUnit}</td>
                      <td className=" p-1">{item.totalItemAmount}</td>
                      <td className=" p-1 flex items-center gap-1">
                        <ItemDetailForm
                          item={item}
                          customButton={
                            <ActionIcon>
                              <IconPencil />
                            </ActionIcon>
                          }
                          additem={(modifiedItem) =>
                            form.setFieldValue(`items.${index}`, modifiedItem)
                          }
                        />
                        {/*  */}
                        <ActionIcon
                          onClick={() => form.removeListItem('items', index)}
                          color="red"
                          c={'white'}
                        >
                          <IconTrash />
                        </ActionIcon>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <br />
            <ItemDetailForm
              additem={(item) => form.insertListItem('items', item)}
            />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item key={'final'} value={'final'}>
          <Accordion.Control icon={<IconPaywall />}>
            Final Amount
          </Accordion.Control>
          <Accordion.Panel>
            <NumberInput
              label="Payment Amount"
              placeholder="Payment amount"
              {...form.getInputProps('paymentAmount')}
              className=" mt-4"
            />
            <NumberInput
              label="cgst"
              placeholder="cgst amount"
              {...form.getInputProps('cgstAmount')}
              className=" mt-4"
            />
            <NumberInput
              label="sgst Amount"
              placeholder="sgst amount"
              {...form.getInputProps('sgstAmount')}
              className=" mt-4"
            />
            <NumberInput
              label="igst Amount"
              placeholder="igst amount"
              {...form.getInputProps('igstAmount')}
              className=" mt-4"
            />
            <TextInput
              label="Category"
              placeholder="Category"
              {...form.getInputProps('journalEntry.level4')}
              className=" mt-4"
            />
            <Textarea
              label="Narration / Remarks"
              placeholder="Enter remarks"
              {...form.getInputProps('narrationRemarks')}
              className=" mt-4"
            />

            <TextInput
              label="TDS Deducted"
              placeholder="TDS Amount"
              {...form.getInputProps('tdsDeducted')}
              className=" mt-4"
            />

            <NumberInput
              label="Total Invoice Amount"
              placeholder="Total amount"
              {...form.getInputProps('totalInvoiceAmount')}
              className=" mt-4"
            />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <div className="mt-6 text-center">
        <Button type="submit" color="indigo" className="">
          Submit
        </Button>
      </div>
    </form>
  );
}

// const TableItem = ({
//   item,
//   onSubmit,
// }: {
//   item: ItemDetail;
//   onSubmit: (item: ItemDetail) => void;
// }) => {
//     const [editMode, setEditMode] = useState(false)
//   return (
//     <>

//     <ItemDetailForm
//               additem={(item) => form.insertListItem('items', item)}
//             />
//     </>
//   );
// };
