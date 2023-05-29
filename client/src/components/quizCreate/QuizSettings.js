import React from 'react'
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material'
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone'
import CheckBoxTwoToneIcon from '@mui/icons-material/CheckBoxTwoTone'
import { useStyles } from './styles'

function QuizSettings({
  isQuizOptionsVisible,
  quizData,
  setQuizData,
  handleQuizChange,
  handleQuizSubmit,
  showQuizOptions,
}) {
  const classes = useStyles()
  return (
    <Grid
      className={classes.settings}
      container
      spacing={2}
      style={{
        display: isQuizOptionsVisible ? 'flex' : 'none',
      }}>
      <Grid item xs={4}>
        <Box>
          <Typography variant="h4" sx={{ marginBottom: '15px' }}>
            Quiz
          </Typography>
          <TextField
            value={quizData.title}
            name="title"
            onChange={handleQuizChange}></TextField>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box>
          <Typography variant="h4" sx={{ marginBottom: '15px' }}>
            Description
          </Typography>
          <TextField
            value={quizData.description}
            name="description"
            onChange={handleQuizChange}></TextField>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box>
          <Typography variant="h4" sx={{ marginBottom: '15px' }}>
            Points
          </Typography>
          <TextField
            type="number"
            min={1}
            value={quizData.pointsPerQuestion}
            name="pointsPerQuestion"
            onChange={handleQuizChange}></TextField>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box>
          <FormControl>
            <Typography variant="h4">Access</Typography>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={quizData.isPublic}
              name="isPublic"
              onChange={handleQuizChange}>
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="Public"
              />
              <FormControlLabel
                value="true"
                control={<Radio />}
                label="Private"
              />
            </RadioGroup>
          </FormControl>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box>
          <Typography variant="h4" sx={{ marginBottom: '15px' }}>
            Background Image
          </Typography>
          <TextField
            size="small"
            type="file"
            multiple={false}
            name="backgroundImage"
            onChange={e => {
              const reader = new FileReader()
              // console.log(e.target.files[0])
              reader.readAsDataURL(e.target.files[0])
              // console.log(reader)
              reader.onload = () => {
                // console.log(reader.result)
                setQuizData({
                  ...quizData,
                  [e.target.name]: reader.result,
                })
              }
            }}
          />
        </Box>
      </Grid>
      <Grid
        item
        xs={4}
        sx={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
        }}>
        <Box>
          <IconButton onClick={showQuizOptions}>
            <SettingsTwoToneIcon />
          </IconButton>
        </Box>
        <Box>
          <IconButton onClick={handleQuizSubmit}>
            <CheckBoxTwoToneIcon />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  )
}

export default QuizSettings
