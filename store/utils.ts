import AsyncStorage, { AsyncStorageStatic } from '@react-native-async-storage/async-storage';
import { StorageValue } from 'zustand/middleware';

export const getPersistOpt = <T>(storageName: string, extraOptions?: (AsyncStorage: AsyncStorageStatic) => ({
  getItem?: (name: string) => Promise<T | null>,
  setItem?: (name: string, value: StorageValue<T>) => Promise<T | null>,
  removeItem?: (name: string) => Promise<T | null>,
})) => {
  const options = extraOptions?.(AsyncStorage);
  return {
    name: storageName,
    storage: {
      getItem: async (name: string) => {
        if (options?.getItem) await options?.getItem(name);
        else {
          const value = await AsyncStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        }
      },
      setItem: async (name: string, value: StorageValue<T>) => {
        if (options?.setItem) await options?.setItem(name, value);
        else await AsyncStorage.setItem(name, JSON.stringify(value));
      },
      removeItem: async (name: string) => {
        await AsyncStorage.removeItem(name);
      },
    },
  }
};