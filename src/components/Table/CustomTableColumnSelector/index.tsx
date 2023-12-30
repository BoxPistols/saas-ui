// Table/CustomTableColumnSelector/index.tsx
import { Clear, Delete, Edit, Visibility } from '@mui/icons-material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined'
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useEffect, useState } from 'react'

// API data type
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

// Styled Cell
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  maxHeight: '2.5em',
  padding: '0.75em 1.25em',
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    cursor: 'pointer',
    fontWeight: 700,
    paddingLeft: '1.5em',
    position: 'relative',
    fontSize: 15,
    whiteSpace: 'nowrap',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    paddingLeft: '1.75em',
  },
}))

// Styled Row
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.grey[200],
    cursor: 'pointer',
  },
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
    '&.Mui-selected, &.Mui-selected:hover': {
      backgroundColor: theme.palette.action.selected,
    },
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

// Action Cell
const handleAction = (action: string, row: Product) => {
  switch (action) {
    case 'detail':
      alert(`${row.title} の詳細です \n ${JSON.stringify(row)}`)
      break
    case 'edit':
      // TODO: Implement edit action.
      alert(`${row.title} を開き編集します \n 編集ページ \n ${row.id}`)
      break
    case 'delete':
      if (window.confirm(`${row.title} を消去してもよろしいですか?`)) {
        // TODO: Implement delete action.
        alert(`${row.title} を消去しました`)
      } else {
        alert(`${row.title} を消去しませんでした`)
      }
      break
    default:
      break
  }
}

// Search in all fields of the object
const multiFieldSearch = (row: Product, query: string) => {
  // Define the fields to include in the search
  const searchableFields: (keyof Product)[] = [
    'title',
    'description',
    'price',
    'rating',
    'stock',
    'brand',
    'category',
  ]

  return searchableFields.some((field) =>
    String(row[field]).toLowerCase().includes(query.toLowerCase())
  )
}

