import { TableBody } from '@mui/material'
import { Meta } from '@storybook/react'

import { CustomTable } from '@/components/Table/CustomTable'
import { CustomTableCell } from '@/components/Table/CustomTableCell'
import { CustomTableContainer } from '@/components/Table/CustomTableContainer'
import { CustomTableHeader } from '@/components/Table/CustomTableHeader'
import { CustomTableRow } from '@/components/Table/CustomTableRow'

const meta: Meta<typeof CustomTable> = {
  title: 'Component/Table/CustomTableCell',
  component: CustomTable,
  tags: ['autodocs'],
  argTypes: {
    minWidthValue: {
      control: 'number',
      defaultValue: 120,
    },
    maxWidthValue: {
      control: 'number',
      defaultValue: 240,
    },
    ellipsis: {
      control: 'boolean',
      defaultValue: true,
    },
    showTooltip: {
      control: 'boolean',
      defaultValue: true,
    },
    tooltipPlacement: {
      control: { type: 'select' },
      options: [
        'bottom-start',
        'bottom',
        'bottom-end',
        'top-start',
        'top',
        'top-end',
      ],
    },
    lineClamp: {
      control: 'number',
      defaultValue: 2,
    },
    tooltipEnterDelay: {
      control: 'number',
      defaultValue: 2000,
    },
    tooltipRadius: {
      control: 'text',
      defaultValue: '4px',
    },
    arrow: {
      control: 'boolean',
      defaultValue: true,
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right', 'justify', 'inherit'],
    },
  },
} as Meta<typeof CustomTable>

export default meta

// カラムの定義
const columns = [
  {
    id: 'name',
    label: 'テナント名',
    minWidth: 120,
    maxWidth: 320,
  },
  { id: 'info', label: '会社説明', minWidth: 80 },
  { id: 'address', label: '住所', minWidth: 100 },
  { id: 'date', label: '登録日', minWidth: 180 },
]

// データ生成関数
const createData = (
  name: string,
  info: string,
  address: string,
  date: string,
) => {
  return { name, info, address, date }
}
// テストデータ
const rows = [
  createData(
    'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    '説明A',
    '住所A',
    '2021/01/01',
  ),
  createData(
    '株式会社B',
    '説明B',
    'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    '2021/02/01',
  ),
  createData(
    '株式会社C',
    '説明C',
    '住所C',
    'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco',
  ),
]
export const Default = (args: {
  minWidthValue: number
  maxWidthValue: number
  ellipsis: boolean
  lineClamp: number
  showTooltip: boolean
  tooltipPlacement:
    | 'bottom'
    | 'left'
    | 'right'
    | 'top'
    | 'bottom-start'
    | 'bottom-end'
    | 'top-start'
    | 'top-end'
    | 'left-end'
    | 'left-start'
    | 'right-end'
    | 'right-start'
  tooltipEnterDelay: number
  tooltipRadius: string
  arrow: boolean
  align: 'left' | 'right' | 'center' | 'justify' | 'inherit'
}) => {
  return (
    <CustomTableContainer>
      <CustomTable>
        <CustomTableHeader>
          {columns.map(column => (
            <CustomTableCell
              key={column.id}
              style={{
                minWidth: column.minWidth,
                maxWidth: column.maxWidth,
              }}
              sx={{ whiteSpace: 'nowrap' }}
            >
              {column.label}
            </CustomTableCell>
          ))}
        </CustomTableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <CustomTableRow key={index}>
              {columns.map(column => (
                <CustomTableCell
                  key={column.id}
                  // align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                  }}
                  {...args}
                >
                  {row[column.id as keyof typeof row]}
                </CustomTableCell>
              ))}
            </CustomTableRow>
          ))}
        </TableBody>
      </CustomTable>
    </CustomTableContainer>
  )
}

Default.args = {
  minWidthValue: 80,
  maxWidthValue: 240,
  align: 'left',
  ellipsis: true,
  lineClamp: 2,
  showTooltip: true,
  tooltipPlacement: 'bottom-start',
  tooltipEnterDelay: 2000,
  tooltipRadius: '4px',
  arrow: true,
}
