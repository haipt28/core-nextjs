import { useState, useEffect, Dispatch, SetStateAction } from "react";

type ReturnValue<T> = [T, Dispatch<SetStateAction<T>>];

function useLocalStorage<T>(key: string, initialValue: T): ReturnValue<T> {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error getting from local storage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error setting to local storage:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
