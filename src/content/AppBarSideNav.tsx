import { Box, ListItem, ListItemIcon, ListItemText } from '@mui/material'

import {
  DataObject,
  Home,
  MoveToInbox as InboxIcon,
  Mail as MailIcon,
  TableChart,
} from '@mui/icons-material'
import { Drawer } from './util'
import { grey } from '@mui/material/colors'
import Link from 'next/link'

type SideNavProps = {
  open?: boolean
}

const menuItems = [
  { icon: <Home />, text: 'ホーム', href: '/' },
  // TODO: Nest
  {
    icon: <TableChart />,
    text: 'データインポート',
    href: '/table/file-upload',
  },
  {
    icon: <TableChart />,
    text: 'カスタムフィルター',
    href: '/custom-filter',
  },
  {
    icon: <TableChart />,
    text: 'レコードイベント',
    href: '/table/record',
  },
  { icon: <DataObject />, text: 'Next.js Local APIテスト', href: '/get-api' },
]

export const AppBarSideNav = ({ open }: SideNavProps) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer variant="permanent" open={open}>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            component={Link}
            href={item.href}
            sx={{
              my: 0.5,
              '&:hover': {
                backgroundColor: grey[300],
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: 0,
                ml: 0.5,
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                ml: 1,
                opacity: open ? 1 : 0,
                '.MuiTypography-root': {
                  fontSize: 12,
                  fontWeight: 500,
                  lineHeight: 1.5,
                  letterSpacing: '0.00938em',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                },
              }}
            />
          </ListItem>
        ))}
      </Drawer>
    </Box>
  )
}
