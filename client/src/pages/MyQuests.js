import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createQuest, getPersonalQuests } from '../actions/quest'
import QuestList from '../components/myQuests/QuestList'
import { useStyles } from '../components/myQuests/styles'
import Carousel from 'react-material-ui-carousel'
import { StyledButton } from '../components/auth/styles'

function MyQuests() {
  const user = JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch()
  const history = useNavigate()
  const classes = useStyles()
  const [questData, setQuestData] = useState({
    title: '',
    creatorName: `${user?.result.userName}`,
    creatorId: `${user?.result._id}`,
    backgroundImage: '',
    description: '',
    keywords: '',
    pointsPerQuestion: 1,
    isPublic: 'false',
    questionList: [],
  })

  console.log('isPublic', questData.isPublic)
  useEffect(() => {
    dispatch(getPersonalQuests(user.result._id))
  }, [])

  const quests = useSelector(state => state.questReducer.quests)
  const handleSubmit = () => {
    dispatch(createQuest(questData, history))
  }

  const handleChange = e => {
    setQuestData({ ...questData, [e.target.name]: e.target.value })
  }

  function chunk(arr, size) {
    const result = []

    for (let i = 0; i < Math.ceil(arr.length / size); i++) {
      result.push(arr.slice(i * size, i * size + size))
    }

    return result
  }

  const questsGroup = chunk(quests, 3)

  return (
    <Box className={classes.root}>
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <Typography sx={{ marginBottom: '10px' }} variant="h3">
            Create new quest
          </Typography>
          <Box className={classes.questSettings}>
            <Box sx={{ marginBottom: '10px' }}>
              <Typography variant="h5" sx={{ marginBottom: '10px' }}>
                Title
              </Typography>
              <TextField
                fullWidth
                name="title"
                onChange={handleChange}></TextField>
            </Box>
            <Box sx={{ marginBottom: '10px' }}>
              <Typography variant="h5" sx={{ marginBottom: '10px' }}>
                Description
              </Typography>
              <TextField
                fullWidth
                name="description"
                onChange={handleChange}></TextField>
            </Box>
            <Box sx={{ marginBottom: '10px' }}>
              <Typography variant="h5" sx={{ marginBottom: '10px' }}>
                Keywords
              </Typography>
              <TextField
                fullWidth
                name="keywords"
                onChange={handleChange}></TextField>
            </Box>
            <Box sx={{ marginBottom: '10px' }}>
              <FormControl>
                <Typography variant="h5">Access</Typography>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={questData.isPublic}
                  name="isPublic"
                  onChange={handleChange}>
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Public"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Private"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <StyledButton onClick={handleSubmit}>Create</StyledButton>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Typography sx={{ marginBottom: '10px' }} variant="h3">
            My quests
          </Typography>
          <Box className={classes.questSettings}>
            <Carousel
              navButtonsAlwaysInvisible={true}
              interval={'10000'}
              duration={'800'}>
              {questsGroup.map((questsList, index) => (
                <QuestList key={index} questsList={questsList} />
              ))}
            </Carousel>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MyQuests
