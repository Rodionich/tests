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
    settings: {
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
    addQuestion: {
      backgroundColor: `${
        theme.palette.mode === 'light'
          ? colors.primary.DEFAULT
          : colors.primary[600]
      }`,
      padding: '20px',
      margin: '15px',
      border: `1px solid ${colors.borderColor}`,
      borderRadius: 15,
    },
    displayQuestion: {
      maxHeight: '1100px',
      overflow: 'hidden',
      overflowY: 'scroll',
      padding: '20px',
      backgroundColor: `${
        theme.palette.mode === 'light'
          ? colors.primary.DEFAULT
          : colors.primary[600]
      }`,

      border: `1px solid ${colors.borderColor}`,
      borderRadius: 15,
    },
    displayQuestionList: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '15px',
      border: `1px solid ${colors.borderColor}`,
      borderRadius: 10,
      backgroundColor: `${
        theme.palette.mode === 'light'
          ? colors.secondary.DEFAULT
          : colors.primary[700]
      }`,
      '&:hover': {
        backgroundColor: `${
          theme.palette.mode === 'light'
            ? colors.secondary.DEFAULT
            : colors.primary[900]
        }`,
        cursor: 'pointer',
      },
    },
  }
})
