import React from 'react'
import { Grid, IconButton } from '@mui/material'
import { useStyles } from './styles'
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone'

function QuestionsList({
  questionNumber,
  questionType,
  answerTime,
  backgroundImage,
  onClick,
  deleteQuestion,
}) {
  const classes = useStyles()
  return (
    <Grid
      className={classes.displayQuestionList}
      onClick={onClick}
      item
      xs={12}>
      <Grid item xs={4}>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs={12}>
            Question {questionNumber}
          </Grid>
          <Grid item xs={12}>
            Type: {questionType}
          </Grid>
          <Grid item xs={12}>
            Time: {answerTime}
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <img
          width={180}
          height={150}
          src={backgroundImage}
          alt="question background"
        />
      </Grid>
      <Grid
        item
        xs={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <IconButton onClick={deleteQuestion}>
          <DeleteOutlineTwoToneIcon />
        </IconButton>
      </Grid>
    </Grid>
  )
}

export default QuestionsList
