import React, { useState } from 'react'
import { Box, Grid, TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addStudent } from '../actions/game'

function Play() {
  const user = JSON.parse(localStorage.getItem('profile'))
  const history = useNavigate()
  const dispatch = useDispatch()
  const socket = useSelector(state => state.gameReducer.socket)
  const [pin, setPin] = useState('')
  const [isJoined, setIsJoined] = useState(false)
  const handlePin = e => {
    setPin(e.target.value)
  }

  const joinQuest = () => {
    socket.emit(
      'student-join',
      user.result,
      socket.id,
      pin,
      (message, studentId, questId) => {
        if (message === 'correct') {
          dispatch(addStudent(studentId, questId))
          setIsJoined(true)
        } else {
          alert(`Student ${studentId} is not allowed to join ${questId}`)
        }
      },
    )
  }

  return (
    <Grid>
      {!isJoined ? (
        <Grid>
          <h2>Join game</h2>
          <Box>
            <TextField
              fullWidth
              value={pin}
              placeholder={'Pin'}
              onChange={handlePin}
            />
          </Box>
          <button onClick={joinQuest}>Join</button>
        </Grid>
      ) : (
        <Box>You have joined</Box>
      )}
    </Grid>
  )
}

export default Play
