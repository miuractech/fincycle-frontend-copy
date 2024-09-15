/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  IconArrowRight,
  IconChevronLeft,
  IconClipboardText,
  IconCloudUpload,
  IconMicrophone,
  IconX,
} from '@tabler/icons-react';
import SelectTransactionType from './selectTransactionType';
import {
  ActionIcon,
  Button,
  Card,
  Center,
  Container,
  Image,
  Tabs,
  Text,
} from '@mantine/core';
import { useState } from 'react';
import { MiuracImage } from '@xcycle-tools/components';
import ManualEntry from './manualEntry';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@xcycle-tools/config';
import { useNavigate } from 'react-router-dom';
import { transactionType } from './types';

export function AddNewInvoice({
  companyId,
  employeeId,
}: {
  companyId: string;
  employeeId?: string;
}) {
  const [type, setType] = useState<transactionType | "">('');
  const [mode, setmode] = useState<string | null>('upload');
  const [invoiceImages, setInvoiceImages] = useState<string[]>([]);
  const navigate = useNavigate();
  if (!type) return <SelectTransactionType onSelect={(e) => setType(e)} />;

  return (
    <Container fluid p={8}>
      <ActionIcon
        //@ts-ignore
        onClick={() => setType('')}
        variant="light"
      >
        <IconChevronLeft />
      </ActionIcon>
      <Card p={16} withBorder className=" min-h-screen">
        <div  className="rounded-lg w-full ">
          <Tabs
            value={mode}
           
            onChange={(e) => setmode(e)}
            color="blue"
            // classNames={{}}
          >
            <Tabs.List  c={'blue'}>
              <Tabs.Tab
                className='w-1/2'
                value="upload"
                leftSection={<IconCloudUpload size={16} />}
              >
                Scan
              </Tabs.Tab>              
              <Tabs.Tab
              className='w-1/2'
                value="manual"
                leftSection={<IconClipboardText size={16} />}
              >
                Manual
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="upload">
              <Text size="xs" ta={'center'} py={16} fw={800}>
                Upload Your Invoice
              </Text>
              <div className="flex flex-wrap justify-center gap-2 p-4 min-h-[600px]">
                {invoiceImages.map((invoiceImage, invoiceIndex) => (
                  <div className="relative max-w-40 max-h-44 ">
                    <div className="absolute">
                      <ActionIcon
                        onClick={() => {
                          const copy = [...invoiceImages];
                          copy.splice(invoiceIndex, 1);
                          setInvoiceImages(copy);
                        }}
                        color="red"
                      >
                        <IconX />
                      </ActionIcon>
                    </div>
                    <Image
                      src={invoiceImage}
                      className="max-w-40 max-h-44"
                      alt="invoice image"
                    />
                  </div>
                ))}
                <MiuracImage
                  setUrlFunc={(urls) => {
                    if (Array.isArray(urls)) setInvoiceImages(urls);
                  }}
                  allowMultiple
                  buttonComponent={
                    <div className="p-2 max-w-40 max-h-44 mx-auto">
                      <Center mih={100} mah={176}>
                        <div className="bg-slate-200 rounded-md bg-opacity-10 border-dashed border-2 border-spacing-10 p-2">
                          <IconCloudUpload
                            size={80}
                            stroke={1}
                            className="mx-auto"
                          />
                          <Text size="xs" fw={600} ta={'center'} mt={4}>
                            click to take picture or Upload Invoice here
                          </Text>
                        </div>
                      </Center>
                    </div>
                  }
                  updateFirestore={true}
                  editConfig={null}
                />
                <div className="mt-4 flex justify-center w-full">
                  <Button variant="subtle" color="gray" className="text-white">
                    Cancel
                  </Button>
                  <Button
                    onClick={async () => {
                      if(!(invoiceImages.length> 0)){
                        alert("Missing image")
                        return;
                      }
                      const snap = await addDoc(collection(db, 'invoice'), {
                        mode,
                        invoiceImages,
                        transactionType: type,
                        companyId,
                        employeeId,
                      });
                      navigate(`/invoice/${snap.id}`);
                    }}
                    color="indigo"
                    className="flex items-center"
                  >
                    Submit <IconArrowRight className="ml-2" />
                  </Button>
                </div>
              </div>
            </Tabs.Panel>
            <Tabs.Panel value="manual">
              <ManualEntry mode={type} />
            </Tabs.Panel>
          </Tabs>
        </div>
      </Card>
    </Container>
  );
}
