import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { IProperty } from '@/types/property';
import { persist } from 'zustand/middleware';
import { getPersistOpt } from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const defaultProperty: IProperty = {
  managerId: '',
  address: '',
  state: '',
  postcode: '',
  piSerialNumber: '',
  propertyId: '',
  city: '',
  trackableFacilities: [],
  defaultFacilities: [],
  photos: []
};

type LoadingState = {
  loading: boolean;
  text?: string;
}

type GlobalState = {
  loadingData: LoadingState;
  propertyData: IProperty
}

type Action = {
  updateLoading: (status: LoadingState) => void,
  uploadPropertyData: (data: IProperty) => void
}

export const useGlobalStore = create<GlobalState & Action>()(
  persist(
    immer(
      (set) => ({
        loadingData: {
          loading: false,
          text: ''
        },
        propertyData: {
          ...defaultProperty
        },
        uploadPropertyData: (data: IProperty) => set((state) => {
          state.propertyData = {
            ...state.propertyData,
            ...data
          };
        }),
        updateLoading: (data) => set((state) => {
          state.loadingData.loading = data.loading;
          state.loadingData.text = data.text;
        }),
      })
    ),
    {
      name: 'global-storage',
      storage: {
        removeItem: async (name: string) => {
          await AsyncStorage.removeItem(name);
        },
        getItem: async (name: string) => {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (name, value) => {
          await AsyncStorage.setItem(name, JSON.stringify(value));
        },
      },
      partialize: (state) => {
        return {
          propertyData: state.propertyData
        } as GlobalState & Action;
      },
    },
  )
);

