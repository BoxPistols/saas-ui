// Content.tsx
import React from 'react'
import { styled } from '@mui/system'
import { Container, Typography, Box } from '@mui/material'
import CardGrid from './CardGrid'

type ContentProps = {
  numberOfCards: number
  numberOfColumns: number
  columnDefs: any[]
  rowData: any[]
}

const ContentContainer = styled(Container)`
  flex-grow: 1;
  padding: 2rem;
`

const Content = ({
  numberOfCards,
  numberOfColumns,
  columnDefs,
  rowData,
}: ContentProps) => {
  return (
    <ContentContainer>
      <Typography variant="h4" component="h2" gutterBottom>
        Content Area
      </Typography>
      <Box mb={4}>
        <CardGrid
          numberOfCards={numberOfCards}
          numberOfColumns={numberOfColumns}
        />
      </Box>
    </ContentContainer>
  )
}

export default Content