// これはAPIからデータを取得するためのコードです
export const ApiFilterTable = () => {
  const [search, setSearch] = useState('')
  const isSearchEmpty = search === ''
  const [filteredAndSortedRows, setFilteredAndSortedRows] = useState<Product[]>(
    []
  )

  // Fetch data from API
  const [rows, setRows] = useState<Product[]>([]) // Defined rows as Product array
  const [sortField, setSortField] = useState<keyof Product | null>(null) // Defined sortField as keyof Product
  const [sortDirection, setSortDirection] = useState('asc')

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => setRows(data.products))
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  // Pagination states
  const [page, setPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Clear search
  const handleClearSearch = () => {
    setSearch('')
    setPage(1)
  }

  // Sort states
  const handleSort = (field: keyof Product) => {
    let direction = 'asc'
    if (sortField === field && sortDirection === 'asc') {
      direction = 'desc'
    }
    setSortField(field)
    setSortDirection(direction)
  }

  // Sort icon
  const SortIcon =
    sortDirection === 'asc' ? (
      <ArrowUpwardIcon
        sx={{
          fontSize: 20,
          position: 'absolute',
          top: '0.75em',
          padding: '0 2px',
        }}
      />
    ) : (
      <ArrowDownwardIcon
        sx={{
          fontSize: 20,
          position: 'absolute',
          top: '0.75em',
          padding: '0 2px',
        }}
      />
    )

  // Pagination
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value)
  }

  // Paginate the data
  const pageCount = Math.ceil(filteredAndSortedRows.length / itemsPerPage)
  const paginatedRows = filteredAndSortedRows.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  // Filter and sort the data
  useEffect(() => {
    setFilteredAndSortedRows(
      rows
        .filter((row) => multiFieldSearch(row, search))
        .sort((a, b) => {
          if (sortField === null) return 0
          if (a[sortField] < b[sortField]) {
            return sortDirection === 'asc' ? -1 : 1
          }
          if (a[sortField] > b[sortField]) {
            return sortDirection === 'asc' ? 1 : -1
          }
          return 0
        })
    )
  }, [rows, search, sortField, sortDirection, page]) // page added

  // Add column selection feature
  const [hiddenColumns, setHiddenColumns] = useState([])
  const [anchorEl, setAnchorEl] = useState(false)

  const columns = [
    { field: 'title', headerName: 'Title' },
    { field: 'price', headerName: 'Price' },
    { field: 'stock', headerName: 'Stock' },
    { field: 'rating', headerName: 'Rating' },
    { field: 'action', headerName: 'Action' },
  ]

  const toggleColumnVisibility = (field: string) => {
    if (hiddenColumns.includes(field)) {
      setHiddenColumns(hiddenColumns.filter((column) => column !== field))
    } else {
      setHiddenColumns([...hiddenColumns, field])
    }
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleShowAll = () => {
    setHiddenColumns([])
  }

  const handleHideAll = () => {
    setHiddenColumns(columns.map((column) => column.field))
  }
  return (
    <>
      <Box>
        <Box display="flex" justifyContent="flex-end" sx={{ pr: 1 }}>
          <IconButton onClick={handleMenuClick}>
            <ToggleOnOutlinedIcon sx={{ fontSize: 38 }} color="primary" />
          </IconButton>
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {columns.map((column) => (
          <MenuItem key={column.field} sx={{ minWidth: 180, pl: 3, pt: 0 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={!hiddenColumns.includes(column.field)}
                  onChange={() => toggleColumnVisibility(column.field)}
                  size="small"
                />
              }
              label={column.headerName}
            />
          </MenuItem>
        ))}
        <Box display="flex">
          <MenuItem>
            <Button variant="text" onClick={handleShowAll} size="small">
              全て表示
            </Button>
          </MenuItem>
          <MenuItem>
            <Button variant="text" onClick={handleHideAll} size="small">
              全て非表示
            </Button>
          </MenuItem>
        </Box>
        <Box display="flex" justifyContent="center">
          <MenuItem>
            <Button variant="outlined" onClick={handleMenuClose} size="small">
              閉じる
            </Button>
          </MenuItem>
        </Box>
      </Menu>

      <FormControl>
        <Box display="flex" flexDirection="column">
          <FormLabel
            htmlFor="search-input"
            sx={{ position: 'relative', marginBottom: -1.5, fontSize: 12 }}
          >
            データ検索
          </FormLabel>
          <TextField
            id="search-input"
            value={search}
            onChange={handleSearchChange}
            onFocus={() => setPage(1)}
            variant="outlined"
            margin="normal"
            size="small"
            sx={{
              position: 'relative',
              marginBottom: 2,
              minWidth: '20em',
            }}
          />

          {!isSearchEmpty && (
            <IconButton
              onClick={handleClearSearch}
              sx={{ position: 'absolute', top: '0.85em', right: 0 }}
            >
              <Clear sx={{ fontSize: 18 }} />
            </IconButton>
          )}
        </Box>
      </FormControl>

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700, minHeight: 300 }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              {!hiddenColumns.includes('title') && (
                <StyledTableCell onClick={() => handleSort('title')}>
                  Title
                  {sortField === 'title' && SortIcon}
                </StyledTableCell>
              )}
              {!hiddenColumns.includes('price') && (
                <StyledTableCell onClick={() => handleSort('price')}>
                  Price
                  {sortField === 'price' && SortIcon}
                </StyledTableCell>
              )}
              {!hiddenColumns.includes('stock') && (
                <StyledTableCell onClick={() => handleSort('stock')}>
                  Stock
                  {sortField === 'stock' && SortIcon}
                </StyledTableCell>
              )}
              {!hiddenColumns.includes('rating') && (
                <StyledTableCell onClick={() => handleSort('rating')}>
                  Rating
                  {sortField === 'rating' && SortIcon}
                </StyledTableCell>
              )}
              {!hiddenColumns.includes('action') && (
                <StyledTableCell align="center" width={140}>
                  Action
                </StyledTableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row) => (
                // <StyledTableRow hover key={row.id}>
                <StyledTableRow key={row.id}>
                  {!hiddenColumns.includes('title') && (
                    <StyledTableCell component="th" scope="row">
                      {row.title}
                    </StyledTableCell>
                  )}
                  {!hiddenColumns.includes('price') && (
                    <StyledTableCell>{row.price}</StyledTableCell>
                  )}
                  {!hiddenColumns.includes('stock') && (
                    <StyledTableCell>{row.stock}</StyledTableCell>
                  )}
                  {!hiddenColumns.includes('rating') && (
                    <StyledTableCell>{row.rating}</StyledTableCell>
                  )}
                  {!hiddenColumns.includes('action') && (
                    <StyledTableCell
                      align="right"
                      width={140}
                      sx={{ whiteSpace: 'nowrap' }}
                    >
                      <IconButton onClick={() => handleAction('detail', row)}>
                        <Visibility />
                      </IconButton>
                      <IconButton onClick={() => handleAction('edit', row)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleAction('delete', row)}>
                        <Delete />
                      </IconButton>
                    </StyledTableCell>
                  )}
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell
                  component="th"
                  scope="row"
                  colSpan={5}
                  sx={{ textAlign: 'center' }}
                >
                  <Typography variant="h5">No results found.</Typography>
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>{' '}
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 1,
        }}
      >
        <Typography>
          <Typography component="span" variant="caption">
            {/* Total records: {sortedRows.length} /  */}
            Total records: {filteredAndSortedRows.length} / Current page: {page}{' '}
            / Total pages: {pageCount}
          </Typography>
        </Typography>
        <Pagination count={pageCount} page={page} onChange={handlePageChange} />
      </Box>
    </>
  )
}
