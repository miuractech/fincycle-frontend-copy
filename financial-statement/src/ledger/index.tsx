'use client';
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  Autocomplete,
  Button,
  Card,
  Popover,
  Text,
  Title,
} from '@mantine/core';
import { levelFourLedgerItems } from './level4';
import { useState } from 'react';
import CustomLedger from './customLedger';
import DateRangePickerModal from './dateRangePicker';
import { DateInput, DatePicker, MonthPicker } from '@mantine/dates';
import '@mantine/dates/styles.css';

export function Ledgers({ companyId }: { companyId: string }) {
  const [levelFour, setlevelFour] = useState<Record<string, string>>({});

  return (
    <div>
      <div className="max-w-xl mx-auto grid gap-4">
        <Title ta={'center'} order={3}>
          Ledgers
        </Title>
        <Autocomplete
          label="Ledger Code"
          placeholder="100000"
          value={Object.keys(levelFour)[0]}
          onChange={(e) => {
            // @ts-ignore
            setlevelFour({ [e]: levelFourLedgerItems[e] });
          }}
          data={Object.keys(levelFourLedgerItems)}
        />
        <Autocomplete
          label="Buildings,Land,Machinery"
          value={Object.values(levelFour)[0]}
          onChange={(e) => {
            const ledgerKey = Object.keys(levelFourLedgerItems).find(
              // @ts-ignore
              (key) => levelFourLedgerItems[key] === e
            );
            // @ts-ignore
            setlevelFour({ [ledgerKey]: e });
          }}
          placeholder="Pick value or enter anything"
          data={Object.values(levelFourLedgerItems)}
        />
      </div>
      <div>
        <CustomLedger companyId={companyId} ledgerKey={levelFour} />
      </div>
    </div>
  );
}
