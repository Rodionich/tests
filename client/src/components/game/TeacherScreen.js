import React, { useEffect, useState } from 'react'
import WaitingRoom from './WaitingRoom'
import Task from './Task'
import { Box, Grid, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getQuest } from '../../actions/quest'
import { useStyles } from './styles'
import { StyledButton } from '../auth/styles'
import { useParams } from 'react-router-dom'

function TeacherScreen() {
  const socket = useSelector(state => state.gameReducer.socket)
  const game = useSelector(
    state => state.gameReducer.games[state.gameReducer.games.length - 1],
  )
  const { questId } = useParams()
  const dispatch = useDispatch()
  const quest = useSelector(state => state.questReducer.quest)
  const [isQuestActivated, setIsQuestActivated] = useState(false)
  const [timeToStart, setTimeToStart] = useState(3)
  const [isDisplayTimer, setIsDisplayTimer] = useState(false)
  const [isDisplayTask, setIsDisplayTask] = useState(false)
  const [taskNumber, setTaskNumber] = useState(0)
  const classes = useStyles()

  const [taskData, setTaskData] = useState({
    questionType: 'Quiz',
    pointType: 'Standard',
    answerTime: 5,
    backgroundImage: '',
    question: '',
    answerList: [
      { answerNumber: '1', answer: '', isCorrect: false },
      { answerNumber: '2', answer: '', isCorrect: false },
      { answerNumber: '3', answer: '', isCorrect: false },
      { answerNumber: '4', answer: '', isCorrect: false },
    ],
    questionNumber: 1,
  })

  useEffect(() => {
    dispatch(getQuest(questId))
  }, []) // eslint-disable-line

  const activateQuest = () => {
    socket.emit('start-game', quest)
    socket.emit('question-preview', () => {
      startTimer(3, taskNumber)
    })
    setIsQuestActivated(!isQuestActivated)
    setIsDisplayTimer(true)
  }

  const startTimer = (timeToStart, number) => {
    setIsDisplayTimer(true)
    let timer = timeToStart
    let interval = setInterval(() => {
      setTimeToStart(timer)
      if (timer === 0) {
        clearInterval(interval)
        displayTask(number)
        setIsDisplayTimer(false)
        setIsDisplayTask(true)
      }
      timer--
    }, 1000)
  }

  const startTaskTimer = (timeToStart, number) => {
    let timer = timeToStart
    let interval = setInterval(() => {
      setTimeToStart(timer)
      if (timer === 0) {
        clearInterval(interval)
        displayTask(number)
      }
      timer--
    }, 1000)
  }

  const displayTask = number => {
    if (number === quest.questionList.length) {
      console.log('end')
    } else {
      setTaskData(quest.questionList[number])
      setTaskNumber(taskNumber + 1)
      let time = quest.questionList[number].answerTime
      let question = {
        answerList: quest.questionList[number].answerList,
        questionNumber: quest.questionList[number].questionNumber,
        correctAnswersCount: quest.questionList[number].answerList.filter(
          answer => answer.isCorrect === true,
        ).length,
      }
      socket.emit('start-question-timer', time, question, () => {
        startTaskTimer(time, number + 1)
      })
    }
  }

  return (
    <>
      <Box className={classes.root}>
        {!isQuestActivated && (
          <Grid container spacing={5}>
            <WaitingRoom pin={game?.pin} socket={socket} />
            <Grid
              item
              xs={12}
              container
              sx={{
                marginBottom: '15px',
                display: 'flex',
                justifyContent: 'center',
              }}>
              <StyledButton onClick={activateQuest}>
                Activate quest
              </StyledButton>
            </Grid>
          </Grid>
        )}
      </Box>
      <Grid
        container
        direction="column"
        sx={{ justifyContent: 'center', alignItems: 'center' }}>
        {isDisplayTimer && (
          <Box
            sx={{
              minHeight: 'calc(100vh - 300px)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Typography variant="h1">{timeToStart}</Typography>
          </Box>
        )}
      </Grid>
      <Box className={classes.root}>
        {isDisplayTask && (
          <Task
            key={taskData.questionNumber}
            task={taskData}
            timeToStart={timeToStart}
            teacher
          />
        )}
      </Box>
    </>
  )
}
export default TeacherScreen
