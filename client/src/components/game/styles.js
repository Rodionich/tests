import { makeStyles } from '@mui/styles'
import { tokens } from '../../theme/theme'
import { Theme } from '@mui/material'

export const useStyles = makeStyles((theme: Theme) => {
  const colors = tokens(theme.palette.mode)
  return {
    root: {
      display: 'flex',
      flexDirection: 'row',
      padding: 30,
    },
    quest: {
      backgroundColor: `${
        theme.palette.mode === 'light'
          ? colors.primary.DEFAULT
          : colors.primary[600]
      }`,
      padding: '15px',
      margin: '15px',
      border: `1px solid ${colors.borderColor}`,
      borderRadius: 15,
    },
    ratings: {
      backgroundColor: `${
        theme.palette.mode === 'light'
          ? colors.primary.DEFAULT
          : colors.primary[600]
      }`,
      padding: '15px',
      margin: '15px',
      border: `1px solid ${colors.borderColor}`,
      borderRadius: 15,
    },
    result: {
      backgroundColor: `${
        theme.palette.mode === 'light'
          ? colors.primary.DEFAULT
          : colors.primary[600]
      }`,
      padding: '15px',
      margin: '15px',
      border: `1px solid ${colors.borderColor}`,
      borderRadius: 15,
    },
    waitingRoom: {
      backgroundColor: `${
        theme.palette.mode === 'light'
          ? colors.primary.DEFAULT
          : colors.primary[600]
      }`,
      padding: '15px',
      margin: '15px',
      border: `1px solid ${colors.borderColor}`,
      borderRadius: 15,
    },
    hoverStyle: {
      button: {
        backgroundColor: '#3c52b2',
        color: '#fff',
        '&:hover': {
          backgroundColor: '#fff',
          color: '#3c52b2',
        },
      },
    },
  }
})
