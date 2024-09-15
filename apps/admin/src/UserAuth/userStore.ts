import { StateCreator } from 'zustand';
import { User } from 'firebase/auth';
import { masterInterface } from '../app/store';

// Define the user store type with methods to manipulate user state
export interface UserStoreType {
  user: User | null | undefined;
  setUser: (user: User | null) => void;
  resetUser: () => void;
}

// Create the user store using zustand
export const createUserStore: StateCreator<
  masterInterface,
  [],
  [],
  UserStoreType
> = (set) => ({
  user: undefined,
  setUser: (user: User | null) => set((state) => ({ ...state, user })),
  resetUser: () => set((state) => ({ ...state, user: undefined })),
});
