# decorators

- [decorators](#decorators)
  - [AntdColumns](#antdcolumns)

## AntdColumns

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
