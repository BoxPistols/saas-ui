// CustomTableSortFilter/index.stories.tsx
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import { Meta } from '@storybook/react'
import { Table, TableBody, TableSortLabel } from '@mui/material'

import { CustomTable } from '@/components/Table/CustomTable'
import { CustomTableCell } from '@/components/Table/CustomTableCell'
import { CustomTableContainer } from '@/components/Table/CustomTableContainer'
import { CustomTableHeader } from '@/components/Table/CustomTableHeader'
import { CustomTableRow } from '@/components/Table/CustomTableRow'
import { StyledTableCellSort } from '.'

import ColumnSelector from '@/components/Table/CustomTableColumnSelector/ColumnSelector'

export default {
  title: 'Component/Table/SortFilter',
  component: Table,
} as Meta

// ダミーデータの型定義（汎用的な型定義に変更）
interface Product {
  [key: string]: any
}

// デフォルトストーリー
export function Default() {
  // ダミーデータの取得（本来はAPIから取得）
  const [data, setData] = useState<Product[]>([])
  // ソート機能
  const [sortField, setSortField] = useState<string | null>(null)
  // ソート方向
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  // カラム選択機能
  const [hiddenColumns, setHiddenColumns] = useState<(keyof Product)[]>([])

  // ダミーデータの取得（本来はAPIから取得）
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(jsonData => setData(jsonData.products))
  }, [])

  // ソート機能
  const handleSort = (field: string) => {
    const isAsc = sortField === field && sortDirection === 'asc'
    setSortField(field)
    setSortDirection(isAsc ? 'desc' : 'asc')
  }

  //　SortFilterコンポーネントの実装
  const sortedData = [...data].sort((a, b) => {
    if (!sortField || a[sortField] === b[sortField]) return 0
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1
    return sortDirection === 'asc' ? 1 : -1
  })

  // カラムの動的生成（非表示のカラムを除外）
  const columns =
    data.length > 0
      ? Object.keys(data[0])
          .filter(key => key !== 'images' && !hiddenColumns.includes(key)) // hiddenColumns をチェック
          .map(key => ({
            field: key,
            headerName: key.charAt(0).toUpperCase() + key.slice(1),
          }))
      : []

  return (
    <>
      <ColumnSelector
        // カラムを動的に生成
        columns={Object.keys(data[0] || {}).map(key => ({
          field: key,
          headerName: key.charAt(0).toUpperCase() + key.slice(1),
        }))}
        // string[]に変換
        hiddenColumns={hiddenColumns as string[]}
        // 型変換
        setHiddenColumns={
          setHiddenColumns as React.Dispatch<React.SetStateAction<string[]>>
        }
      />
      <CustomTableContainer>
        <CustomTable>
          <CustomTableHeader>
            {columns.map(column => {
              // 非表示のカラムは表示しない
              if (hiddenColumns.includes(column.field)) return null
              // ソート機能の実装
              return (
                <StyledTableCellSort key={column.field}>
                  <TableSortLabel
                    active={sortField === column.field}
                    direction={
                      sortField === column.field ? sortDirection : 'asc'
                    }
                    onClick={() => handleSort(column.field)}
                  >
                    {column.headerName}
                  </TableSortLabel>
                </StyledTableCellSort>
              )
            })}
          </CustomTableHeader>
          <TableBody>
            {sortedData.map((product, index) => (
              <CustomTableRow key={index}>
                {columns.map(column => (
                  <CustomTableCell key={column.field}>
                    {column.field === 'thumbnail' ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product[column.field]}
                        alt={product['title']}
                        style={{ width: '50px' }}
                      />
                    ) : (
                      product[column.field]
                    )}
                  </CustomTableCell>
                ))}
              </CustomTableRow>
            ))}
          </TableBody>
        </CustomTable>
      </CustomTableContainer>
    </>
  )
}
