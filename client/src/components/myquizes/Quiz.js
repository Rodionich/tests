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

function Quiz({ key, quiz }) {
  const classes = useStyles()
  const history = useNavigate()
  const dispatch = useDispatch()

  const socket = useSelector(state => state.gameReducer.socket)
  const startGame = async () => {
    let gameData = {
      quizId: quiz._id,
      teacherId: quiz.teacherId,
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
            image={quiz.backgroundImage}
            height="225"
          />
        </Grid>
        <Grid item xs={8}>
          <Box className={classes.cardActions}>
            <CardActions>
              <IconButton onClick={startGame}>
                <PlayCircleOutlineTwoToneIcon />
              </IconButton>
              <IconButton>
                <DeleteOutlineTwoToneIcon />
              </IconButton>
              <IconButton>
                <MoreVertTwoToneIcon />
              </IconButton>
            </CardActions>
          </Box>
          <CardContent>
            <Typography variant="h4">{quiz.title}</Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {quiz.creatorName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {quiz.description}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Сontains {quiz.numberOfQuestions} questions
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default Quiz
