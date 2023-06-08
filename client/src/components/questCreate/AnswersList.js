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
}) {
  const colors = [
    '#2d70ae',
    '#204f7b',
    '#2d9da6',
    '#1f6e74',
    '#efa929',
    '#c9870f',
    '#d5546d',
    '#bb2e49',
  ]
  return (
    <>
      <Grid
        item
        xs={
          answerAmount % 2 !== 0 && answerAmount - 1 === answerNumber ? 11 : 5
        }>
        <Box>
          <TextField
            sx={{
              backgroundColor: colors[answerNumber * 2],
              borderRadius: '10px',
              borderBottom: `7px solid ${colors[answerNumber * 2 + 1]}`,
            }}
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
