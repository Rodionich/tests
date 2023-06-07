import React, { useEffect } from 'react'
import { useStyles } from './styles'
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone'
import CloudDownloadTwoToneIcon from '@mui/icons-material/CloudDownloadTwoTone'
import AnswersList from './AnswersList'

function AddQuestion({
  questionData,
  setQuestionData,
  handleQuestionChange,
  answerAmount,
  correctAmount,
  isPickCorrectAnswers,
  setIsPickCorrectAnswers,
}) {
  const classes = useStyles()

  const updateAnswer = (answer, index) => {
    const newAnswerList = questionData.answerList.map(data =>
      data.answerNumber === index ? { ...data, answer: answer } : data,
    )
    setQuestionData({
      ...questionData,
      answerList: newAnswerList,
    })
  }
  const updateCorrectAnswer = index => {
    if (isPickCorrectAnswers.answersIndexes.indexOf(index) !== -1) {
      setIsPickCorrectAnswers(prevState => ({
        answersIndexes: prevState.answersIndexes.filter(
          currIndex => currIndex !== index,
        ),
        isPick: false,
      }))
      const newAnswerList = questionData.answerList.map(data =>
        data.answerNumber === index
          ? { ...data, isCorrect: !data.isCorrect }
          : data,
      )
      setQuestionData({
        ...questionData,
        answerList: newAnswerList,
      })
    } else {
      if (!isPickCorrectAnswers.isPick) {
        setIsPickCorrectAnswers({
          ...isPickCorrectAnswers,
          answersIndexes: [...isPickCorrectAnswers.answersIndexes, index],
        })

        const newAnswerList = questionData.answerList.map(data =>
          data.answerNumber === index
            ? { ...data, isCorrect: !data.isCorrect }
            : data,
        )
        setQuestionData({
          ...questionData,
          answerList: newAnswerList,
        })
      }
    }
  }

  useEffect(() => {
    isPickCorrectAnswers.answersIndexes.length >= correctAmount
      ? setIsPickCorrectAnswers({ ...isPickCorrectAnswers, isPick: true })
      : setIsPickCorrectAnswers({ ...isPickCorrectAnswers, isPick: false })
  }, [correctAmount, isPickCorrectAnswers, setIsPickCorrectAnswers])

  return (
    <Grid item xs={7} className={classes.addQuestion}>
      <Grid item container spacing={2}>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            {questionData.backgroundImage === '' || (
              <IconButton
                onClick={() => {
                  setQuestionData({
                    ...questionData,
                    backgroundImage: '',
                  })
                }}>
                <DeleteOutlineTwoToneIcon fontSize="medium" />
              </IconButton>
            )}
          </Box>
          <FormControl
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => document.querySelector('#textField').click()}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <TextField
                sx={{ visibility: 'hidden' }}
                size="small"
                type="file"
                multiple={false}
                name="backgroundImage"
                id="textField"
                onChange={e => {
                  const reader = new FileReader()
                  reader.readAsDataURL(e.target.files[0])
                  reader.onload = () => {
                    setQuestionData({
                      ...questionData,
                      [e.target.name]: reader.result,
                    })
                  }
                }}
              />
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '40px',
              }}>
              {questionData.backgroundImage !== '' ? (
                <img
                  width={275}
                  height={275}
                  src={questionData.backgroundImage}
                  alt="question background"
                />
              ) : (
                <>
                  <Box>
                    <Typography variant="h4" sx={{ marginBottom: '15px' }}>
                      Browse image to upload
                    </Typography>
                  </Box>
                  <Box>
                    <CloudDownloadTwoToneIcon fontSize="large" />
                  </Box>
                </>
              )}
            </Box>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Typography variant="h4">Question</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TextField
              name="question"
              placeholder="Write your question"
              value={questionData.question}
              onChange={handleQuestionChange}
              fullWidth
            />
          </Box>
        </Grid>
        {questionData.answerList.map(
          (answer, index) =>
            index < answerAmount && (
              <AnswersList
                key={index}
                answer={answer}
                answerNumber={index}
                answerAmount={answerAmount}
                updateAnswer={updateAnswer}
                updateCorrectAnswer={updateCorrectAnswer}
                isPickCorrectAnswers={isPickCorrectAnswers}
              />
            ),
        )}
      </Grid>
    </Grid>
  )
}

export default AddQuestion
