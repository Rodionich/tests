import { makeStyles } from '@mui/styles'
import { tokens } from '../../theme/theme'
import { Theme } from '@mui/material'

export const useStyles = makeStyles((theme: Theme) => {
  const colors = tokens(theme.palette.mode)
  return {
    root: {
      display: 'flex',
      flexDirection: 'row',
      padding: 20,
    },
    publicQuests: {
      display: 'flex',
      flexDirection: 'row',
      padding: 30,
    },
    profile: {
      backgroundColor: `${
        theme.palette.mode === 'light'
          ? colors.primary.DEFAULT
          : colors.primary[600]
      }`,
      marginLeft: '5px',
      padding: 25,
      borderRadius: 15,
    },
    tasks: {
      backgroundColor: `${
        theme.palette.mode === 'light'
          ? colors.primary.DEFAULT
          : colors.primary[600]
      }`,
      padding: 15,
      borderRadius: 15,
      boxSizing: 'border-box',
    },
    info: {
      // backgroundColor: `${
      //   theme.palette.mode === 'light'
      //     ? colors.primary.DEFAULT
      //     : colors.primary[700]
      // }`,
      padding: '15px',
      // margin: '30px',
      // border: `1px solid ${colors.borderColor}`,
      // borderRadius: 15,
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
