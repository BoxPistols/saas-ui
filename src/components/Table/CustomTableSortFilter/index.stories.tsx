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
  const [data, setData] = useState([]) // データの状態 初期値は空の配列
  const [loading, setLoading] = useState(true) // データのローディング状態
  const [sortField, setSortField] = useState<string | null>(null) // ソートのフィールド
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc') // ソートの方向
  // Pagenation MUI標準のTablePagination
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  // Column Selector
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]) // 非表示のカラム

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
  // 未知のデータであれば、例えば以下の汎用的な型定義を行う
  // type Product = {
  //   [key: string]: string | number | string[] | undefined | null
  // }

  // モックデータの取得
  const [sortedData, setSortedData] = useState([]) // 初期値を空の配列に設定
  // モックデータの取得
  useEffect(() => {
    setLoading(true)
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(json => {
        console.log(json.products) // データ構造をチェック
        setData(json.products)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    // ソート処理を行い、ソートされたデータを`sortedData`にセットします。
    const sorted = [...data].sort((a, b) => {
      const fieldA = sortField ? a[sortField] : null
      const fieldB = b[sortField || '']
      if (fieldA !== null && fieldB !== null && fieldA < fieldB) {
        return sortDirection === 'asc' ? -1 : 1
      }
      if (fieldA !== null && fieldB !== null && fieldA > fieldB) {
        return sortDirection === 'asc' ? 1 : -1
      }
      return 0
    })

    setSortedData(sorted)
  }, [data, sortField, sortDirection])

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
  // テーブルのカラム 未知のケース
  // const visibleColumns = Object.keys(data[0] || {}).map(field => ({
  //   field,
  //   headerName: field,
  // }))

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
      {loading ? (
        `Loading...`
      ) : (
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
              {sortedData.length > 0 ? (
                visibleData.map((product: Product, index) => (
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
                ))
              ) : (
                <CustomTableRow>
                  <CustomTableCell>No data</CustomTableCell>
                </CustomTableRow>
              )}
            </TableBody>
          </CustomTable>
        </CustomTableContainer>
      )}
      {/* ----- Pagination ----- */}
      {!loading && (
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
      )}
    </>
  )
}
