import React, {useContext, useState} from 'react'
import {Grid, Box, useTheme, IconButton, InputBase, Typography} from '@mui/material'
import { ColorSwitchMode, tokens } from '../../theme/theme'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import SearchIcon from '@mui/icons-material/Search'
import { useStyles } from './styles'

function Topbar() {
  const user = JSON.parse(localStorage.getItem('profile'))
  const colorMode = useContext(ColorSwitchMode)
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const classes = useStyles()
    const time = new Date().toLocaleTimeString();
  const [currentTime, setCurrentTime] = useState(time);

  const updateTime = () => {
      const time = new Date().toLocaleTimeString();
      setCurrentTime(time)
  }

  setInterval(updateTime, 1000)

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px="32px"
      py="24px">
      <Grid>It`s a pleasure to see you here, {user.result.lastName}</Grid>
      <Box display="flex">
        <Grid
          onClick={colorMode.toggleColorMode}
          sx={{ pr: '37px', borderRight: `1px solid ${colors.gray.DEFAULT}` }}>
          <IconButton sx={{ mr: '45px' }}>
            {theme.palette.mode === 'dark' ? (
              <DarkModeIcon />
            ) : (
              <LightModeIcon />
            )}
          </IconButton>
        </Grid>

        <Grid
          sx={{
            display: 'flex',
            backgroundColor: `${colors.primary[600]}`,
            borderRadius: '8px',
            ml: '28px',
              padding: '10px'
          }}>
            <Typography variant="h6" >
                {currentTime}
            </Typography>
        </Grid>
      </Box>
    </Box>
  )
}

export default Topbar
