import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { addAnswer, getPlayerResult } from '../../actions/studentScore'
import { useDispatch, useSelector } from 'react-redux'
import { useStyles } from './styles'
import AnswerButton from './AnswerButton'

function StudentScreen() {
  const dispatch = useDispatch()
  const socket = useSelector(state => state.gameReducer.socket)
  const [timeToStart, setTimeToStart] = useState(3)
  const [isDisplayTimer, setIsDisplayTimer] = useState(false)
  const [isDisplayTask, setIsDisplayTask] = useState(false)
  const [questionData, setQuestionData] = useState([])
  const classes = useStyles()
  const [answer, setAnswer] = useState({
    questionNumber: 0,
    answers: [],
    time: 0,
  })
  const { playerResult } = useSelector(state => state.studentScore)
  const [result, setResult] = useState(playerResult?.answers[0])

  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false)
  const [isPreviewScreen, setIsPreviewScreen] = useState(false)
  const [isQuestionScreen, setIsQuestionScreen] = useState(false)
  const [isResultScreen, setIsResultScreen] = useState(false)
  const [timer, setTimer] = useState(0)
  const [answerTime, setAnswerTime] = useState(0)
  const [correctAnswerCount, setCorrectAnswerCount] = useState(1)

  useEffect(() => {
    setTimer(5)
  }, [])

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

  const sendAnswer = async () => {
    const updatedPlayerResult = await dispatch(
      addAnswer(answer, playerResult._id),
    )
    console.log(
      updatedPlayerResult.answers[updatedPlayerResult.answers.length - 1],
    )
    setResult(
      updatedPlayerResult.answers[updatedPlayerResult.answers.length - 1],
    )
    let data = {
      questionIndex: answer.questionIndex,
      playerId: updatedPlayerResult.playerId,
      playerPoints:
        updatedPlayerResult.answers[answer.questionIndex - 1].points,
    }
    let score = updatedPlayerResult.score
    socket.emit('send-answer-to-host', data, score)
    dispatch(getPlayerResult(playerResult._id))
  }

  const checkAnswer = index => {
    let answerIndex = answer.answers.findIndex(obj => obj === index)
    if (answer.answers.includes(index)) {
      //remove answer
      setAnswer(prevstate => ({
        ...prevstate,
        answers: [
          ...prevstate.answers.slice(0, answerIndex),
          ...prevstate.answers.slice(answerIndex + 1, prevstate.answers.length),
        ],
      }))
    } else {
      //add answer
      setAnswer(prevstate => ({
        ...prevstate,
        answers: [...prevstate.answers, index],
      }))
    }
    setAnswer(prevstate => ({
      ...prevstate,
      time: answerTime,
    }))
  }

  useEffect(() => {
    if (
      answer?.answers.length > 0 &&
      answer?.answers.length === correctAnswerCount
    ) {
      setIsQuestionScreen(false)
      setIsQuestionAnswered(true)
      sendAnswer()
    } else {
      setIsQuestionAnswered(false)
    }
  }, [answer?.answers.length, correctAnswerCount, answer, socket, sendAnswer])

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
                onClick={checkAnswer(index + 1)}
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
