// Component: Components/Table/CustomTableSortFilter
import {
  TableSortLabel,
  styled,
  TableCell,
  tableCellClasses,
} from '@mui/material'

// ----- SortFilter Props Type -----
interface SortFilterProps {
  field: string
  fieldLabel: string
  sortField: string | null
  sortDirection: 'asc' | 'desc'
  onSort: (field: string) => void
}

// ----- Cell Component Original Style -----
export const StyledTableCellSort = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.grey[900],
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    "> span:not([class*='MuiIconButton-root'])": {
      whiteSpace: 'nowrap',
    },
    '> .MuiTableSortLabel-root, .MuiTableSortLabel-root:hover, .MuiTableSortLabel-root.Mui-active':
      {
        color: 'white',
        '>.MuiTableSortLabel-icon': {
          color: 'white',
        },
      },
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

// ----- SortFilter Component -----
/**
 *
 * @param field ソート対象のフィールド
 * @param fieldLabel ソート対象のフィールドのラベル
 * @param sortField ソート対象のフィールド
 * @param sortDirection ソート方向
 *
 * TableSortLabel https://mui.com/api/table-sort-label/
 * @active ソート対象のフィールドかどうか
 * @direction ソート方向
 * @onSort ソート時のコールバック関数
 */
export const SortFilter = ({
  field,
  fieldLabel,
  sortField,
  sortDirection,
  onSort,
}: SortFilterProps) => {
  return (
    <StyledTableCellSort>
      <TableSortLabel
        active={sortField === field}
        direction={sortField === field ? sortDirection : 'asc'}
        onClick={() => onSort(field)}
      >
        {fieldLabel}
      </TableSortLabel>
    </StyledTableCellSort>
  )
}
