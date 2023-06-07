import React, { useEffect, useState } from 'react'
import { Box, Grid, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addStudent } from '../actions/game'
import { saveStudentScore } from '../actions/studentScore'
import { StyledButton } from '../components/auth/styles'

function Play() {
  const user = JSON.parse(localStorage.getItem('profile'))
  const history = useNavigate()
  const dispatch = useDispatch()
  const socket = useSelector(state => state.gameReducer.socket)
  const [pin, setPin] = useState('')
  const [isJoined, setIsJoined] = useState(false)

  useEffect(() => {
    socket?.on('move-to-quest-page', gameId => {
      dispatch(
        saveStudentScore({
          studentId: user.result._id,
          questId: gameId,
          points: 0,
          answers: [],
        }),
      )
      history(`/play/student/${gameId}`, { replace: true })
    })
  }, [socket, dispatch, history, user.result._id])

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
    <Grid
      sx={{
        minHeight: 'calc(100vh - 300px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {!isJoined ? (
        <Grid
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Typography variant="h1" sx={{ marginBottom: '20px' }}>
            Join game
          </Typography>
          <Box>
            <TextField
              fullWidth
              value={pin}
              placeholder={'Pin'}
              onChange={handlePin}
            />
          </Box>
          <StyledButton onClick={joinQuest}>Join</StyledButton>
        </Grid>
      ) : (
        <Typography variant="h1" sx={{ marginBottom: '20px' }}>
          You have joined
        </Typography>
      )}
    </Grid>
  )
}

export default Play
