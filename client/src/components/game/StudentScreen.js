import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useStyles } from './styles'
import AnswerButton from './AnswerButton'

function StudentScreen() {
  const socket = useSelector(state => state.gameReducer.socket)
  const [timeToStart, setTimeToStart] = useState(3)
  const [isDisplayTimer, setIsDisplayTimer] = useState(false)
  const [isDisplayTask, setIsDisplayTask] = useState(false)
  const [answerTime, setAnswerTime] = useState(0)
  const [questionData, setQuestionData] = useState([])
  const [correctAnswerCount, setCorrectAnswerCount] = useState(1)
  const classes = useStyles()
  const [answer, setAnswer] = useState({
    questionNumber: 0,
    answers: [],
    time: 0,
  })

  useEffect(() => {
    socket.on('host-start-preview', () => {
      setIsDisplayTimer(true)
      startTimer(3)
    })
    socket.on('host-start-question-timer', (time, question) => {
      setQuestionData(question.answerList)
      startTaskTimer(time)
      setAnswer(prevstate => ({
        ...prevstate,
        questionNumber: question.questionNumber,
        answers: [],
        time: 0,
      }))
      setCorrectAnswerCount(question.correctAnswersCount)
    })
  }, [socket])

  const startTimer = timeToStart => {
    let timer = timeToStart
    let interval = setInterval(() => {
      setTimeToStart(timer)
      if (timer === 0) {
        clearInterval(interval)
        setIsDisplayTimer(false)
        setIsDisplayTask(true)
      }
      timer--
    }, 1000)
  }

  const startTaskTimer = timeToStart => {
    let timer = timeToStart
    let answerSeconds = 0
    let interval = setInterval(() => {
      setTimeToStart(timer)
      setAnswerTime(answerSeconds)
      if (timer === 0) {
        clearInterval(interval)
      }
      timer--
      answerSeconds++
    }, 1000)
  }

  return (
    <>
      {isDisplayTimer && (
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
      )}
      {isDisplayTask && (
        <Grid
          sx={{
            minHeight: 'calc(100vh - 300px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Grid
            item
            container
            xs={6}
            sx={{ justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h1">{timeToStart}</Typography>
          </Grid>
          <Grid item container spacing={2} className={classes.root}>
            {questionData?.map((answer, index) => (
              <AnswerButton
                key={index}
                answerAmount={questionData.length}
                answerNumber={index}
              />
            ))}
          </Grid>
        </Grid>
      )}
    </>
  )
}
export default StudentScreen
