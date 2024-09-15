import { Button, Modal, Select, TextInput } from '@mantine/core';
import { useForm, yupResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import * as yup from 'yup';
import { db } from '@xcycle-tools/config';
import { store } from '../app/store';
import { defaultErrorMessage } from '@xcycle-tools/components';
import { EmployeeProfile } from '@xcycle-tools/types';
import { v4 } from 'uuid';

export default function AddEmployee() {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { companyProfile } = store();
  const form = useForm<EmployeeProfile>({
    initialValues: {
      email: '',
      name: '',
      enabled:true,
      companyId: companyProfile?.id??"",
      access: '',
      position: '',
      id: v4(),
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
  return (
    <div className="">
      <Button onClick={() => setModal(true)}>Add Employee</Button>
      <Modal centered opened={modal} onClose={() => setModal(false)}>
        <form
          onSubmit={form.onSubmit(async (data) => {
            try {
              setLoading(true);
              await setDoc(doc(collection(db, 'employees'), data.email), {
                ...data,
                enabled: true,
                dashboardAction: 'update',
                searchableName: data.name.toLocaleLowerCase(),
              });
              setLoading(false);
              setModal(false);
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
            Add Employee
          </Button>
        </form>
      </Modal>
    </div>
  );
}
