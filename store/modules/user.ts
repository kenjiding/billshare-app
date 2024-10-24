import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { getPersistOpt } from '../utils';

type User = {
  userId: string;
  role: string;
  username: string;
  phone: string;
  email: string;
  token: string;
};

type State = {
  user: User;
  isManager: boolean;
};

type Action = {
  updateUserInfo: (userState: User) => void;
};

const defaultUser: User = {
  username: '',
  role: '',
  userId: '',
  phone: '',
  email: '',
  token: '',
}

// Create your store, with both state and actions, and persist to localStorage
export const useUserStore = create<State & Action>()(
  persist(
    immer((set, get) => ({
      user: { ...defaultUser },
      isManager: false,
      updateUserInfo: (data: User = { ...defaultUser }) =>
        set((state) => {
          state.user = data;
          state.isManager = data?.role === 'manager';
        }),
    })),
    getPersistOpt<State & Action>('user-storage'),
  )
);
