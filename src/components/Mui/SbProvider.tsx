import React, { ReactNode } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../../lib/theme'

interface SbProviderProps {
  children: ReactNode
  [key: string]: any
}

const SbProvider = ({ children }: SbProviderProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default SbProvider
