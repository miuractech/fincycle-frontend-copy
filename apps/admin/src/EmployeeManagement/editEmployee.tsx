import { Button, Modal, Select, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { collection, doc, setDoc } from 'firebase/firestore';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { db } from '@xcycle-tools/config';
import { defaultErrorMessage } from '@xcycle-tools/components';
import { store } from '../app/store';
import { EmployeeProfile } from '@xcycle-tools/types';

type Props = {
  data: EmployeeProfile;
  setData: any;
};

export default function EditEmployee({ data, setData }: Props) {
  const { companyProfile } = store();
  const [loading, setLoading] = useState(false);
  const form = useForm<EmployeeProfile>({
    initialValues: {
      email: '',
      enabled: true,
      name: '',
      companyId: companyProfile?.id ?? '',
      access: '',
      position: '',
      id: '',
    },
    validate: yupResolver(
      yup.object({
        email: yup
          .string()
          .email('email must be abc@email.com')
          .required('email is required'),
        name: yup.string().required('name is required'),
        access: yup.string(),
      })
    ),
  });
  useEffect(() => {
    if (data) {
      form.setValues(data as EmployeeProfile);
    } else {
      form.reset();
    }
  }, [data]);

  return (
    <Modal centered opened={Boolean(data)} onClose={() => setData(null)}>
      <form
        onSubmit={form.onSubmit(async (formData) => {
          try {
            setLoading(true);
            await setDoc(doc(collection(db, 'employees'), formData.email), {
              ...formData,
              enabled: data.enabled,
              dashboardAction: 'update',
              searchableName: formData.name.toLocaleLowerCase(),
            });
            setLoading(false);
            setData(null);
            showNotification({
              id: `reg-err-${Math.random()}`,
              autoClose: 5000,
              title: 'Success',
              message: 'Added successfully',
              color: 'green',
              icon: <IconX />,
              loading: false,
            });
          } catch (err) {
            console.log(err);
            showNotification({
              id: `reg-err-${Math.random()}`,
              autoClose: 5000,
              title: 'Error',
              message: defaultErrorMessage,
              color: 'red',
              icon: <IconX />,
              loading: false,
            });
          }
        })}
      >
        <TextInput
            label="name"
            placeholder="abc@miurac.com"
            my={16}
            {...form.getInputProps('name')}
          />
          <TextInput
            label="email"
            placeholder="abc@miurac.com"
            my={16}
            {...form.getInputProps('email')}
          />
          <TextInput
            label="Position"
            placeholder="Auditor, employee, sales exec"
            my={16}
            {...form.getInputProps('position')}
          />
          <Select
            label="Access"
            data={['employee', 'accountant', 'editor']}
            {...form.getInputProps('access')}
          />
        <br />
        <Button loading={loading} type="submit">
          Update
        </Button>
      </form>
    </Modal>
  );
}
