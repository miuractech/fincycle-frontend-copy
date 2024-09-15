import { useForm, yupResolver } from '@mantine/form';
import { CompanyProfile, getCompanyProfile, initialValues } from './form';
import {
  Autocomplete,
  Avatar,
  Button,
  Card,
  MultiSelect,
  NumberInput,
  Select,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';

import { showNotification } from '@mantine/notifications';

import { IconCircleCheckFilled, IconPencil, IconX } from '@tabler/icons-react';
import { useEffect } from 'react';
import { indianState, mechanicCompanySchema } from './validation';
import { signOut } from 'firebase/auth';
import { store } from '../app/store';
import { auth, db } from '@xcycle-tools/config';
import { environment } from '../enviromnent';
import { defaultErrorMessage, MiuracImage } from '@xcycle-tools/components';
export default function CompanyRegistration({
  editMode,
}: {
  editMode?: boolean;
}) {
  const { user, setCompany } = store();
  const form = useForm<CompanyProfile>({
    initialValues: {
      ...initialValues,
      email: user?.email as string,
      id: user?.uid ?? '',
    },
    validate: yupResolver(mechanicCompanySchema),
  });
  //   const { companyProfile } = useSelector((state: RootState) => state.Company);
  useEffect(() => {
    if (editMode) {
      getCompanyProfile(user?.uid as string).then((companyProfile) => {
        if (companyProfile) form.setValues(companyProfile);
      });
    }
  }, [editMode, user?.uid]);
  console.log(form.values);
  
  return (
    <div className="p-2 md:p-6 max-w-2xl mx-auto">
      <form
        className=" "
        onSubmit={form.onSubmit(async (values) => {
          try {
            console.log(values);

            const target = {
              ...values,
              mechanicId: user?.uid,
              uid: user?.uid,
            };
            await setDoc(doc(collection(db, 'company'), user?.uid), target);
            setCompany(target);
            showNotification({
              id: `reg-err-${Math.random()}`,
              autoClose: 5000,
              title: 'Success',
              message: 'profile successFully updated',
              color: 'green',
              icon: <IconCircleCheckFilled />,
              loading: false,
            });
          } catch (error: any) {
            showNotification({
              id: `reg-err-${Math.random()}`,
              autoClose: 5000,
              title: 'Failed',
              message: environment.production
                ? defaultErrorMessage
                : error.message,
              color: 'red',
              icon: <IconX />,
              loading: false,
            });
          }
        })}
      >
        <Card>
          <Title order={4} ta="center" className="col-span-2">
            Company Profile
          </Title>
          <div className="col-span-2 pt-8">
            <Text>Logo</Text>
            <MiuracImage
              updateFirestore={true}
              image={form.values.logo}
              editConfig={{ aspectX: 1, aspectY: 1 }}
              setUrlFunc={(url) => {
                if (!Array.isArray(url)) {
                  form.setFieldValue('logo', url);
                }
              }}
              buttonComponent={
                <div className="relative w-16 mx-auto ">
                  <div className="absolute right-0 -top-4">
                    <IconPencil />
                  </div>
                  <Avatar className="mt-4" />
                </div>
              }
            />
          </div>
          <TextInput
            className="m-2 col-span-2"
            name={'companyName'}
            label={'Company Name'}
            {...form.getInputProps('companyName')}
          />
          <TextInput
            className="m-2 col-span-2"
            name={'phoneNumber'}
            label={'Phone Number'}
            {...form.getInputProps('phone')}
          />
          <TextInput
            className="m-2 col-span-2"
            disabled
            name={'email'}
            label={'Email'}
            {...form.getInputProps('email')}
          />
        </Card>
        <Card className="p-2 mt-4  grid col-span-2 rounded-xl">
          <Text ta="center" className="py-4 col-span-2">
            Shop address
          </Text>
          <TextInput
            className="m-2 col-span-2"
            name={'addressLine1'}
            label={'Address Line1'}
            {...form.getInputProps('address.addressLine1')}
          />
          <TextInput
            className="m-2 col-span-2"
            name={'addressLine2'}
            label={'Address Line2'}
            {...form.getInputProps('address.addressLine2')}
          />

          <TextInput
            className="m-2 col-span-2"
            name={'landmark'}
            label={'Landmark'}
            {...form.getInputProps('address.landmark')}
          />
          <TextInput
            className="m-2 col-span-2 md:col-span-1"
            name={'city'}
            label={'City'}
            {...form.getInputProps('address.city')}
          />
          <Autocomplete
            className="m-2 col-span-2 md:col-span-1"
            data={indianState}
            name={'state'}
            label={'State'}
            {...form.getInputProps('address.state')}
          />
          <TextInput
            className="m-2 col-span-2"
            name={'phoneNumber'}
            label={'Phone Number'}
            {...form.getInputProps('address.phoneNumber')}
          />
          <TextInput
            className="m-2 col-span-2"
            name={'pincode'}
            label={'pincode'}
            {...form.getInputProps('address.pincode')}
          />
        </Card>
        <div>
          <br />
          <Button type="submit">Submit</Button>
          &ensp; &ensp; &ensp;
          <Button
            color="red"
            onClick={() => {
              signOut(auth);
            }}
          >
            Logout
          </Button>
        </div>
      </form>
    </div>
  );
}
