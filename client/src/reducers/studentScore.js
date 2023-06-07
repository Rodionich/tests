import { SAVE_STUDENT_SCORE } from '../constants/actionsTypes'

const studentScoreReducer = (
  state = { playerResults: [], playerScore: null },
  action,
) => {
  switch (action.type) {
    case SAVE_STUDENT_SCORE:
      return {
        ...state,
        playerResults: [...state.playerResults, action.payload],
        playerScore: action.payload,
      }
    default:
      return state
  }
}

export default studentScoreReducer
