import { ColumnProps } from 'antd/lib/table';
import 'reflect-metadata';

export const columnSymbol = Symbol('columns');
export type ISortedColumn<T> = ColumnProps<T> & { sortIndex?: number; dataIndex?: keyof T };

export function AntdColumn<T = any, P = any>(getOptions?: (props: P) => ISortedColumn<T>) {
  return (target: any, propertyName: string) => {
    const columns = Reflect.getMetadata(columnSymbol, target) ?? {};
    Reflect.defineMetadata(columnSymbol, { ...columns, [propertyName]: getOptions }, target);
  };
}
