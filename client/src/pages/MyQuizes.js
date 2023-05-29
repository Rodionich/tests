import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createQuiz, getPersonalQuizes } from '../actions/quiz'
import QuizList from '../components/myquizes/QuizList'
import { useStyles } from '../components/myquizes/styles'
import Carousel from 'react-material-ui-carousel'

function MyQuizes() {
  const user = JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch()
  const history = useNavigate()
  const classes = useStyles()
  const [quizData, setQuizData] = useState({
    title: '',
    creatorName: `${user?.result.userName}`,
    creatorId: `${user?.result._id}`,
    backgroundImage: '',
    description: '',
    pointsPerQuestion: 1,
    isPublic: 'false',
    questionList: [],
  })

  useEffect(() => {
    dispatch(getPersonalQuizes(user.result._id))
  }, [])

  const quizes = useSelector(state => state.quizReducer.quizes)
  const handleSubmit = () => {
    // dispatch(createQuiz(quizData, history))
    history(`/myQuizes/${quizData.creatorName}`, { replace: true })
  }

  const handleChange = e => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value })
  }

  function chunk(arr, size) {
    const result = []

    for (let i = 0; i < Math.ceil(arr.length / size); i++) {
      result.push(arr.slice(i * size, i * size + size))
    }

    return result
  }

  const quizzesGroup = chunk(quizes, 3)

  return (
    <Box className={classes.root}>
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <Typography sx={{ marginBottom: '10px' }} variant="h3">
            Create new quiz
          </Typography>
          <Box className={classes.quizSettings}>
            <Box sx={{ marginBottom: '10px' }}>
              <Typography variant="h5">Title</Typography>
              <TextField
                width="100%"
                name="title"
                onChange={handleChange}></TextField>
            </Box>
            <Box sx={{ marginBottom: '10px' }}>
              <Typography variant="h5">Description</Typography>
              <TextField name="description" onChange={handleChange}></TextField>
            </Box>
            <Box sx={{ marginBottom: '10px' }}>
              <FormControl>
                <Typography variant="h5">Access</Typography>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={quizData.isPublic}
                  name="isPublic"
                  onChange={handleChange}>
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Public"
                  />
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Private"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleSubmit}>Create</Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Typography sx={{ marginBottom: '10px' }} variant="h3">
            My quizzes
          </Typography>
          <Box className={classes.quizSettings}>
            <Carousel>
              {quizzesGroup.map((quizzesList, index) => (
                <QuizList key={index} quizzesList={quizzesList} />
              ))}
            </Carousel>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MyQuizes
