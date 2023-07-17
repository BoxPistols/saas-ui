import { Grid, Card, CardContent, Typography } from "@mui/material"

interface ResponsiveGridProps {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  spacing: number
  numberOfCards: number
}

type Props = ResponsiveGridProps


export const ResponsiveGrid = ({ xs, sm, md, lg, xl, spacing, numberOfCards }: Props) => {
  return (
    <Grid container spacing={spacing} >
      {Array.from({ length: numberOfCards }, (_, i) => (
        <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl} key={i} >
          <Card  sx={{ background:"#efefef"}} elevation={3}>
            <CardContent>
              <Typography variant="h6">Card {i + 1}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}



