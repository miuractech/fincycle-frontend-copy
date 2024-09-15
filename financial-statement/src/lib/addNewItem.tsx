import React, { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import {
  TextInput,
  NumberInput,
  Button,
  Group,
  ActionIcon,
  Modal,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { ItemDetail } from './types';

const ItemDetailForm = ({
  item,
  additem,
  customButton,
}: {
  item?: ItemDetail;
  additem: (item: ItemDetail) => void;
  customButton?: JSX.Element;
}) => {
  const form2 = useForm<ItemDetail>({
    initialValues: {
      itemServiceDescription: '',
      quantity: 0,
      ratePerUnit: 0,
      totalItemAmount: 0,
    },
    validate: {
      itemServiceDescription: (value) =>
        value ? null : 'Description is required',
      quantity: (value) =>
        value > 0 ? null : 'Quantity must be greater than 0',
      ratePerUnit: (value) =>
        value > 0 ? null : 'Rate per unit must be greater than 0',
    },
  });
  const [modalOpened, setModalOpened] = useState(false);
  useEffect(() => {
    if (item) form2.setValues(item);
    return () => {
      form2.reset();
    };
  }, [item]);
  return (
    <div>
      <div onClick={() => setModalOpened(true)}>
        {customButton ?? (
          <ActionIcon>
            <IconPlus />
          </ActionIcon>
        )}
      </div>
      <Modal opened={modalOpened} onClose={() => setModalOpened(false)}>
        <form className="p-4 max-w-lg mx-auto">
          <TextInput
            label="Service Description"
            placeholder="Enter service description"
            {...form2.getInputProps('itemServiceDescription')}
            className="mb-4"
          />
          <NumberInput
            label="Quantity"
            placeholder="Enter quantity"
            {...form2.getInputProps('quantity')}
            className="mb-4"
          />
          <NumberInput
            label="Rate per Unit"
            placeholder="Enter rate per unit"
            {...form2.getInputProps('ratePerUnit')}
            className="mb-4"
          />
          <div className="mb-4">
            <div className="text-sm font-medium text-gray-700">
              Total Item Amount
            </div>
            <div className="mt-1">
              ₹ {form2.values.quantity * form2.values.ratePerUnit}
            </div>
          </div>
          <Group justify="right">
            <Button
              onClick={() => {
                const { values } = form2;
                values.totalItemAmount = values.quantity * values.ratePerUnit;
                additem(values);
                setModalOpened(false);
                form2.reset();
              }}
            >
              Submit
            </Button>
          </Group>
        </form>
      </Modal>
    </div>
  );
};

export default ItemDetailForm;
