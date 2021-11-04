import {alpha, createTheme} from '@mui/material'
import {typography} from './typography'

export const theme = createTheme({
	typography,

	palette: {
		background: {
			default: '#efefef'
		}
	},

	components: {
		MuiButton: {
			defaultProps: {
				disableElevation: true
			},
			styleOverrides: {
				root: {
					textTransform: 'none'
				}
			}
		},
		MuiAppBar: {
			defaultProps: {
				elevation: 0,
				position: 'fixed',
				sx: {
					height: 56,
					backgroundColor: theme => theme.palette.common.white,
					boxShadow: theme => `0 1px 1px 1px ${alpha(theme.palette.common.black, 0.01)}`
				}
			}
		},
	}
})