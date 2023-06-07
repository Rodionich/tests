import React from 'react'
import { Grid, Typography } from '@mui/material'
import { useStyles } from './styles'
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone'
import BorderColorTwoToneIcon from '@mui/icons-material/BorderColorTwoTone'
import ExtensionTwoToneIcon from '@mui/icons-material/ExtensionTwoTone'
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone'

function Home() {
  const user = JSON.parse(localStorage.getItem('profile'))
  const classes = useStyles()

  return (
    <Grid container xs={12} className={classes.root}>
      <Grid
        item
        container
        xs={8}
        className={classes.profile}
        sx={{ alignItem: 'center', justifyContent: 'center' }}>
        <Grid item xs container direction="row" spacing={2}>
          <Grid item xs={4}>
            <img
              width={270}
              height={270}
              src={
                user.result.userType === 'Student'
                  ? require('../assets/student.png')
                  : require('../assets/teacher.png')
              }
              alt="image profile"
            />
          </Grid>
          <Grid item xs={8} className={classes.info}>
            <Typography variant="h2" sx={{ marginBottom: '15px' }}>
              First Name: {user.result.firstName}
            </Typography>
            <Typography variant="h2" sx={{ marginBottom: '15px' }}>
              Last Name: {user.result.lastName}
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ marginBottom: '15px' }}>
              UserName: {user.result.userName}
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ marginBottom: '15px' }}>
              Email: {user.result.email}
            </Typography>
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ marginBottom: '15px' }}>
              User Type: {user.result.userType}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={12}
        gap={3}
        sx={{
          alignItem: 'center',
          justifyContent: 'center',
          marginTop: '40px',
        }}>
        <Grid
          item
          xs={4}
          container
          direction="column"
          className={classes.profile}>
          <CalendarMonthTwoToneIcon />
          {user.result.userType === 'Student' || (
            <>
              <Typography variant="h4" sx={{ marginTop: '15px' }}>
                Days in the app
              </Typography>
              <Typography variant="h1" sx={{ marginTop: '10px' }}>
                1
              </Typography>
            </>
          )}
          {user.result.userType === 'Teacher' || (
            <>
              <Typography variant="h4" sx={{ marginTop: '15px' }}>
                Days in the app
              </Typography>
              <Typography variant="h1" sx={{ marginTop: '10px' }}>
                3
              </Typography>
            </>
          )}
        </Grid>
        <Grid
          item
          xs={4}
          container
          direction="column"
          className={classes.profile}>
          {user.result.userType === 'Student' || (
            <>
              <BorderColorTwoToneIcon />
              <Typography variant="h4" sx={{ marginTop: '15px' }}>
                Quests created
              </Typography>
              <Typography variant="h1" sx={{ marginTop: '10px' }}>
                2
              </Typography>
            </>
          )}
          {user.result.userType === 'Teacher' || (
            <>
              <ExtensionTwoToneIcon />
              <Typography variant="h4" sx={{ marginTop: '15px' }}>
                Quests completed
              </Typography>
              <Typography variant="h1" sx={{ marginTop: '10px' }}>
                3
              </Typography>
            </>
          )}
        </Grid>
        <Grid
          item
          xs={4}
          container
          direction="column"
          className={classes.profile}>
          {user.result.userType === 'Student' || (
            <>
              <ExtensionTwoToneIcon />
              <Typography variant="h4" sx={{ marginTop: '15px' }}>
                Game completed
              </Typography>
              <Typography variant="h1" sx={{ marginTop: '10px' }}>
                1
              </Typography>
            </>
          )}
          {user.result.userType === 'Teacher' || (
            <>
              <StarTwoToneIcon />
              <Typography variant="h4" sx={{ marginTop: '15px' }}>
                Сompletion rate
              </Typography>
              <Typography variant="h1" sx={{ marginTop: '10px' }}>
                100%
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Home
