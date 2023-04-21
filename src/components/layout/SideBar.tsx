import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { useLocation, useNavigate } from 'react-router-dom'
import AutoStoriesIcon from '@mui/icons-material/AutoStories'
import GroupIcon from '@mui/icons-material/Group'
import FlipToFrontIcon from '@mui/icons-material/FlipToFront'
import LogoutIcon from '@mui/icons-material/Logout'

const drawerWidth = 240

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  })
}))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}))

interface SidebarProps {
  children: React.ReactNode
}

const navbar = [
  {
    title: 'Thống kê',
    link: '/',
    icon: <AutoStoriesIcon />
  },
  {
    title: 'Người dùng',
    link: '/user',
    icon: <GroupIcon />
  },
  {
    title: 'Đơn hàng',
    link: '/order',
    icon: <FlipToFrontIcon />
  }
]

export default function Sidebar(props: SidebarProps) {
  const theme = useTheme()
  const location = useLocation()
  const [open, setOpen] = React.useState(true)
  const navigation = useNavigate()

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 250px)' }}>
      <CssBaseline />
      <AppBar position='fixed' open={open}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Box>
            <Toolbar>
              <IconButton
                color='inherit'
                aria-label='open drawer'
                onClick={handleDrawerOpen}
                edge='start'
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant='h6' noWrap component='div'>
                Admin Dashboard
              </Typography>
            </Toolbar>
          </Box>
          <Box mr={5}>
            <IconButton color='secondary' aria-label='add an alarm'>
              <LogoutIcon
                sx={{
                  cursor: 'pointer'
                }}
                fontSize='large'
              />
            </IconButton>
          </Box>
        </Box>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant='persistent'
        anchor='left'
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navbar.map((item, index) => (
            <ListItem
              onClick={() => navigation(item.link)}
              key={item.link}
              disablePadding
              style={{
                background: location.pathname === item.link ? theme.palette.primary.main : 'white'
              }}
            >
              <ListItemButton>
                <ListItemIcon
                  sx={{
                    color: location.pathname !== item.link ? theme.palette.primary.main : 'white'
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  sx={{
                    color: location.pathname !== item.link ? theme.palette.primary.main : 'white'
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        {props.children}
        <DrawerHeader />
      </Main>
    </Box>
  )
}
