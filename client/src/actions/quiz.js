import * as api from '../api/api'
import {
  CREATE_QUIZ,
  GET_QUIZ,
  UPDATE_QUIZ,
  GET_PERSONAL_QUIZES,
} from '../constants/actionsTypes'
export const createQuiz = (quiz, history) => async dispatch => {
  try {
    const { data } = await api.createQuiz(quiz)
    dispatch({ type: CREATE_QUIZ, payload: data })
    history(`/myQuizes/${data.creatorName}`, { replace: true })
  } catch (error) {
    console.log(error)
  }
}

export const getQuiz = id => async dispatch => {
  try {
    const { data } = await api.getQuiz(id)
    dispatch({ type: GET_QUIZ, payload: { quiz: data } })
  } catch (error) {
    console.log(error)
  }
}

export const updateQuiz = (id, quiz, history) => async dispatch => {
  try {
    const { data } = await api.updateQuiz(id, quiz)
    dispatch({ type: UPDATE_QUIZ, payload: data })
    history(`/myQuizes`, { replace: true })
  } catch (error) {
    console.log(error)
  }
}

export const getPersonalQuizes = () => async dispatch => {
  try {
    const { data } = await api.getPersonalQuizes()
    dispatch({ type: GET_PERSONAL_QUIZES, payload: data })
  } catch (error) {
    console.log(error)
  }
}
