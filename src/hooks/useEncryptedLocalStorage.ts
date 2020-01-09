import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';

function encrypt<T>(value: T): string {
  return value === undefined ? '' : btoa(JSON.stringify(value));
}

export function useEncryptedLocalStorage<T>(
  key: string,
  defaultValue?: T
): [T | undefined, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    localStorage.setItem(key, encrypt(defaultValue));
    return defaultValue;
  });

  const originalValue = useMemo(() => {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(atob(v)) : defaultValue;
  }, [key, defaultValue]);

  const setItem = useCallback<Dispatch<SetStateAction<T>>>(
    nextValue => {
      localStorage.setItem(key, btoa(JSON.stringify(nextValue)) ?? '');
      setValue(nextValue instanceof Function ? nextValue(value!) : nextValue);
    },
    [value, key]
  );

  useEffect(() => {});

  useEffect(() => {
    setValue(originalValue);
  }, [originalValue]);

  return [value, setItem];
}
