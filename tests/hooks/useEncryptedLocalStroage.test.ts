import { act, renderHook } from '@testing-library/react-hooks';
import { useEncryptedLocalStorage } from '../../src/hooks';

describe('useEncryptedLocalStorage', () => {
  it('should be defined', () => {
    expect(useEncryptedLocalStorage).toBeDefined();
  });

  it('could read and write', () => {
    const defaultValue = { a: 1 };
    const nextValue = { a: 2 };
    const { result } = renderHook(() => useEncryptedLocalStorage('object', defaultValue));
    const [, setValue] = result.current;
    expect(setValue).toBeInstanceOf(Function);
    expect(result.current[0]).toEqual(defaultValue);
    expect(localStorage.__STORE__.object).toEqual(Buffer.from(JSON.stringify(defaultValue)).toString('base64'));
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      'object',
      Buffer.from(JSON.stringify(defaultValue)).toString('base64')
    );

    act(() => {
      setValue(nextValue);
    });

    expect(result.current[0]).toEqual(nextValue);
    expect(localStorage.__STORE__.object).toEqual(Buffer.from(JSON.stringify(nextValue)).toString('base64'));
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      'object',
      Buffer.from(JSON.stringify(nextValue)).toString('base64')
    );
  });
});
