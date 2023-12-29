import React, { ReactNode } from 'react'
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material'

export interface ButtonProps extends Omit<MuiButtonProps, 'size'> {
  size?: 'small' | 'medium' | 'large'
  label?: string
  variant?: 'text' | 'outlined' | 'contained'
  endIcon?: ReactNode
  onClick?: () => void
}

export const Button = ({
  size = 'medium',
  label,
  variant,
  endIcon,
  ...props
}: ButtonProps) => {
  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      <MuiButton variant={variant} size={size} endIcon={endIcon} {...props}>
        {label && <span>{label}</span>}
      </MuiButton>
    </>
  )
}
