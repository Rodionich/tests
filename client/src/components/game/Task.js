import React from 'react'
import { Box, Grid, Typography } from '@mui/material'
import { useStyles } from './styles'
import AnswerList from './AnswerList'

function Task({ task, timeToStart, teacher }) {
  const classes = useStyles()

  return (
    <Grid container>
      <Grid className={classes.quest} item xs={12} container>
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '40px',
          }}>
          <h2>{task.question}</h2>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '40px',
          }}>
          <img
            width={275}
            height={275}
            src={task.backgroundImage}
            alt="question background"
          />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '40px',
          }}>
          <Box>
            <Typography variant="h1">{timeToStart}</Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          container
          spacing={3}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '40px',
          }}>
          {task.answerList.map((answer, index) => (
            <AnswerList
              answer={answer}
              key={index}
              answerNumber={index}
              answerAmount={task.answerList.length}
            />
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Task
