// GenericTable.tsx
import React from 'react'

import { TableProps } from './Types'
import { TableBody } from '@mui/material'

import { CustomTable } from '@/components/Table/CustomTable'
import { CustomTableCell } from '@/components/Table/CustomTableCell'
import { CustomTableContainer } from '@/components/Table/CustomTableContainer'
import { CustomTableHeader } from '@/components/Table/CustomTableHeader'
import { CustomTableRow } from '@/components/Table/CustomTableRow'

function GenericTable<T>({ data, columns, hiddenColumns = [] }: TableProps<T>) {
  return (
    <CustomTableContainer>
      <CustomTable>
        <CustomTableHeader>
          {columns.map(
            (column) =>
              !hiddenColumns.includes(column.field) && (
                <CustomTableCell key={column.field as string}>
                  {column.headerName}
                </CustomTableCell>
              )
          )}
        </CustomTableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <CustomTableRow key={rowIndex}>
              {columns.map(
                (column) =>
                  !hiddenColumns.includes(column.field) && (
                    <CustomTableCell key={column.field as string}>
                      {row[column.field]}
                    </CustomTableCell>
                  )
              )}
            </CustomTableRow>
          ))}
        </TableBody>
      </CustomTable>
    </CustomTableContainer>
  )
}

export default GenericTable
