import { Chip, Grid, IconButton, InputBase, Typography } from '@mui/material'
import { useStyles } from '../components/publicQuests/styles'
import SearchIcon from '@mui/icons-material/Search'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Quest from '../components/publicQuests/Quest'
import { getPublicQuests } from '../actions/quest'
import { searchQuests } from '../actions/quest'
function PublicQuests() {
  const classes = useStyles()
  const [keywords, setKeywords] = useState([])
  const [tag, setTag] = useState('')
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const history = useNavigate()
  const { quests, isLoading } = useSelector(state => state.questReducer)

  useEffect(() => {
    dispatch(getPublicQuests())
  }, [dispatch])
  const addKeywords = e => {
    if (e.target.value !== '') {
      setKeywords([...keywords, e.target.value])
      setTag('')
    }
  }

  const searchPost = () => {
    if (search.trim() !== '' || keywords.length !== 0) {
      dispatch(searchQuests({ search, keywords: keywords.join(',') }))
      history(
        `/publicQuests/search?search=${
          search || 'none'
        }&keywords=${keywords.join(',')}`,
      )
    } else {
      history('/publicQuests')
    }
  }

  const removeKeywords = indexToRemove => {
    setKeywords([...keywords.filter((_, index) => index !== indexToRemove)])
  }

  return (
    <>
      <Grid container xs={8} direction="column" className={classes.root}>
        <Typography variant="h2" sx={{ marginBottom: '15px' }}>
          Search Public Quests
        </Typography>
        <Grid
          item
          container
          gap={5}
          className={classes.profile}
          sx={{ alignItem: 'center', justifyContent: 'center' }}>
          <Grid
            item
            xs={12}
            container
            direction="row"
            spacing={2}
            className={classes.info}>
            <IconButton className={classes.root} onClick={searchPost}>
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ px: '30px', py: '8px' }}
              placeholder="Title Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </Grid>
          <Grid
            item
            xs={12}
            container
            direction="row"
            spacing={2}
            sx={{ display: 'flex', alignItems: 'center' }}
            className={classes.info}>
            <IconButton className={classes.root} onClick={searchPost}>
              <SearchIcon />
            </IconButton>
            {keywords.map((tag, index) => (
              <Chip
                sx={{ marginRight: '10px' }}
                key={index}
                label={tag}
                variant="outlined"
                onDelete={() => removeKeywords(index)}
              />
            ))}
            <InputBase
              sx={{ px: '30px', py: '8px' }}
              value={tag}
              onChange={e => setTag(e.target.value)}
              placeholder="Keywords Search"
              onKeyUp={e => (e.key === 'Enter' ? addKeywords(e) : null)}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        xs={12}
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

export default PublicQuests
