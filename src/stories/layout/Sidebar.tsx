// Sidebar.tsx
import React from 'react'
import { styled } from '@mui/system'
import { List, ListItem, ListItemText } from '@mui/material'

const SidebarContainer = styled('div')`
  width: 240px;
  background-color: #f5f5f5;
  padding: 1rem;
`

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <List>
        <ListItem button>
          <ListItemText primary="Menu Item 1" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Menu Item 2" />
        </ListItem>
      </List>
    </SidebarContainer>
  )
}

export default Sidebar
