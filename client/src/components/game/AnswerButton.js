import React from 'react'
import { Box, Button, Grid } from '@mui/material'
import { useStyles } from './styles'

function AnswersButton({ answerNumber, answerAmount }) {
  const classes = useStyles()
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
          <Button
            className={classes.hoverStyle}
            variant="contained"
            size="large"
            fullWidth
            sx={{
              backgroundColor: colors[answerNumber * 2],
              borderRadius: '10px',
              borderBottom: `7px solid ${colors[answerNumber * 2 + 1]}`,
              height: '150px',
              ':hover': {
                backgroundColor: colors[answerNumber * 2],
                opacity: 0.5,
              },
            }}></Button>
        </Box>
      </Grid>
    </>
  )
}

export default AnswersButton
