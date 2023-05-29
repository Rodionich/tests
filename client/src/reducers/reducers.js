import { combineReducers } from 'redux'
import authReducer from './auth'
import quizReducer from './quiz'
import gameReducer from './game'
export default combineReducers({
  authReducer,
  quizReducer,
  gameReducer,
})
