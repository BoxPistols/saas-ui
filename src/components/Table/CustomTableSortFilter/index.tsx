// Table/CustomTableSortFilter/index.tsx
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { TableSortLabel, styled } from '@mui/material'
import { StyledTableCell } from '@/components/Table/Styled/StyledTableCell'


interface SortFilterProps<T> {
  field: keyof T
  fieldLabel: string
  sortField: keyof T | null
  sortDirection: 'asc' | 'desc'
  onSort: (field: keyof T) => void
}

export const SortFilter = <T,>({
  field,
  fieldLabel,
  sortField,
  sortDirection,
  onSort,
}: SortFilterProps<T>) => {
  return (
    <StyledTableCell>
      <TableSortLabel
        active={sortField === field}
        direction={sortField === field ? sortDirection : 'asc'}
        onClick={() => onSort(field)}
        sx={{
          '&.MuiTableSortLabel-root': {
            color: 'white',
          },
        }}
      >
        {fieldLabel}
        {sortField === field ? (
          sortDirection === 'asc' ? (
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
          )
        ) : null}
      </TableSortLabel>
    </StyledTableCell>
  )
}
