// ColumnSelector.tsx
import React, { Dispatch, SetStateAction, useState } from 'react'
import {
  Box,
  Stack,
  Button,
  Menu,
  MenuItem,
  Switch,
  FormControlLabel,
  IconButton,
  Typography,
} from '@mui/material'
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined'
import { TableColumn } from './Types'

type ColumnSelectorProps<T> = {
  columns: TableColumn<T>[]
  // hiddenColumns: (keyof T)[]
  hiddenColumns: string[]
  // setHiddenColumns: React.Dispatch<React.SetStateAction<(keyof T)[]>>
  setHiddenColumns: Dispatch<SetStateAction<string[]>>
}

export const ColumnSelector = ({
  columns,
  hiddenColumns,
  setHiddenColumns,
}: ColumnSelectorProps<any>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  // トグルスイッチのハンドラー
  const toggleColumn = (column: string) => {
    setHiddenColumns(prevHiddenColumns =>
      prevHiddenColumns.includes(column)
        ? prevHiddenColumns.filter(c => c !== column)
        : [...prevHiddenColumns, column],
    )
  }

  const handleShowAll = () => {
    setHiddenColumns([])
  }

  const handleHideAll = () => {
    // setHiddenColumns(columns.map((column) => column.field))
    setHiddenColumns(columns.slice(1).map(column => column.field.toString()))
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <IconButton
          color="primary"
          aria-controls="column-selector"
          aria-haspopup="true"
          onClick={handleMenuClick}
          sx={{
            cursor: 'pointer',
          }}
        >
          <ToggleOnOutlinedIcon
            sx={{
              '&.MuiSvgIcon-root': {
                fontSize: '2.6rem',
              },
            }}
          />
        </IconButton>
        {/* Count Column */}
        <Typography variant="body1">
          {columns.length - hiddenColumns.length} / {columns.length}
        </Typography>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {columns.map(column => (
          <MenuItem key={column.field as string}>
            <FormControlLabel
              control={
                <Switch
                  checked={!hiddenColumns.includes(column.field.toString())}
                  onChange={() => toggleColumn(column.field.toString())}
                />
              }
              label={column.headerName}
            />
          </MenuItem>
        ))}
        <Stack
          spacing={1}
          direction="row"
          padding={2}
          position={'sticky'}
          bottom={0}
          left={0}
          sx={{
            backgroundColor: `common.white`,
          }}
        >
          <Button onClick={handleShowAll} size="small" variant="contained">
            全て表示
          </Button>
          <Button onClick={handleHideAll} size="small" variant="outlined">
            全て非表示
          </Button>
          <Button
            onClick={handleMenuClose}
            size="small"
            variant="text"
            color="secondary"
          >
            閉じる
          </Button>
        </Stack>
      </Menu>
    </Box>
  )
}
