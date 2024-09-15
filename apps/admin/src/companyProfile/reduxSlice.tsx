import { StateCreator } from 'zustand';
import { masterInterface } from '../app/store';
import { CompanyProfile } from './form';


export interface CompanyDetailStoreType {
  companyProfile: CompanyProfile | null | undefined;
  setCompany: (profile: CompanyProfile | null | undefined) => void;
  resetCompany: () => void;
}

export const createCompanyStore: StateCreator<
  masterInterface,
  [],
  [],
  CompanyDetailStoreType
> = (set) => ({
  companyProfile: undefined,
  setCompany: (profile: CompanyProfile | null | undefined) => set((state) => ({ ...state, companyProfile: profile })),
  resetCompany: () => set((state) => ({ ...state, companyProfile: undefined })),
});
