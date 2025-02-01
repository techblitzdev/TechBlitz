import { useEffect, useState } from 'react';

export const useLocalStorage = <T>(opts: {
  key: string;
  defaultValue: T;
  serialize?: (value: T) => string;
  deserialize?: (value: string) => T;
}) => {
  const { key, defaultValue, serialize = JSON.stringify, deserialize = JSON.parse } = opts;

  // Function to safely get the value from localStorage
  const getStoredValue = (): T => {
    try {
      // Handle SSR case
      if (typeof window === 'undefined') {
        return defaultValue;
      }

      const item = window.localStorage.getItem(key);
      return item ? deserialize(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  };

  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  // Function to safely update localStorage and state
  const setValue = (value: T | ((prevValue: T) => T)) => {
    try {
      // Handle function updates
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, serialize(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Remove item from localStorage
  const remove = () => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
      setStoredValue(defaultValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  };

  // Sync state with localStorage when key changes
  useEffect(() => {
    setStoredValue(getStoredValue());
  }, [key]);

  return {
    value: storedValue,
    setValue,
    remove,
  } as const;
};
