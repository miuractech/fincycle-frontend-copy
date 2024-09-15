import React from 'react';
import { Button, Container, Stack, Title } from '@mantine/core';
import { transactionType } from './types';
type Props = {
  onSelect: (type: transactionType) => void;
};

export default function SelectTransactionType({ onSelect }: Props) {
  return (
    <Container size={'xs'} p={16}>
      <Title ta={'center'} order={4}>
        Add Statement
      </Title>
      <br />
      <Stack gap={16}>
        <Button onClick={() => onSelect('sales')} size="xl" variant="light">
          Sales / Income
        </Button>
        <Button onClick={() => onSelect('purchase')} size="xl" variant="light">
          Purchase /Expense
        </Button>
        <Button
          onClick={() => onSelect('cash payment')}
          size="xl"
          variant="light"
        >
          Cash / Bank Payments
        </Button>
        <Button
          onClick={() => onSelect('cash receipt')}
          size="xl"
          variant="light"
        >
          Cash / Bank Receipts
        </Button>
      </Stack>
    </Container>
  );
}
