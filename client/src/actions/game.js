import * as api from '../api/api'
import {
  CREATE_WEBSOCKET,
  ACTIVATE_GAME,
  ADD_STUDENT,
} from '../constants/actionsTypes'
export const createWebSocket = data => async dispatch => {
  try {
    dispatch({ type: CREATE_WEBSOCKET, payload: data })
  } catch (error) {
    console.error(error)
  }
}

export const activateGame = (gameData, history) => async dispatch => {
  try {
    const { data } = await api.activateGame(gameData)
    dispatch({ type: ACTIVATE_GAME, payload: data })
    history(`/play/teacher/${data.questId}`, { replace: true })
    return data
  } catch (error) {
    console.error(error)
  }
}

export const addStudent = (studentId, questId) => async dispatch => {
  try {
    const { data } = await api.addStudent(questId, studentId)
    dispatch({ type: ADD_STUDENT, payload: data })
    return data
  } catch (error) {
    console.error(error)
  }
}
