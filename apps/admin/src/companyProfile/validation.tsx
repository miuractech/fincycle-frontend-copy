import * as yup from 'yup';

export const addressTypeSchema = yup.object().shape({
  addressLine1: yup.string().required(),
  addressLine2: yup.string().required(),
  city: yup.string().required(),
  phoneNumber: yup.string().required(),
  state: yup.string().required(),
  landmark: yup.string().required(),
  pincode: yup.string().required(),
});

export const ratingsSchema = yup.object().shape({
  count: yup.number().integer().required(),
  professionalism: yup.number().integer().required(),
  timeliness: yup.number().integer().required(),
  quality: yup.number().integer().required(),
  rating: yup.number().integer().required(),
});

export const mechanicCompanySchema = yup.object().shape({
  id: yup.string().required(),
  companyName: yup.string().required(),
  address: addressTypeSchema,
  phone: yup.string().required(),
  email: yup.string().email().required(),
  logo: yup.string().url().required(),
  //   mechanicIds: yup.array().of(yup.string().required()).required(),
});

export const indianState = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];
