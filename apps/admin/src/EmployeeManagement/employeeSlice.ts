import { StateCreator } from 'zustand';
import { masterInterface } from '../app/store';
import { EmployeeProfile } from '@xcycle-tools/types';



export interface employeesStoreType {
  employeeProfile: EmployeeProfile[] | null | undefined;
  setEmployees: (profile: EmployeeProfile[] | null | undefined) => void;
  resetEmployees: () => void;
}

export const createEmployeesStore: StateCreator<
  masterInterface,
  [],
  [],
  employeesStoreType
> = (set) => ({
  employeeProfile: undefined,
  setEmployees: (profile: EmployeeProfile[] | null | undefined) =>
    set((state) => ({ ...state, employeeProfile: profile })),
  resetEmployees: () =>
    set((state) => ({ ...state, employeeProfile: undefined })),
});
