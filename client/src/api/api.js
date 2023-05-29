import axios from 'axios'

const AUTH_API = axios.create({ baseURL: 'http://localhost:5000/api/auth' })

export const userLogin = formData => AUTH_API.post('/login', formData)
export const userRegister = formData => AUTH_API.post('/register', formData)

const API = axios.create({ baseURL: 'http://localhost:5000/api' })
export const createQuiz = newQuiz => API.post('/quizes', newQuiz)
export const getQuiz = id => API.get(`/quizes/${id}`, id)

export const updateQuiz = (id, updatedQuiz) =>
  API.patch(`/quizes/${id}`, updatedQuiz)

export const getPersonalQuizes = () => API.get('/quizes')

export const activateGame = activatedGame => API.post('/game', activatedGame)

export const addStudent = (questId, studentId) =>
  API.patch(`/game/${questId}/students`, { studentId })
