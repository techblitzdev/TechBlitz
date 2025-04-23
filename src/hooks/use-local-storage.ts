import { useEffect, useState } from 'react';

interface UseLocalStorageProps<T> {
  key: string;
  defaultValue: T;
}

export function useLocalStorage<T>({ key, defaultValue }: UseLocalStorageProps<T>) {
  // Initialize with a function to avoid reading localStorage during SSR
  const [value, setValue] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue;

    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, value]);

  // Add helper functions for array operations
  const addToArray = (newItem: string) => {
    if (Array.isArray(value)) {
      setValue([...value, newItem] as T);
    }
  };

  const removeFromArray = (itemToRemove: string): void => {
    if (Array.isArray(value)) {
      setValue(value.filter((item) => item !== itemToRemove) as T);
    }
  };

  const toggleInArray = (item: string) => {
    if (Array.isArray(value)) {
      if (value.includes(item)) {
        removeFromArray(item);
      } else {
        addToArray(item);
      }
    }
  };

  return {
    value,
    setValue,
    addToArray,
    removeFromArray,
    toggleInArray,
  };
}
