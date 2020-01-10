import Button from 'antd/lib/button';
import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { useEncryptedLocalStorage } from '../src/hooks';

interface UserInfo {
  username: string;
  token: string;
}

export const CompTest: FC = () => {
  const [userInfo, setUserInfo] = useEncryptedLocalStorage<UserInfo>('userInfo');

  return (
    <>
      <div>
        <Button
          onClick={() => {
            setUserInfo({ username: 'aaa', token: 'abc' });
          }}
        >
          set user info
        </Button>
      </div>
      <p>{JSON.stringify(userInfo, null, 2)}</p>
    </>
  );
};

ReactDOM.render(<CompTest />, document.body);
