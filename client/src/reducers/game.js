import {
  ACTIVATE_GAME,
  ADD_STUDENT,
  CREATE_WEBSOCKET,
} from '../constants/actionsTypes'

const gameReducer = (state = { socket: null, games: [] }, action) => {
  switch (action.type) {
    case CREATE_WEBSOCKET:
      return { ...state, socket: action.payload }
    case ACTIVATE_GAME:
      console.log(action.payload)
      return { ...state, games: [...state.games, action.payload] }
    case ADD_STUDENT:
      return {
        ...state,
        games: state.games.map(quest =>
          quest._id === action.payload._id ? action.payload : quest,
        ),
      }
    default:
      return state
  }
}

export default gameReducer
