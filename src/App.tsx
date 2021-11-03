import {ThemeProvider} from '@mui/material'
import {theme} from './theme/theme'
import {FC, useEffect} from 'react'
import {useLazyCheckAuthQuery} from './store/api/authEndpoints'
import ResponsiveDrawer from './Layout/Layout'

export const App: FC = () => {
	const [checkAuth, {isLoading}] = useLazyCheckAuthQuery()
	useEffect(() => {
		if (localStorage.getItem('accessToken')) {
			checkAuth(null)
		}
	}, [])

	if (isLoading) {
		return null
	}

	return (
		<ThemeProvider theme={theme}>
			<ResponsiveDrawer/>
		</ThemeProvider>
	)
}
