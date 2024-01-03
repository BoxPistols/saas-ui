/**
 * なぜこのコンポーネントを作ったか：
 * Typographyのcolorプロパティは、デフォルトではprimaryとsecondaryとerrorしか指定できない。
 * しかし、successやwarningやinfoなども指定したい場合があり、このコンポーネントを作成した。
 */

import { ReactNode } from 'react'
import { SxProps, Typography, useTheme } from '@mui/material'

type Props = {
  color: 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'info'
  children: ReactNode
  props?: SxProps
}

export const ColorTypography = ({ color, children, ...props }: Props) => {
  const theme = useTheme()
  return (
    <Typography
      color={color}
      sx={{ color: `${theme.palette[color]?.main}` }}
      {...props}
    >
      {children}
    </Typography>
  )
}
