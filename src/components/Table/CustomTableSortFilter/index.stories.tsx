// CustomTableSortFilter/index.stories.tsx
import React, { useState, useEffect } from 'react'
import { Meta } from '@storybook/react'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
} from '@mui/material'

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
  const [data, setData] = useState<Product[]>([])
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(jsonData => setData(jsonData.products))
  }, [])

  const handleSort = (field: string) => {
    const isAsc = sortField === field && sortDirection === 'asc'
    setSortField(field)
    setSortDirection(isAsc ? 'desc' : 'asc')
  }

  // カラムの動的生成
  const columns =
    data.length > 0
      ? Object.keys(data[0])
          .filter(key => key !== 'images')
          .map(key => ({
            field: key,
            headerName: key.charAt(0).toUpperCase() + key.slice(1),
          }))
      : []

  const sortedData = [...data].sort((a, b) => {
    if (!sortField || a[sortField] === b[sortField]) return 0
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1
    return sortDirection === 'asc' ? 1 : -1
  })

  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map(column => (
            <TableCell key={column.field}>
              <TableSortLabel
                active={sortField === column.field}
                direction={sortField === column.field ? sortDirection : 'asc'}
                onClick={() => handleSort(column.field)}
              >
                {column.headerName}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {sortedData.map((product, index) => (
          <TableRow key={index}>
            {columns.map(column => (
              <TableCell key={column.field}>
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
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
