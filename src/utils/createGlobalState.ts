import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export function createGlobalState<T = any>(initialState?: T) {
  const store: { state: T | undefined; setState: Dispatch<SetStateAction<T>>; setters: any[] } = {
    state: initialState,
    setState(val) {
      store.state = val instanceof Function ? val(store.state!) : val;
      store.setters.forEach(setter => setter(store.state));
    },
    setters: [],
  };
  return (): [T | undefined, Dispatch<SetStateAction<T>>] => {
    const [state, set] = useState(store.state);

    if (!store.setters.includes(set)) {
      store.setters.push(set);
    }

    useEffect(
      () => () => {
        store.setters = store.setters.filter(setter => setter !== set);
      },
      []
    );

    return [state, store.setState];
  };
}
