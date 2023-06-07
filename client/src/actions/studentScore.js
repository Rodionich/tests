import * as api from '../api/api'
import { SAVE_STUDENT_SCORE } from '../constants/actionsTypes'

export const saveStudentScore = studentScore => async dispatch => {
  try {
    const { data } = await api.saveStudentScore(studentScore)
    dispatch({ type: SAVE_STUDENT_SCORE, payload: data })
  } catch (error) {
    console.log(error)
  }
}
