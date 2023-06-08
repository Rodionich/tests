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
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined'
import { useStyles } from './styles'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { likeQuest } from '../../actions/quest'
function Quest({ key, quest }) {
  const classes = useStyles()
  const user = JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch()
  const history = useNavigate()

  const openQuestProfile = e => {
    history(`/publicQuests/${quest._id}`)
    window.scrollTo(0, 0)
  }

  return (
    <Grid container xs={4} item sx={{ marginBottom: '15px' }}>
      <Card className={classes.card}>
        <Grid container>
          <Grid item xs={6}>
            <CardMedia
              component="img"
              image={quest.backgroundImage}
              sx={{ height: '270px', width: '250px' }}
            />
          </Grid>
          <Grid item xs={6} sx={{ width: '100%' }}>
            <Box className={classes.cardActions}>
              <CardActions>
                <IconButton
                  onClick={() =>
                    dispatch(likeQuest(quest._id, user?.result?._id))
                  }
                  sx={{ marginRight: '20px' }}>
                  {quest.likes.length > 0 &&
                  quest.likes.find(like => like === user?.result?._id) ? (
                    <ThumbUpAltIcon />
                  ) : (
                    <ThumbUpAltOutlined />
                  )}
                </IconButton>
                <Typography>{quest.likes.length}</Typography>
              </CardActions>
              <CardActions>
                <IconButton onClick={openQuestProfile}>
                  <MoreVertTwoToneIcon />
                </IconButton>
              </CardActions>
            </Box>
            <CardContent sx={{ width: '250px' }}>
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
    </Grid>
  )
}

export default Quest
