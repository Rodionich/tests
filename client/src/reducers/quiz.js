import {
  CREATE_QUIZ,
  GET_QUIZ,
  UPDATE_QUIZ,
  GET_PERSONAL_QUIZES,
} from '../constants/actionsTypes'

const quizReducer = (state = { isLoading: true, quizes: [] }, action) => {
  switch (action.type) {
    case CREATE_QUIZ:
      console.log('CREATE_QUIZ')
      console.log({ ...state, quizes: [...state.quizes, action.payload] })
      return { ...state, quizes: [...state.quizes, action.payload] }
    case GET_QUIZ:
      console.log('GET_QUIZ')
      console.log({ ...state, quiz: action.payload.quiz })
      return { ...state, quiz: action.payload.quiz }
    case GET_PERSONAL_QUIZES:
      console.log('GET_PERSONAL_QUIZES')
      console.log({ ...state, quizes: action.payload })
      return { ...state, quizes: action.payload }
    case UPDATE_QUIZ:
      console.log('UPDATE_QUIZ')
      console.log({ ...state, quizes: action.payload })

      return {
        ...state,
        quizes: state.quizes.map(quiz =>
          quiz._id === action.payload._id ? action.payload : quiz,
        ),
      }
    default:
      return state
  }
}

export default quizReducer
