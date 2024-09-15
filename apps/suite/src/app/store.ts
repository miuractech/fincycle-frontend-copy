/* eslint-disable @typescript-eslint/ban-ts-comment */
import { create } from 'zustand';
import { createUserStore, UserStoreType } from '../UserAuth/userStore';
import { createEmployeeStore, employeesStoreType } from './employeeSlice';


export type masterInterface = UserStoreType & employeesStoreType;
export const store = create<masterInterface>()((...props) => ({
  ...createUserStore(...props),
  ...createEmployeeStore(...props),
}));
