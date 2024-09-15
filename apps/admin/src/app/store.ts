/* eslint-disable @typescript-eslint/ban-ts-comment */
import { create } from 'zustand';
import { createUserStore, UserStoreType } from '../UserAuth/userStore';
import {
  CompanyDetailStoreType,
  createCompanyStore,
} from '../companyProfile/reduxSlice';
import { createEmployeesStore, employeesStoreType } from '../EmployeeManagement/employeeSlice';


export type masterInterface = UserStoreType &
  CompanyDetailStoreType &
  employeesStoreType;
export const store = create<masterInterface>()((...props) => ({
  ...createUserStore(...props),
  ...createEmployeesStore(...props),
  ...createCompanyStore(...props),
}));
