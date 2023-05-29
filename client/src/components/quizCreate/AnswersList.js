import React from 'react'
import { Box, Grid, IconButton, TextField } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'

function AnswersList({
  answer,
  answerNumber,
  answerAmount,
  updateAnswer,
  updateCorrectAnswer,
  isPickCorrectAnswers,
}) {
  console.log(isPickCorrectAnswers.isPick)
  return (
    <>
      <Grid
        item
        xs={
          answerAmount % 2 !== 0 && answerAmount - 1 === answerNumber ? 11 : 5
        }>
        <Box>
          <TextField
            fullWidth
            value={answer.answer}
            name="answer"
            placeholder={`Answer ${answerNumber + 1}`}
            onChange={e => {
              updateAnswer(e.target.value, (answerNumber + 1).toString())
            }}
          />
        </Box>
      </Grid>
      <Grid
        item
        xs={1}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <IconButton
          onClick={() => {
            updateCorrectAnswer((answerNumber + 1).toString())
          }}>
          {answer.isCorrect ? (
            <CheckCircleOutlineIcon />
          ) : (
            <RemoveCircleOutlineIcon />
          )}
        </IconButton>
      </Grid>
    </>
  )
}

export default AnswersList
