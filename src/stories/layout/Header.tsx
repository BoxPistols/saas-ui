// Header.tsx
import React from 'react'
import { AppBar, Toolbar, Typography, useTheme } from '@mui/material'

export const Header = () => {
  const theme = useTheme()
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          color={theme.palette.primary.contrastText}
        >
          Admin Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
