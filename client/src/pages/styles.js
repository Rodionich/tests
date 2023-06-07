import { makeStyles } from '@mui/styles'
import { tokens } from '../theme/theme'
import { Theme } from '@mui/material'

export const useStyles = makeStyles((theme: Theme) => {
    const colors = tokens(theme.palette.mode)
    return {
        root: {
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
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            alignContent: 'center',
            justifyContent: 'center',
            padding: 30,
            borderRadius: 15,
        },
        info: {
            backgroundColor: `${
                theme.palette.mode === 'light'
                    ? colors.primary.DEFAULT
                    : colors.primary[700]
            }`,
            padding: '15px',
            margin: '30px',
            border: `1px solid ${colors.borderColor}`,
            borderRadius: 15,
        },
    }
})
