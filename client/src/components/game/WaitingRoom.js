import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { useStyles } from './styles'
function WaitingRoom({ pin, socket }) {
  const [studentList, setStudentList] = useState([])
  const classes = useStyles()

  useEffect(() => {
    socket.on('student-added', student => {
      setStudentList([...studentList, student])
    })
  }, [studentList, socket])

  return (
    <Grid item xs={12} container>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography sx={{ marginBottom: '20px' }} variant="h3">
          Waiting Room
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        container
        sx={{
          marginBottom: '15px',
          display: 'flex',
          justifyContent: 'center',
        }}>
        <Box className={classes.waitingRoom}>
          <Typography
            sx={{
              marginBottom: '15px',
              display: 'flex',
              justifyContent: 'center',
            }}
            variant="h3">
            Show PIN to your students:
          </Typography>
          <Typography
            sx={{
              marginBottom: '10px',
              display: 'flex',
              justifyContent: 'center',
            }}
            variant="h3">
            {pin}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography
          sx={{ marginBottom: '20px', marginTop: '20px' }}
          variant="h3">
          Connected Students
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        container
        sx={{
          marginBottom: '15px',
          display: 'flex',
          justifyContent: 'center',
        }}>
        <Box className={classes.waitingRoom}>
          <Grid>
            {studentList.length > 0 ? (
              <Grid>
                {studentList.map(student => (
                  <Typography sx={{ marginBottom: '10px' }} variant="h3">
                    {student.studentName}
                  </Typography>
                ))}
              </Grid>
            ) : (
              <Typography sx={{ marginBottom: '10px' }} variant="h3">
                No players yet
              </Typography>
            )}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}

export default WaitingRoom
