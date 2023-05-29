import React, { useEffect, useState } from 'react'
import WaitingRoom from './WaitingRoom'
import Task from './Task'
import { Box, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getQuiz } from '../../actions/quiz'

function TeacherScreen() {
  const socket = useSelector(state => state.gameReducer.socket)
  const game = useSelector(
    state => state.gameReducer.games[state.gameReducer.games.length - 1],
  )
  const { id } = useParams()
  const dispatch = useDispatch()
  const quiz = useSelector(state => state.quizReducer.quiz)
  const [isQuestActivated, setIsQuestActivated] = useState(false)
  const [timeToStart, setTimeToStart] = useState(3)
  const [isDisplayTimer, setIsDisplayTimer] = useState(false)
  const [isDisplayTask, setIsDisplayTask] = useState(false)

  const activateQuest = () => {
    setIsQuestActivated(!isQuestActivated)
    startTimer(3, 1)
    setIsDisplayTimer(true)
  }

  const startTimer = (timeToStart, index) => {
    setIsDisplayTimer(true)
    let timer = timeToStart
    let interval = setInterval(() => {
      setTimeToStart(timer)
      if (timer === 1) {
        clearInterval(interval)
        setIsDisplayTimer(false)
        setIsDisplayTask()
      }
      timer--
    }, 1000)
  }

  return (
    <>
      <Box>
        {!isQuestActivated && (
          <div>
            <WaitingRoom pin={game?.pin} socket={socket} />
            <button onClick={activateQuest}>Activate quest</button>
          </div>
        )}
      </Box>
      <Box>
        {isDisplayTimer && (
          <Typography sx={{ marginBottom: '10px' }} variant="h3">
            {timeToStart}
          </Typography>
        )}
      </Box>
      {isDisplayTask && (
        <div>
          <Task
            teacher
            key={questionData.questionIndex}
            question={questionData}
            timer={timer}
          />
        </div>
      )}
    </>
  )
}
export default TeacherScreen
