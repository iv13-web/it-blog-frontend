import {alpha, createTheme} from '@mui/material'
import {typography} from './typography'

const { palette } = createTheme()

export const theme = createTheme({
	typography,

	palette: {
		background: {
			default: '#efefef'
		},
	},

	components: {
		MuiButton: {
			defaultProps: {
				disableElevation: true,
				sx: {
					'.MuiButtonBase-root': {
						'& :hover': {
							backgroundColor: 'red'
						}
					}
				}
			},
			styleOverrides: {
				root: {
					textTransform: 'none'
				},
			}
		},
		MuiAppBar: {
			defaultProps: {
				elevation: 0,
				position: 'fixed',
				sx: {
					height: 56,
					backgroundColor: theme => theme.palette.common.white,
					boxShadow: theme => `0 0 0 1px ${alpha(theme.palette.common.black, 0.1)}`
				}
			}
		},
		MuiPaper: {
			defaultProps: {
				elevation: 0,
				sx: {
					boxShadow: theme => `0 0 0 1px ${alpha(theme.palette.common.black, 0.1)}`,
				}
			},
			styleOverrides: {
				elevation0: {
					boxShadow: `0 0 0 1px rgba(0,0,0,0.1)`
				}
			}
		}
	}
})
