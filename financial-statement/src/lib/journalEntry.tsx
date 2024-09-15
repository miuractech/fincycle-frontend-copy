/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button, Modal, NumberFormatter, Table, Title } from '@mantine/core';
import React, { useState } from 'react';
import { TransactionInformationSummary } from './types';

type Props = {
  invoiceData: TransactionInformationSummary;
};

export default function JournalEntry({ invoiceData }: Props) {
  const [modal, setModal] = useState(false);
  return (
    <div>
      <Button variant="subtle" onClick={() => setModal(true)}>
        View Journal
      </Button>
      <Modal size={'xl'} opened={modal} onClose={() => setModal(false)}>
        <div>
          <Title order={4} ta={'center'}>
            Journal Entry
          </Title>
          <Table withColumnBorders withRowBorders withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Date</Table.Th>
                <Table.Th>Account</Table.Th>
                <Table.Th>Account Head</Table.Th>
                <Table.Th>Particulars</Table.Th>
                {/* <Table.Th>Narration</Table.Th> */}
                <Table.Th>Amount(Dr.)</Table.Th>
                <Table.Th>Amount(Cr.)</Table.Th>
              </Table.Tr>
            </Table.Thead>
            {invoiceData?.journal?.lines && invoiceData.journal.lines.length > 0 && 
            invoiceData.journal.lines.map(journal=>(
            <Table.Tr>
              <Table.Td>
                {/* 
                // @ts-ignore */}
                {invoiceData.invoiceDate.toDate().toLocaleDateString()}
              </Table.Td>
              <Table.Td>{journal.account}</Table.Td>
              <Table.Td>{journal.accountHead}</Table.Td>
              <Table.Td>{journal.narration}</Table.Td>
              <Table.Td>{journal.debit}</Table.Td>
              <Table.Td>{journal.credit}</Table.Td>
              {/* <Table.Td>
                <NumberFormatter
                  thousandSeparator
                  prefix="₹"
                  value={invoiceData.totalInvoiceAmount.toFixed(2)}
                />
              </Table.Td> */}
            </Table.Tr>
            ))
            }
            {/* <Table.Tr>
              <Table.Td></Table.Td>
              <Table.Td pl={32}>{invoiceData.journal.to}</Table.Td>
              <Table.Td></Table.Td>
              <Table.Td>
                <NumberFormatter
                  thousandSeparator
                  prefix="₹"
                  value={invoiceData.totalInvoiceAmount.toFixed(2)}
                />
              </Table.Td>
              <Table.Td></Table.Td>
            </Table.Tr> */}
          </Table>
        </div>
      </Modal>
    </div>
  );
}
