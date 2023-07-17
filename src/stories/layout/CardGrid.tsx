// CardGrid.tsx
import React from 'react'
import { Grid, Card, CardContent, Typography } from '@mui/material'

type CardGridProps = {
  numberOfCards: number
  numberOfColumns: number
}

const CardGrid = ({ numberOfCards, numberOfColumns }: CardGridProps) => {
  return (
    <Grid container spacing={2}>
      {[...Array(numberOfCards)].map((_, index) => (
        <Grid key={index} item xs={12 / numberOfColumns}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6">Card {index + 1}</Typography>
              <Typography>Some card content</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default CardGrid
