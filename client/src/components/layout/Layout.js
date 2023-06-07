import { React, useEffect, useState } from 'react'
import Topbar from '../topbar/Topbar'
import Sidebar from '../sidebar/Sidebar'
import { useLocation, Outlet } from 'react-router-dom'
import { Box, useMediaQuery } from '@mui/material'
import { useStyles } from './styles'

const Layout = () => {
  const [isOpen, setIsOpen] = useState(true)
  const location = useLocation()
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const classes = useStyles()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [])

  if (location.pathname === '/auth' || user === null) return <Outlet />
  return (
    <Box
      display={isNonMobile ? 'flex' : 'block'}
      justifyContent="space-between"
      width="100%"
      height="100%">
      <Sidebar
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <Box className={classes.mainSection}>
        <Topbar isOpen={isOpen} setIsOpen={setIsOpen} />
        <Outlet />
      </Box>
    </Box>
  )
}

export default Layout
