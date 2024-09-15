import { collection, doc, getDoc } from 'firebase/firestore';
import * as yup from 'yup';
import { showNotification } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import {v4} from 'uuid'
import { db } from '@xcycle-tools/config';
import { defaultErrorMessage } from '@xcycle-tools/components';
import { environment } from '../enviromnent';


export interface addressType {
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  // email: string;
  city: string;
  state: string;
  phoneNumber: string;
  pincode: string;
}
// Regular expression for phone number validation. You might need to adjust this based on the specific format you expect.
export const phoneRegExp = /^[6-9]\d{9}$/; // This is an example for Indian mobile numbers. Adjust according to your target country's phone number format.

// Regular expression for pincode validation. You might need to adjust this based on the specific format you expect.
export const pincodeRegExp = /^[1-9][0-9]{5}$/; // This is an example for Indian pin codes. Adjust according to your target format.

// Define the validation schema
export const addressSchema = yup.object().shape({
  addressLine1: yup.string().required('Address Line 1 is required'),
  addressLine2: yup.string(), // This field is optional; remove .required() if this field is not mandatory.
  landmark: yup.string(), // This field is optional; you can add further restrictions.
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone number is required'),
  pincode: yup
    .string()
    .matches(pincodeRegExp, 'Pincode is not valid')
    .required('Pincode is required'),
});

export interface addressType {
  addressLine1: string;
  addressLine2: string;
  city: string;
  phoneNumber: string;
  state: string;
  landmark: string;
  pincode: string;
}

export interface CompanyProfile {
  id: string;
  companyName: string;
  address:addressType;
  phone: string;
  email: string;
  logo: string; // URLs to images of the mechanic shop
  GSTIN:string
  // mechanicIds: string[]; // List of mechanic employee IDs associated with the company
}



export const initialValues: CompanyProfile = {
  address:{
      addressLine1: '',
      addressLine2: '',
      city: '',
      phoneNumber: '',
      state: '',
      landmark: '',
      pincode: '',
    },
  companyName:'',
  GSTIN:"",
  email: '',
  id:"",
  phone: '',
  logo:'',
  // mechanicIds:[],
  // paymentOptions:[],
};

export const getCompanyProfile = async (uid: string) => {
  try {
    const docRef = await getDoc(doc(collection(db, 'company'), uid));
    if (!docRef.exists()) return null;
    return docRef.data() as CompanyProfile;
  } catch (error: any) {
    showNotification({
      id: `reg-err-${Math.random()}`,
      autoClose: 5000,
      title: 'Error',
      message: environment.production ? defaultErrorMessage : error.message,
      color: 'red',
      icon: <IconX />,
      loading: false,
    });
  }
};
