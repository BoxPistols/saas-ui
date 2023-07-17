import { styled } from '@mui/material/styles'
import { Typography, TypographyProps, TypographyTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import React from 'react'

export const Display1: OverridableComponent<TypographyTypeMap<{}, 'h1'>> =
  styled((props: TypographyProps) => {
    return <Typography {...props} />
  })(() => ({
    fontSize: '2.4rem',
    fontWeight: 700,
    lineHeight: 1.5,
    color: 'teal',
  }))

export const Display2: OverridableComponent<TypographyTypeMap<{}, 'h2'>> =
  styled((props: TypographyProps) => {
    return <Typography {...props} />
  })(() => ({
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: 1.5,
    color: 'teal',
  }))
