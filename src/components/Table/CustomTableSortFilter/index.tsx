// Table/CustomTableSortFilter/index.tsx
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { TableSortLabel } from '@mui/material'

import { styled, TableCell, tableCellClasses } from '@mui/material'

interface SortFilterProps {
  field: string
  fieldLabel: string
  sortField: string | null
  sortDirection: 'asc' | 'desc'
  onSort: (field: string) => void
}

// ----- Cell BasicStyle -----
export const StyledTableCellSort = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[900],
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
        {sortField === field &&
          (sortDirection === 'asc' ? (
            <ArrowUpwardIcon
              sx={{
                fontSize: '16px',
              }}
            />
          ) : (
            <ArrowDownwardIcon
              sx={{
                fontSize: '16px',
              }}
            />
          ))}
      </TableSortLabel>
    </StyledTableCellSort>
  )
}
