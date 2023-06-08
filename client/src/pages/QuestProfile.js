import { useStyles } from '../components/questProfile/styles'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPersonalQuests, getQuest } from '../actions/quest'
import { Box, Grid, Stack, Typography } from '@mui/material'
import CommentSection from '../components/questProfile/CommentSection'
import Task from '../components/questProfile/Task'
import Quest from '../components/publicQuests/Quest'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

function QuestProfile() {
  const { questId } = useParams()
  const classes = useStyles()
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'))
  const chatRef = useRef()
  const quest = useSelector(state => state.questReducer.quest)
  const { quests } = useSelector(state => state.questReducer)
  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [quest?.comments])

  useEffect(() => {
    dispatch(getQuest(questId))
  }, [questId]) // eslint-disable-line

  useEffect(() => {
    if (quest) {
      dispatch(getPersonalQuests(quest.creatorId))
    }
  }, [quest]) // eslint-disable-line

  return (
    <>
      <Typography variant="h2" className={classes.root}>
        Quest Profile
      </Typography>
      <Grid
        container
        item
        xs={12}
        gap={3}
        direction="column"
        sx={{ padding: '20px' }}>
        <Grid
          item
          container
          direction={'row'}
          alignItems="center"
          className={classes.profile}
          sx={{ width: '50%' }}>
          <Grid item xs={5}>
            <img
              src={quest.backgroundImage}
              height="100%"
              width="100%"
              alt="question background"
            />
          </Grid>
          <Grid
            item
            xs={7}
            className={classes.info}
            container
            direction="column">
            <Grid item>
              <Typography variant="h2" sx={{ marginBottom: '10px' }}>
                {quest.title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ marginBottom: '10px' }}>
                {quest.keywords?.split(',')}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ marginBottom: '10px' }}>
                {quest.creatorName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="h5"
                color="text.secondary"
                sx={{ marginBottom: '10px' }}>
                {quest.description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item sx={{ width: '50%' }}>
          <Grid
            ref={chatRef}
            item
            sx={{
              maxHeight: '180px',
              overflow: 'hidden',
              overflowY: 'scroll',
              marginBottom: '20px',
            }}
            className={classes.tasks}>
            {quest.comments?.map(comment => (
              <Stack direction="row" alignItems="center">
                <AccountCircleIcon fontSize={'large'} />
                <Box>
                  <Typography variant="h6" className={classes.root}>
                    {comment}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Grid>
          <CommentSection userId={user.result._id} questId={questId} />
        </Grid>
      </Grid>
      <Typography variant="h2" className={classes.root}>
        Quest Tasks
      </Typography>
      <Grid
        item
        xs={12}
        className={classes.root}
        gap={5}
        container
        sx={{
          justifyContent: 'spaceBetween',
        }}>
        {quest.questionList?.map((questionData, index) => (
          <Task key={index} task={questionData} />
        ))}
      </Grid>
      <Typography variant="h2" className={classes.root}>
        More quests from the author
      </Typography>
      <Grid
        xs={12}
        item
        className={classes.publicQuests}
        sx={{
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
        }}>
        {quests.map(quest => (
          <Quest key={quest.id} quest={quest} />
        ))}
      </Grid>
    </>
  )
}

export default QuestProfile
