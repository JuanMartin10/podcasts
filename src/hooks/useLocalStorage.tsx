import { useState } from 'react';

const useLocalStorage = (key: string, defaultValue: string) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item != null ? JSON.parse(item) : defaultValue;
    } catch (error: any) {
      return defaultValue;
    }
  });

  const setValueFc = (value: string) => {
    try {
      setValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err: any) {
      console.error('error:', err);
    }
  };
  return [value, setValueFc];
};

export default useLocalStorage;

export const useExpirationStorage = () => useLocalStorage('expiration', '');
export const useEntriesStorage = () => useLocalStorage('entries', '');
