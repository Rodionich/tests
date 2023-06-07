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
    questSettings: {
      backgroundColor: `${
        theme.palette.mode === 'light'
          ? colors.primary.DEFAULT
          : colors.primary[600]
      }`,
      padding: '20px 16px',
      border: `1px solid ${colors.borderColor}`,
      borderRadius: 15,
    },
    card: {
      marginBottom: 15,
      border: `1px solid ${colors.borderColor}`,
      borderRadius: 15,
    },
    cardActions: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-start',
    },
  }
})
