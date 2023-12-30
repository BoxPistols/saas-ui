// ColumnSelector.tsx
import React, { useState } from 'react'
import {
  Box,
  Stack,
  Button,
  Menu,
  MenuItem,
  Switch,
  FormControlLabel,
} from '@mui/material'
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined'
import { TableColumn } from './Types'

type ColumnSelectorProps<T> = {
  columns: TableColumn<T>[]
  hiddenColumns: (keyof T)[]
  setHiddenColumns: React.Dispatch<React.SetStateAction<(keyof T)[]>>
}

function ColumnSelector<T>({
  columns,
  hiddenColumns,
  setHiddenColumns,
}: ColumnSelectorProps<T>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const toggleColumnVisibility = (field: keyof T) => {
    setHiddenColumns((current) =>
      current.includes(field)
        ? current.filter((f) => f !== field)
        : [...current, field]
    )
  }

  const handleShowAll = () => {
    setHiddenColumns([])
  }

  const handleHideAll = () => {
    setHiddenColumns(columns.map((column) => column.field))
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <ToggleOnOutlinedIcon
        color="primary"
        aria-controls="column-selector"
        aria-haspopup="true"
        onClick={handleMenuClick}
        sx={{
          cursor: 'pointer',
          width: 40,
          height: '100%',
        }}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {columns.map((column) => (
          <MenuItem key={column.field as string}>
            <FormControlLabel
              control={
                <Switch
                  checked={!hiddenColumns.includes(column.field)}
                  onChange={() => toggleColumnVisibility(column.field)}
                />
              }
              label={column.headerName}
            />
          </MenuItem>
        ))}
        <Stack spacing={1} direction="row" padding={2}>
          <Button onClick={handleShowAll}>全て表示</Button>
          <Button onClick={handleHideAll}>全て非表示</Button>
          <Button onClick={handleMenuClose}>閉じる</Button>
        </Stack>
      </Menu>
    </Box>
  )
}

export default ColumnSelector
