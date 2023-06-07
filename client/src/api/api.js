import axios from 'axios'

const AUTH_API = axios.create({ baseURL: 'http://localhost:5000/api/auth' })

export const userLogin = formData => AUTH_API.post('/login', formData)
export const userRegister = formData => AUTH_API.post('/register', formData)

const API = axios.create({ baseURL: 'http://localhost:5000/api' })
export const createQuest = newQuest => API.post('/quests', newQuest)
export const getQuest = id => API.get(`/quests/${id}`, id)

export const updateQuest = (id, updatedQuest) =>
  API.patch(`/quests/${id}`, updatedQuest)

export const removeQuest = id => API.delete(`/quests/${id}`)

export const getPersonalQuests = teacherId =>
  API.get(`/quests/teacher/${teacherId}`)

export const getPublicQuests = () => API.post('/quests/public')

export const searchQuests = (search, keywords) =>
  API.get(
    `/quests/search/${search === '' ? '1' : search}/${
      keywords === '' ? '1' : keywords
    }`,
  )

export const getTasks = questId => API.get(`/quests/${questId}/tasks`)
export const addTask = questId => API.get(`/quests/${questId}/tasks`)
export const updateTask = (questId, taskId) =>
  API.get(`/quests/${questId}/tasks/${taskId}`)
export const removeTasks = (questId, taskId) =>
  API.get(`/quests/${questId}/tasks/${taskId}`)

export const likeQuest = (questId, userId) =>
  API.patch(`/quests/${questId}/likes/${userId}`)
export const commentQuest = (comment, questId, userId) =>
  API.post(`/quests/${questId}/comment`, { comment, userId })

export const activateGame = activatedGame => API.post('/game', activatedGame)

export const addStudent = (questId, studentId) =>
  API.patch(`/game/${questId}/students`, { studentId })

export const saveStudentScore = StudentScore =>
  API.post('/studentScore', StudentScore)
