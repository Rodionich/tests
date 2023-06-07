import { combineReducers } from 'redux'
import authReducer from './auth'
import questReducer from './quest'
import gameReducer from './game'
import studentScoreReducer from './studentScore'
export default combineReducers({
  authReducer,
  questReducer,
  gameReducer,
  studentScoreReducer,
})
