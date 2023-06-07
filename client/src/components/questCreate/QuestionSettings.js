import React from 'react'
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone'
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone'
import { useStyles } from './styles'

function QuestionSettings({
  isQuestOptionsVisible,
  questionData,
  handleQuestionChange,
  correctAmount,
  showQuestOptions,
  handleQuestionSubmit,
  questionType,
  setQuestionType,
  answerAmount,
  setAnswerAmount,
  setCorrectAmount,
  setQuestionData,
  questionStructure,
  isPickCorrectAnswers,
  setIsPickCorrectAnswers,
}) {
  const classes = useStyles()

  const changeQuestionType = e => {
    setQuestionType(e.target.value)
    if (e.target.value === 'Quiz') {
      setAnswerAmount(4)
      setCorrectAmount(1)
    } else if (e.target.value === 'OpenQuestion') {
      setAnswerAmount(1)
      setCorrectAmount(1)
    } else if (e.target.value === 'TrueOrFalse') {
      setAnswerAmount(2)
      setCorrectAmount(1)
    }
  }

  const setMaxCorrectAmount = e => {
    setCorrectAmount(e.target.value)
    questionData.answerList.forEach(answer => (answer.isCorrect = false))
    setIsPickCorrectAnswers({
      ...isPickCorrectAnswers,
      answersIndexes: [],
    })
  }

  const setMaxAnswerAmount = currentAmount => {
    setAnswerAmount(currentAmount)
    setCorrectAmount(1)

    // console.log('e')
    // console.log(currentAmount)
    // console.log('amountIn')
    // console.log(answerAmount)

    if (currentAmount < questionData.answerList.length) {
      setQuestionData(prevState => ({
        ...prevState,
        answerList: [
          ...prevState.answerList.filter((_, index) => index < currentAmount),
        ],
      }))
    } else if (currentAmount > questionData.answerList.length) {
      setQuestionData(prevState => ({
        ...prevState,
        answerList: [
          ...prevState.answerList,
          questionStructure.answerList[currentAmount - 1],
        ],
      }))
    }
  }

  return (
    <Grid
      className={classes.settings}
      container
      spacing={2}
      style={{
        display: isQuestOptionsVisible ? 'none' : 'flex',
      }}>
      <Grid item xs={5}>
        <Box>
          <Typography variant="h4" sx={{ marginBottom: '15px' }}>
            Quest Type
          </Typography>
          <FormControl fullWidth>
            <Select
              value={questionData.questionType}
              name="questionType"
              onChange={e => {
                handleQuestionChange(e)
                changeQuestionType(e)
              }}
              autoWidth>
              <MenuItem value="Quiz">Quiz</MenuItem>
              <MenuItem value="OpenQuestion">Open Question</MenuItem>
              <MenuItem value="TrueOrFalse">True/False</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Box>
          <Typography variant="h4" sx={{ marginBottom: '15px' }}>
            Time limit
          </Typography>
          <FormControl fullWidth>
            <Select
              value={questionData.answerTime}
              name="answerTime"
              onChange={handleQuestionChange}
              autoWidth>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={5}>
        <Box>
          <Typography variant="h4" sx={{ marginBottom: '15px' }}>
            Points
          </Typography>
          <FormControl fullWidth>
            <Select
              value={questionData.pointType}
              name="pointType"
              onChange={handleQuestionChange}
              autoWidth>
              <MenuItem value="Standard">Standard</MenuItem>
              <MenuItem value="BasedOnTime">BasedOnTime</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>

      {questionType === 'Quiz' && (
        <Grid item xs={4}>
          <Box>
            <Typography variant="h4" sx={{ marginBottom: '15px' }}>
              Answers amount
            </Typography>
            <TextField
              type="number"
              InputProps={{
                inputProps: {
                  max: 4,
                  min: 2,
                },
              }}
              value={answerAmount}
              onChange={e => setMaxAnswerAmount(e.target.value)}></TextField>
          </Box>
        </Grid>
      )}

      {questionType === 'Quiz' && (
        <Grid item xs={4}>
          <Box>
            <Typography variant="h4" sx={{ marginBottom: '15px' }}>
              Correct answers
            </Typography>
            <TextField
              type="number"
              InputProps={{
                inputProps: {
                  max: answerAmount - 1,
                  min: 1,
                },
              }}
              value={correctAmount}
              onChange={setMaxCorrectAmount}></TextField>
          </Box>
        </Grid>
      )}

      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}>
        <Box>
          <IconButton onClick={showQuestOptions}>
            <SettingsTwoToneIcon />
          </IconButton>
        </Box>
        <Box>
          <IconButton onClick={handleQuestionSubmit}>
            <CheckBoxTwoToneIcon />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  )
}

export default QuestionSettings
