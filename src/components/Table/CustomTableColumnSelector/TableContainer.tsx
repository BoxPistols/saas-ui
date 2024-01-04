// TableContainer.tsx
import React, { useState } from 'react'
import GenericTable from './GenericTable'
import ColumnSelector from './ColumnSelector'
import { TableColumn } from './Types'

interface Product {
  id: number
  title: string
  description: string
  price: number
}

const productColumns: TableColumn<Product>[] = [
  { field: 'id', headerName: 'ID' },
  { field: 'title', headerName: 'Title' },
  { field: 'description', headerName: 'Description' },
  { field: 'price', headerName: 'Price' },
]

function TableContainer() {
  const [hiddenColumns, setHiddenColumns] = useState<(keyof Product)[]>([])

  // ダミーデータの取得（本来はAPIから取得）
  const data: Product[] = [
    { id: 1, title: 'Product 1', description: 'Description 1', price: 100 },
    { id: 2, title: 'Product 2', description: 'Description 2', price: 200 },
    { id: 3, title: 'Product 3', description: 'Description 3', price: 300 },
    { id: 4, title: 'Product 4', description: 'Description 4', price: 400 },
  ]
  return (
    <div>
      <ColumnSelector
        columns={productColumns}
        hiddenColumns={hiddenColumns}
        setHiddenColumns={setHiddenColumns as React.Dispatch<React.SetStateAction<string[]>>}
      />
      <GenericTable
        data={data}
        columns={productColumns}
        hiddenColumns={hiddenColumns}
      />
    </div>
  )
}

export default TableContainer
