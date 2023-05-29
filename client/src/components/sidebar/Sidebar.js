import React, { useState } from 'react'
import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material'
import { useStyles } from './styles'
import { menu } from './nav'
import { useNavigate } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import { ChevronLeftOutlined, LogoutOutlined } from '@mui/icons-material'
import { logout } from '../../actions/auth'
import { useDispatch } from 'react-redux'

function Sidebar(props) {
  const theme = useTheme()
  const navigate = useNavigate()
  const classes = useStyles()
  const { isNonMobile, drawerWidth, isOpen, setIsOpen } = props
  const dispatch = useDispatch()
  const history = useNavigate()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  const handleClick = e => {
    e.preventDefault()
    dispatch(logout(history))
    setUser(null)
  }

  const renderMenu = menu.map(element => {
    return (
      <ListItem key={element.id}>
        <ListItemButton
          onClick={() => navigate(`${element.link}`)}
          className={classes.navItem}>
          <ListItemIcon>{element.icon}</ListItemIcon>
          <ListItemText>
            <Typography variant="body1">{element.page}</Typography>
          </ListItemText>
        </ListItemButton>
      </ListItem>
    )
  })

  return (
    <Box component="nav">
      {isOpen && (
        <Drawer
          open={isOpen}
          onClose={() => setIsOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            '& .MuiDrawer-paper': {
              color: theme.palette.secondary.main,
              backgroundColor: theme.palette.primary.main,
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}>
          <Box className={classes.navBlock}>
            <Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <Box className={classes.brand}>
                  <Box
                    component="img"
                    alt="LOGO"
                    src={Logo}
                    className={classes.logoImage}
                  />
                  <Typography variant="h1" className={classes.brandTitle}>
                    Quiz
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsOpen(!isOpen)}>
                    <ChevronLeftOutlined />
                  </IconButton>
                )}
              </Box>
            </Box>
            <List className={classes.navList}>{renderMenu}</List>
          </Box>
          <Box width="100%">
            <List>
              <ListItem>
                <ListItemButton
                  className={classes.navItem}
                  onClick={handleClick}>
                  <ListItemIcon>
                    <LogoutOutlined />
                  </ListItemIcon>
                  <ListItemText>
                    <Typography>Logout</Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      )}
    </Box>
  )
}

export default Sidebar
