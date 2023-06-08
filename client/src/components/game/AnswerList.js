import React from 'react'
import { Box, Grid, TextField } from '@mui/material'

function AnswersList({ answer, answerNumber, answerAmount }) {
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
          answerAmount % 2 !== 0 && answerAmount - 1 === answerNumber ? 12 : 6
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
            placeholder={answer.answer}
          />
        </Box>
      </Grid>
    </>
  )
}

export default AnswersList
