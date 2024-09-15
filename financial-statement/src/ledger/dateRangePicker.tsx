import { useState } from 'react';
import { DatePicker } from '@mantine/dates';
import { Modal, Button, Card } from '@mantine/core';
import '@mantine/dates/styles.css';

function DateRangePickerModal({
  date,
  setDate,
}: {
  date: [Date | null, Date | null];
  setDate: React.Dispatch<React.SetStateAction<[Date | null, Date | null]>>;
}) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Button onClick={() => setOpened(true)}>Select Date</Button>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Select Date Range"
      >
     
          <DatePicker type="range" value={date} onChange={setDate} />
      
      </Modal>
    </>
  );
}

export default DateRangePickerModal;
