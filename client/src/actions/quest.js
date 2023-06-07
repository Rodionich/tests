import * as api from '../api/api'
import {
  CREATE_QUEST,
  GET_QUEST,
  UPDATE_QUEST,
  REMOVE_QUEST,
  GET_PERSONAL_QUESTS,
  GET_PUBLIC_QUESTS,
  SEARCH_QUESTS,
  LIKE_QUEST,
  COMMENT_QUEST,
  START_LOADING,
  END_LOADING,
} from '../constants/actionsTypes'
export const createQuest = (quest, history) => async dispatch => {
  try {
    const { data } = await api.createQuest(quest)
    dispatch({ type: CREATE_QUEST, payload: data })
    history(`/myQuests/${data._id}`, { replace: true })
  } catch (error) {
    console.log(error)
  }
}
export const getQuest = id => async dispatch => {
  try {
    console.log('action')
    const { data } = await api.getQuest(id)
    dispatch({ type: GET_QUEST, payload: { quest: data } })
  } catch (error) {
    console.log(error)
  }
}
export const updateQuest = (id, quest, history) => async dispatch => {
  try {
    const { data } = await api.updateQuest(id, quest)
    dispatch({ type: UPDATE_QUEST, payload: data })
    history(`/myQuests`, { replace: true })
  } catch (error) {
    console.log(error)
  }
}

export const removeQuest = id => async dispatch => {
  try {
    await api.removeQuest(id)
    dispatch({ type: REMOVE_QUEST, payload: id })
  } catch (error) {
    console.log(error)
  }
}

export const getPersonalQuests = id => async dispatch => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.getPersonalQuests(id)
    dispatch({ type: GET_PERSONAL_QUESTS, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const getPublicQuests = () => async dispatch => {
  try {
    dispatch({ type: START_LOADING })
    const data = await api.getPublicQuests()
    dispatch({
      type: GET_PUBLIC_QUESTS,
      payload: data,
    })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const searchQuests = search => async dispatch => {
  try {
    dispatch({ type: START_LOADING })
    const { data } = await api.searchQuests(search.search, search.keywords)
    dispatch({ type: SEARCH_QUESTS, payload: data })
    dispatch({ type: END_LOADING })
  } catch (error) {
    console.log(error)
  }
}

export const likeQuest = (questId, userId) => async dispatch => {
  try {
    const { data } = await api.likeQuest(questId, userId)
    dispatch({ type: LIKE_QUEST, payload: data })
  } catch (error) {
    console.log(error)
  }
}

export const commentQuest = (comment, questId, userId) => async dispatch => {
  try {
    const { data } = await api.commentQuest(comment, questId, userId)
    dispatch({ type: COMMENT_QUEST, payload: data })
    return data.comments
  } catch (error) {
    console.log(error)
  }
}
