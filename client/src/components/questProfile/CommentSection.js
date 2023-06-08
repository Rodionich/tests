import { Box, Card, Stack, TextField } from '@mui/material'
import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { StyledButton } from '../auth/styles'
import { useDispatch } from 'react-redux'
import { commentQuest } from '../../actions/quest'
const CommentSection = ({ userId, questId }) => {
  const [commentText, setCommentText] = useState('')
  const dispatch = useDispatch()

  const handleSendButton = () => {
    if (commentText) {
      dispatch(commentQuest(commentText.trim(), questId, userId))
    }

    setCommentText('')
  }

  return (
    <Card>
      <Box sx={{ p: '15px' }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <AccountCircleIcon fontSize={'large'} />
          <TextField
            multiline
            fullWidth
            minRows={3}
            placeholder="Add a comment"
            value={commentText}
            onChange={e => {
              setCommentText(e.target.value)
            }}
          />
          <StyledButton onClick={handleSendButton}>Send</StyledButton>
        </Stack>
      </Box>
    </Card>
  )
}

export default CommentSection
