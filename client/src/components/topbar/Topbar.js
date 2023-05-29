import React, { useContext } from 'react'
import { Grid, Box, useTheme, IconButton, InputBase } from '@mui/material'
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

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px="32px"
      py="24px">
      <Grid>Welcome {user.result.lastName}</Grid>
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
          <IconButton>
            <NotificationsNoneIcon />
          </IconButton>
        </Grid>
        <Grid
          sx={{
            display: 'flex',
            backgroundColor: `${colors.primary[600]}`,
            borderRadius: '8px',
            ml: '28px',
          }}>
          <IconButton className={classes.root}>
            <SearchIcon />
          </IconButton>
          <InputBase sx={{ px: '18px', py: '12px' }} placeholder="Search" />
        </Grid>
      </Box>
    </Box>
  )
}

export default Topbar
