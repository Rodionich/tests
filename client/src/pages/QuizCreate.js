import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuiz, updateQuiz } from '../actions/quiz'
import { useNavigate } from 'react-router-dom'
import { useStyles } from '../components/quizCreate/styles'
import QuestionSettings from '../components/quizCreate/QuestionSettings'
import QuizSettings from '../components/quizCreate/QuizSettings'
import AddQuestion from '../components/quizCreate/AddQuestion'
import QuestionDisplay from '../components/quizCreate/QuestionDisplay'

function QuizCreator() {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  const history = useNavigate()
  const [isQuizOptionsVisible, setIsQuizOptionsVisible] = useState(false)
  const [isQuestionDataSave, setIsQuestionDataSave] = useState(false)
  const [questionType, setQuestionType] = useState('Quiz')
  const [correctAmount, setCorrectAmount] = useState(1)
  const [answerAmount, setAnswerAmount] = useState(4)
  const [isPickCorrectAnswers, setIsPickCorrectAnswers] = useState({
    answersIndexes: [],
    isPick: false,
  })
  const classes = useStyles()
  const questionStructure = {
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
    questionNumber: 1,
  }
  const [questionData, setQuestionData] = useState(questionStructure)

  const [quizData, setQuizData] = useState({
    title: '',
    creatorName: `${user?.result.firstName} ${user?.result.lastName}`,
    backgroundImage: '',
    description: '',
    pointsPerQuestion: 1,
    numberOfQuestions: 0,
    isPublic: true,
    questionList: [],
  })

  const userId = useSelector(
    state => state.quizReducer.quizes[state.quizReducer.quizes.length - 1]?._id,
  )

  // useEffect(() => {
  //   dispatch(getQuiz(userId))
  // }, [userId, dispatch])

  const quiz = useSelector(state => state.quizReducer.quiz)

  // useEffect(() => {
  //   if (quiz) {
  //     setQuizData(quiz)
  //   }
  // }, [quiz])

  const showQuizOptions = () => {
    setIsQuizOptionsVisible(!isQuizOptionsVisible)
  }

  const verifyAnswers = () => {
    return questionData.answerList.every(answerData => answerData.answer !== '')
  }

  const verifyQuestion = () => {
    return questionData.question !== ''
  }
  const verifyIsCorrectAnswerPick = () => {
    return isPickCorrectAnswers.isPick
  }

  const handleQuestionSubmit = () => {
    if (!verifyAnswers()) {
      alert('Please, fill all answers inputs')
    } else if (!verifyIsCorrectAnswerPick()) {
      alert(`Please, pick ${correctAmount} right answers`)
    } else if (!verifyQuestion()) {
      alert('Please, fill question input')
    } else {
      setIsQuestionDataSave(true)

      if (
        quizData.questionList.find(
          question => question.questionNumber === questionData.questionNumber,
        )
      ) {
        setQuizData(prevState => ({
          ...prevState,
          questionList: [
            ...prevState.questionList.slice(0, questionData.questionNumber - 1),
            questionData,
            ...prevState.questionList.slice(
              questionData.questionNumber,
              prevState.questionList.length,
            ),
          ],
        }))
      } else {
        setQuizData({
          ...quizData,
          questionList: [...quizData.questionList, questionData],
        })
      }
    }
  }

  const handleQuizSubmit = () => {
    dispatch(updateQuiz(quiz._id, quizData, history))
  }

  const handleQuestionChange = e => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value })
  }

  const handleQuizChange = e => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value })
  }

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs={5}>
              <QuestionSettings
                isQuizOptionsVisible={isQuizOptionsVisible}
                questionData={questionData}
                handleQuestionChange={handleQuestionChange}
                setQuestionType={setQuestionType}
                correctAmount={correctAmount}
                setCorrectAmount={setCorrectAmount}
                answerAmount={answerAmount}
                setAnswerAmount={setAnswerAmount}
                showQuizOptions={showQuizOptions}
                handleQuestionSubmit={handleQuestionSubmit}
                questionType={questionType}
                setQuestionData={setQuestionData}
                questionStructure={questionStructure}
                isPickCorrectAnswers={isPickCorrectAnswers}
                setIsPickCorrectAnswers={setIsPickCorrectAnswers}
              />
              <QuizSettings
                isQuizOptionsVisible={isQuizOptionsVisible}
                quizData={quizData}
                setQuizData={setQuizData}
                handleQuizChange={handleQuizChange}
                handleQuizSubmit={handleQuizSubmit}
                showQuizOptions={showQuizOptions}
              />
            </Grid>
            <AddQuestion
              questionData={questionData}
              setQuestionData={setQuestionData}
              handleQuestionChange={handleQuestionChange}
              answerAmount={answerAmount}
              correctAmount={correctAmount}
              isPickCorrectAnswers={isPickCorrectAnswers}
              setIsPickCorrectAnswers={setIsPickCorrectAnswers}
            />
          </Grid>
        </Grid>
        <QuestionDisplay
          quizData={quizData}
          setQuizData={setQuizData}
          setQuestionData={setQuestionData}
          isQuestionDataSave={isQuestionDataSave}
          setIsQuestionDataSave={setIsQuestionDataSave}
          setIsQuizOptionsVisible={setIsQuizOptionsVisible}
        />
      </Grid>
    </Box>
  )
}

export default QuizCreator
