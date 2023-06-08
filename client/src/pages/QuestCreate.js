import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuest, updateQuest } from '../actions/quest'
import { useNavigate, useParams } from 'react-router-dom'
import { useStyles } from '../components/questCreate/styles'
import QuestionSettings from '../components/questCreate/QuestionSettings'
import QuestSettings from '../components/questCreate/QuestSettings'
import AddQuestion from '../components/questCreate/AddQuestion'
import QuestionDisplay from '../components/questCreate/QuestionDisplay'

function QuestCreator() {
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  const history = useNavigate()
  const [isQuestOptionsVisible, setIsQuestOptionsVisible] = useState(false)
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

  const [questData, setQuestData] = useState({
    title: '',
    creatorName: `${user?.result.firstName} ${user?.result.lastName}`,
    backgroundImage: '',
    description: '',
    keywords: '',
    pointsPerQuestion: 1,
    numberOfQuestions: 0,
    isPublic: true,
    questionList: [],
  })

  const { userId } = useParams()

  const quest = useSelector(state => state.questReducer.quest)

  useEffect(() => {
    dispatch(getQuest(userId))
  }, [userId]) // eslint-disable-line

  useEffect(() => {
    if (quest) {
      setQuestData(quest)
    }
  }, [quest])

  const showQuestOptions = () => {
    setIsQuestOptionsVisible(!isQuestOptionsVisible)
  }

  const verifyAnswers = () => {
    // return questionData.answerList.every(answerData => answerData.answer !== '' if )
    return true
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
        questData.questionList.find(
          question => question.questionNumber === questionData.questionNumber,
        )
      ) {
        setQuestData(prevState => ({
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
        setQuestData({
          ...questData,
          questionList: [...questData.questionList, questionData],
        })
      }
    }
  }

  const handleQuestSubmit = () => {
    dispatch(updateQuest(quest._id, questData, history))
  }

  const handleQuestionChange = e => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value })
  }

  const handleQuestChange = e => {
    setQuestData({ ...questData, [e.target.name]: e.target.value })
  }

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs={5}>
              <QuestionSettings
                isQuestOptionsVisible={isQuestOptionsVisible}
                questionData={questionData}
                handleQuestionChange={handleQuestionChange}
                setQuestionType={setQuestionType}
                correctAmount={correctAmount}
                setCorrectAmount={setCorrectAmount}
                answerAmount={answerAmount}
                setAnswerAmount={setAnswerAmount}
                showQuestOptions={showQuestOptions}
                handleQuestionSubmit={handleQuestionSubmit}
                questionType={questionType}
                setQuestionData={setQuestionData}
                questionStructure={questionStructure}
                isPickCorrectAnswers={isPickCorrectAnswers}
                setIsPickCorrectAnswers={setIsPickCorrectAnswers}
              />
              <QuestSettings
                isQuestOptionsVisible={isQuestOptionsVisible}
                questData={questData}
                setQuestData={setQuestData}
                handleQuestChange={handleQuestChange}
                handleQuestSubmit={handleQuestSubmit}
                showQuestOptions={showQuestOptions}
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
          questData={questData}
          setQuestData={setQuestData}
          setQuestionData={setQuestionData}
          isQuestionDataSave={isQuestionDataSave}
          setIsQuestionDataSave={setIsQuestionDataSave}
          setIsQuestOptionsVisible={setIsQuestOptionsVisible}
          setIsPickCorrectAnswers={setIsPickCorrectAnswers}
        />
      </Grid>
    </Box>
  )
}

export default QuestCreator
