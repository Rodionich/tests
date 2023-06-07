import React from 'react'
import { Grid, IconButton } from '@mui/material'
import { useStyles } from './styles'
import AddIcon from '@mui/icons-material/Add'
import QuestionsList from './QuestionsList'

function QuestionDisplay({
  isQuestionDataSave,
  setQuestionData,
  questData,
  setQuestData,
  setIsQuestionDataSave,
  setIsQuestOptionsVisible,
}) {
  const classes = useStyles()

  const addNewQuestion = () => {
    resetQuestionData()
    setIsQuestionDataSave(false)
    setIsQuestOptionsVisible(false)
  }

  const resetQuestionData = () => {
    setQuestionData({
      questionType: 'Quiz',
      pointType: 'Standard',
      answerTime: 5,
      backgroundImage: '',
      question: '',
      answerList: [
        { answerNumber: '1', answer: '', isCorrect: false },
        { answerNumber: '2', answer: '', isCorrect: false },
        { answerNumber: '3', answer: '', isCorrect: false },
        { answerNumber: '4', answer: '', isCorrect: false },
      ],
      questionNumber: questData.questionList.length + 1,
    })
  }

  const pickQuestion = questionNumber => {
    const question = questData.questionList.find(
      question => question.questionNumber === questionNumber,
    )
    setQuestionData(question)
  }

  const deleteQuestion = questionNumber => {
    setQuestData(prevState => ({
      ...prevState,
      questionList: [
        ...prevState.questionList.slice(0, questionNumber - 1),
        ...prevState.questionList.slice(
          questionNumber,
          prevState.questionList.length,
        ),
      ],
    }))
    questData.questionList.forEach(question => {
      if (question.questionNumber > questionNumber) {
        question.questionNumber -= 1
      }
    })

    if (questData.questionList.length > 1 && questionNumber > 1) {
      pickQuestion(questionNumber - 1)
    } else if (questData.questionList.length > 1 && questionNumber === 1) {
      pickQuestion(1)
    } else {
      resetQuestionData()
    }
  }

  return (
    <Grid
      container
      gap={2}
      xs={4}
      className={classes.displayQuestion}
      sx={{
        alignContent: 'flex-start',
      }}>
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
        }}>
        <IconButton
          onClick={() => {
            isQuestionDataSave
              ? addNewQuestion()
              : console.log('Save changes, please')
          }}>
          <AddIcon />
        </IconButton>
      </Grid>

      {questData.questionList.length > 0 &&
        questData.questionList.map(question => (
          <QuestionsList
            key={question.questionNumber}
            onClick={() => pickQuestion(question.questionNumber)}
            deleteQuestion={() => deleteQuestion(question.questionNumber)}
            questionNumber={question.questionNumber}
            questionType={question.questionType}
            answerTime={question.answerTime}
            backgroundImage={question.backgroundImage}
          />
        ))}
    </Grid>
  )
}

export default QuestionDisplay
