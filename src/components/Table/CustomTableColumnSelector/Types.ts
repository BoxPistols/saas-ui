// https://dummyjson.com/products
// Types.ts
export type Product = {
  id: number
  title: string
  description: string
  price: number
  category: string
  image: string
}

export type TableColumn<T> = {
  field: keyof T
  headerName: string
}

export type TableProps<T> = {
  data: T[]
  columns: TableColumn<T>[]
  hiddenColumns?: (keyof T)[]
}
