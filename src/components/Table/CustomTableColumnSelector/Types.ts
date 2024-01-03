// Types.ts
// https://dummyjson.com/products
export type TableColumn<T> = {
  field: keyof T
  headerName: string
}

export type TableProps<T> = {
  data: T[]
  columns: TableColumn<T>[]
  hiddenColumns?: (keyof T)[]
}

