import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/material'

// 使用するアイコンだけをインポートする
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import SearchIcon from '@mui/icons-material/Search'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

// 他のインポートされたアイコンも追加できます

const categories = [
  {
    name: 'Action',
    icons: [
      { name: 'Delete', component: DeleteIcon },
      { name: 'Edit', component: EditIcon },
      { name: 'Visibility', component: VisibilityIcon },
      { name: 'Search', component: SearchIcon },
    ],
  },
  {
    name: 'Navigation',
    icons: [
      { name: 'Menu', component: MenuIcon },
      { name: 'Close', component: CloseIcon },
      { name: 'ChevronLeft', component: ChevronLeftIcon },
      { name: 'ChevronRight', component: ChevronRightIcon },
    ],
  },
  // 他のカテゴリーも追加できます
]

const IconList: React.FC = () => {
  return (
    <Container sx={{ p: 4 }}>
      {categories.map(category => (
        <div key={category.name}>
          <Typography variant="h4" gutterBottom fontSize={12}>
            {category.name}
          </Typography>
          <Grid container spacing={2}>
            {category.icons.map(icon => {
              const { name, component: IconComponent } = icon
              return (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  lg={2}
                  key={name}
                  style={{ textAlign: 'center', fontSize: 12 }}
                >
                  <IconComponent />
                  <div>{name}</div>
                </Grid>
              )
            })}
          </Grid>
        </div>
      ))}
    </Container>
  )
}

export default IconList
