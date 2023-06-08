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

function QuestSettings({
  isQuestOptionsVisible,
  questData,
  setQuestData,
  handleQuestChange,
  handleQuestSubmit,
  showQuestOptions,
}) {
  const classes = useStyles()
  return (
    <Grid
      className={classes.settings}
      container
      spacing={2}
      style={{
        display: isQuestOptionsVisible ? 'flex' : 'none',
      }}>
      <Grid item xs={4}>
        <Box>
          <Typography variant="h4" sx={{ marginBottom: '15px' }}>
            Title
          </Typography>
          <TextField
            value={questData.title}
            name="title"
            onChange={handleQuestChange}></TextField>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box>
          <Typography variant="h4" sx={{ marginBottom: '15px' }}>
            Description
          </Typography>
          <TextField
            value={questData.description}
            name="description"
            onChange={handleQuestChange}></TextField>
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
            value={questData.pointsPerQuestion}
            name="pointsPerQuestion"
            onChange={handleQuestChange}></TextField>
        </Box>
      </Grid>
      <Grid item xs={4}>
        <Box>
          <FormControl>
            <Typography variant="h4">Access</Typography>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={questData.isPublic}
              name="isPublic"
              onChange={handleQuestChange}>
              <FormControlLabel
                value={true}
                control={<Radio />}
                label="Public"
              />
              <FormControlLabel
                value={false}
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
              reader.readAsDataURL(e.target.files[0])
              reader.onload = () => {
                setQuestData({
                  ...questData,
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
          <IconButton onClick={showQuestOptions}>
            <SettingsTwoToneIcon />
          </IconButton>
        </Box>
        <Box>
          <IconButton onClick={handleQuestSubmit}>
            <CheckBoxTwoToneIcon />
          </IconButton>
        </Box>
      </Grid>
    </Grid>
  )
}

export default QuestSettings
