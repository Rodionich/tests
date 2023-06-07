import {
  CREATE_QUEST,
  GET_QUEST,
  UPDATE_QUEST,
  GET_PERSONAL_QUESTS,
  REMOVE_QUEST,
  END_LOADING,
  START_LOADING,
  SEARCH_QUESTS,
  LIKE_QUEST,
  COMMENT_QUEST,
  GET_PUBLIC_QUESTS,
} from '../constants/actionsTypes'
const initialState = { isLoading: true, quests: [], quest: {} }
const questReducer = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      // console.log({ ...state, isLoading: true })
      return { ...state, isLoading: true }
    case END_LOADING:
      // console.log({ ...state, isLoading: false })
      return { ...state, isLoading: false }
    case CREATE_QUEST:
      // console.log({ ...state, quests: [...state.quests, action.payload] })
      return { ...state, quests: [...state.quests, action.payload] }
    case GET_QUEST:
      // console.log({ ...state, quest: action.payload.quest })
      return { ...state, quest: action.payload.quest }
    case REMOVE_QUEST:
      return {
        ...state,
        quests: state.quests.filter(quest => quest._id !== action.payload),
      }
    case GET_PERSONAL_QUESTS:
    case SEARCH_QUESTS:
      // console.log({ ...state, quests: action.payload })
      return { ...state, quests: action.payload }
    case GET_PUBLIC_QUESTS:
      return {
        ...state,
        quests: action.payload.data,
      }
    case LIKE_QUEST:
      return {
        ...state,
        quests: state.quests.map(quest =>
          quest._id === action.payload._id ? action.payload : quest,
        ),
      }
    case COMMENT_QUEST:
      return {
        ...state,
        quest: action.payload,
      }
    case UPDATE_QUEST:
      return {
        ...state,
        quests: state.quests.map(quest =>
          quest._id === action.payload._id ? action.payload : quest,
        ),
      }
    default:
      return state
  }
}

export default questReducer
