import { StateCreator } from 'zustand';
import { masterInterface } from '../app/store';
import { EmployeeProfile } from '@xcycle-tools/types';

export interface employeesStoreType {
  employeeProfile: EmployeeProfile | null | undefined;
  setEmployee: (profile: EmployeeProfile | null | undefined) => void;
  resetEmployee: () => void;
}

export const createEmployeeStore: StateCreator<
  masterInterface,
  [],
  [],
  employeesStoreType
> = (set) => ({
  employeeProfile: undefined,
  setEmployee: (profile: EmployeeProfile | null | undefined) =>
    set((state) => ({ ...state, employeeProfile: profile })),
  resetEmployee: () =>
    set((state) => ({ ...state, employeeProfile: undefined })),
});
