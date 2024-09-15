'use client';
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  SegmentedControl,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import CustomLedger from './customLedger';
import '@mantine/dates/styles.css';

export function Journals({ companyId }: { companyId: string }) {
  const [journal, setJournal] = useState<string>('');

  return (
    <div>
      <div className="max-w-xl mx-auto grid gap-4">
        <Title ta={'center'} order={3}>
          Journal
        </Title>
        <SegmentedControl value={journal} onChange={setJournal} data={['cash', 'bank' , 'credit']} />
      </div>
     {journal && <div>
        <CustomLedger companyId={companyId} ledgerKey={journal} />
      </div>}
    </div>
  );
}
