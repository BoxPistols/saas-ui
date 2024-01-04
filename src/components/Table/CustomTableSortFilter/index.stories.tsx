// CustomTableSortFilter/index.stories.tsx
import React, { useState, useEffect } from 'react'
import { Meta } from '@storybook/react'
import { TableBody, TablePagination } from '@mui/material'

import { CustomTable } from '@/components/Table/CustomTable'
import { CustomTableCell } from '@/components/Table/CustomTableCell'
import { CustomTableContainer } from '@/components/Table/CustomTableContainer'
import { CustomTableHeader } from '@/components/Table/CustomTableHeader'
import { CustomTableRow } from '@/components/Table/CustomTableRow'

import { SortFilter } from '@/components/Table/CustomTableSortFilter' // 修正したインポートパス
import { ColumnSelector } from '@/components/Table/CustomTableColumnSelector/ColumnSelector'

export default {
  title: 'Component/Table/SortFilter',
  component: SortFilter,
  tags: ['autodocs'],
} as Meta

// デフォルトストーリー
export const Default = () => {
  const [data, setData] = useState([])
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]) // 追加したステート
  // pagenation
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  // The type definition for the data
  type Product = {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
  }

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(json => setData(json.products))
      .catch(error => console.error('Error fetching data:', error))
  }, [])

  // テーブルのカラム
  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'title', headerName: 'Title' },
    { field: 'description', headerName: 'Description' },
    { field: 'price', headerName: 'Price' },
    { field: 'discountPercentage', headerName: 'Discount(%)' },
    { field: 'rating', headerName: 'Rating' },
    { field: 'stock', headerName: 'Stock' },
    { field: 'brand', headerName: 'Brand' },
    { field: 'category', headerName: 'Category' },
    { field: 'thumbnail', headerName: 'Thumbnail' },
    // { field: 'images', headerName: 'Images' },
  ]

  // ソートのハンドラー
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(prevSortDirection =>
        prevSortDirection === 'asc' ? 'desc' : 'asc',
      )
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  // ... ソートとページネーションのロジック
  const sortedData = data.sort((a, b) => {
    const fieldA = a[sortField!]
    const fieldB = b[sortField!]
    if (fieldA < fieldB) {
      return sortDirection === 'asc' ? -1 : 1
    }
    if (fieldA > fieldB) {
      return sortDirection === 'asc' ? 1 : -1
    }
    return 0
  })

  // ----- Pagenation
  const visibleData = sortedData.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  )

  // ----- Column Selector
  // 非表示のカラムを除外
  const visibleColumns = columns.filter(
    column => !hiddenColumns.includes(column.field),
  )

  return (
    <>
      {/* ----- Column Selector ----- */}
      <ColumnSelector
        columns={columns}
        hiddenColumns={hiddenColumns}
        setHiddenColumns={setHiddenColumns} // ステートを渡すように変更
      />
      {/* ----- Table ----- */}
      <CustomTableContainer>
        <CustomTable>
          <CustomTableHeader>
            {/* ----- SortFilter ----- */}
            {visibleColumns.map(column => (
              // {/* ----- Thumbnail = image----- */}
              <SortFilter
                key={column.field}
                field={column.field === 'thumbnail' ? 'image' : column.field}
                fieldLabel={column.headerName}
                sortField={sortField}
                sortDirection={sortDirection}
                onSort={handleSort}
              />
            ))}
          </CustomTableHeader>
          {/* ----- TableBody ----- */}
          <TableBody>
            {visibleData.map((product: Product, index: number) => (
              <CustomTableRow key={index}>
                {visibleColumns.map(column => (
                  <CustomTableCell key={column.field}>
                    {/* 'thumbnail' フィールドの場合は画像を表示します */}
                    {column.field === 'thumbnail' ||
                    column.field === 'images' ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        style={{ maxWidth: '100px', maxHeight: '100px' }}
                      />
                    ) : (
                      // それ以外のフィールドの場合はテキストを表示します
                      product[column.field as keyof Product]
                    )}
                  </CustomTableCell>
                ))}
              </CustomTableRow>
            ))}
          </TableBody>
        </CustomTable>
      </CustomTableContainer>
      {/* ----- Pagination ----- */}
      <TablePagination
        component="div"
        count={sortedData.length}
        page={page}
        onPageChange={(_e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={e => setRowsPerPage(+e.target.value)}
        // 以下はオプションです
        rowsPerPageOptions={[3, 5, 10, 20, 25, sortedData.length]}
        labelRowsPerPage="Rows per page"
        // 以下はオプションです
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} of ${count}`
        }
      />
    </>
  )
}
