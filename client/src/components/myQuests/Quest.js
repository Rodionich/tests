import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import React from 'react'
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone'
import PlayCircleOutlineTwoToneIcon from '@mui/icons-material/PlayCircleOutlineTwoTone'
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone'
import { useStyles } from './styles'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { activateGame } from '../../actions/game'
import { removeQuest } from '../../actions/quest'

function Quest({ quest }) {
  const classes = useStyles()
  const history = useNavigate()
  const dispatch = useDispatch()

  const socket = useSelector(state => state.gameReducer.socket)

  const openQuestCreator = e => {
    history(`/myQuests/${quest._id}`)
  }

  const startGame = async () => {
    let gameData = {
      ...quest,
      questId: quest._id,
      creatorId: quest.creatorId,
      isLive: true,
      pin: String(Math.floor(Math.random() * 900000) + 100000),
    }
    const activatedGame = await dispatch(activateGame(gameData, history))
    socket.emit('init-game', activatedGame)
  }

  return (
    <Card className={classes.card}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <CardMedia
            component="img"
            image={quest.backgroundImage}
            height="225"
          />
        </Grid>
        <Grid item xs={8}>
          <Box className={classes.cardActions}>
            <CardActions>
              <IconButton onClick={startGame}>
                <PlayCircleOutlineTwoToneIcon />
              </IconButton>
              <IconButton onClick={() => dispatch(removeQuest(quest._id))}>
                <DeleteOutlineTwoToneIcon />
              </IconButton>
              <IconButton onClick={openQuestCreator}>
                <MoreVertTwoToneIcon />
              </IconButton>
            </CardActions>
          </Box>
          <CardContent>
            <Typography variant="h4">{quest.title}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {quest.creatorName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {quest.description}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Сontains {quest.numberOfQuestions} questions
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default Quest
