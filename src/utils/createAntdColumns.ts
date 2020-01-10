import { columnSymbol, ISortedColumn } from '../decorators';

export function createAntdColumn<T = any, P = any>(target: T, props?: P): Array<ISortedColumn<T>> {
  if (!(target as any).constructor) {
    return [];
  }
  const columnsMetadata: { [key: string]: (props?: P) => ISortedColumn<T> } =
    Reflect.getMetadata(columnSymbol, new (target as any)()) ?? {};
  const columns: Array<ISortedColumn<T>> = [];
  for (const key in columnsMetadata) {
    if (columnsMetadata.hasOwnProperty(key)) {
      const column: ISortedColumn<T> = {
        title: key,
        sortIndex: 1,
        dataIndex: key as any,
        ...(columnsMetadata[key] && columnsMetadata[key](props)),
      };
      columns.push(column);
    }
  }
  return columns.sort((a, b) => a.sortIndex ?? 1 - (b.sortIndex ?? 1));
}
