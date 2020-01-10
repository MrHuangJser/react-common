[TOC]

# common react utils

## Components

## Hooks

- [useEncryptedLocalStorage](#useEncryptedLocalStorage)

### useEncryptedLocalStorage

eg:

```typescript
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
```

## decorators

- [AntdColumns](#AntdColumns)

### AntdColumns

eg:

```typescript
import Input from 'antd/lib/input';
import Table from 'antd/lib/table';
import React, { FC, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';
import { AntdColumn } from '../src/decorators';
import { createAntdColumn } from '../src/utils';

class Test {
  @AntdColumn<Test, { namePrefix: string }>(props => ({
    title: '名称',
    render: text => `${props.namePrefix}_${text}`,
  }))
  name: string;
}

const CompTest: FC = () => {
  const [namePrefix, setPrefix] = useState('');

  const columns = useMemo(
    () => createAntdColumn<typeof Test, { namePrefix: string }>(Test, { namePrefix }),
    [namePrefix]
  );

  return (
    <>
      <div>
        <Input value={namePrefix} onChange={e => setPrefix(e.target.value)} />
      </div>
      <Table columns={columns} />
    </>
  );
};

ReactDOM.render(<CompTest />, document.body);
```

## Utils

- [createGlobalState](#createGlobalState)

### createGlobalState

eg:

```typescript
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
```
