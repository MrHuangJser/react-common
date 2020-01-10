import Button from 'antd/lib/button';
import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { createGlobalState } from '../src/utils';

interface UserInfo {
  username: string;
  email: string;
}

const useGlobalUserInfo = createGlobalState<UserInfo>();

const CompA: FC = () => {
  const [, setUserInfo] = useGlobalUserInfo();

  return (
    <Button
      onClick={() => {
        setUserInfo({ username: 'aaa', email: 'aaa@email.com' });
      }}
    >
      set user info
    </Button>
  );
};

const CompB: FC = () => {
  const [userInfo] = useGlobalUserInfo();

  return <p>{JSON.stringify(userInfo, null, 2)}</p>;
};

const App: FC = () => {
  const [, setUserInfo] = useGlobalUserInfo();

  return (
    <>
      <div>
        <CompA />
        <Button
          onClick={() => {
            setUserInfo(undefined);
          }}
        >
          reset user info
        </Button>
      </div>
      <CompB />
    </>
  );
};
ReactDOM.render(<App />, document.body);
