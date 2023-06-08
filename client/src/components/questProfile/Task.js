import React from 'react'
import { Grid } from '@mui/material'
import { useStyles } from './styles'
import AnswerList from '../game/AnswerList'

function Task({ task }) {
  const classes = useStyles()

  return (
    <Grid
      className={classes.tasks}
      item
      sx={{ width: 'calc(50% - 20px)' }}
      container>
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '20px',
        }}>
        <h2>{task.question}</h2>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          marginBottom: '20px',
        }}>
        <img
          width={260}
          height={260}
          src={task.backgroundImage}
          alt="question background"
        />
      </Grid>
      <Grid
        item
        spacing={1}
        xs={6}
        container
        sx={{
          display: 'flex',
          justifyContent: 'spaceBetween',
          alignItems: 'center',
          alignContent: 'center',
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
  )
}

export default Task
