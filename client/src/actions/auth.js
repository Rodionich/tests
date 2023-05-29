import * as api from '../api/api'
import { AUTH, LOGOUT } from '../constants/actionsTypes'

export const login = (formData, history) => async dispatch => {
  try {
    const { data } = await api.userLogin(formData)
    dispatch({ type: AUTH, data })
    history('/', { replace: true })
  } catch (error) {
    console.log(error)
  }
}
export const logout = history => async dispatch => {
  try {
    dispatch({ type: LOGOUT })
    history('/auth', { replace: true })
  } catch (error) {
    console.log(error)
  }
}

export const register = (formData, history) => async dispatch => {
  try {
    const { data } = await api.userRegister(formData)
    dispatch({ type: AUTH, data })
    history('/', { replace: true })
  } catch (error) {
    console.log(error)
  }
}
