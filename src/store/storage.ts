import { Storage } from 'redux-persist';
import { MMKV } from 'react-native-mmkv';

// Important note: Currently, React Native MMKV is not supported in Expo Go.
// Instead, consider using Expo Dev Build.
// Alternatively, you can find a workaround by using react-native-async-storage with redux-persist.
const storage = new MMKV();

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    storage.delete(key);
    return Promise.resolve();
  },
};
