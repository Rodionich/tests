import React, { useEffect, useState } from 'react'
import { Grid, Typography } from '@mui/material'

function WaitingRoom({ pin, socket }) {
  const [studentList, setStudentList] = useState([])

  useEffect(() => {
    socket.on('student-added', student => {
      setStudentList([...studentList, student])
    })
  }, [studentList, socket])

  return (
    <Grid>
      <Typography sx={{ marginBottom: '10px' }} variant="h3">
        Waiting Room
      </Typography>
      <Typography sx={{ marginBottom: '10px' }} variant="h3">
        Show PIN to your students {pin}
      </Typography>
      <Typography sx={{ marginBottom: '10px' }} variant="h3">
        Students
      </Typography>
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
    </Grid>
  )
}

export default WaitingRoom
