// GenericTable.tsx
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { TableProps } from './Types'

function GenericTable<T>({ data, columns, hiddenColumns = [] }: TableProps<T>) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map(
            (column) =>
              !hiddenColumns.includes(column.field) && (
                <TableCell key={column.field as string}>
                  {column.headerName}
                </TableCell>
              )
          )}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {columns.map(
              (column) =>
                !hiddenColumns.includes(column.field) && (
                  <TableCell key={column.field as string}>
                    {row[column.field]}
                  </TableCell>
                )
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default GenericTable
