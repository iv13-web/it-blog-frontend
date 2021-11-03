import {ThemeProvider} from '@mui/material'
import {theme} from './theme/theme'
import {FC, useEffect} from 'react'
import SignIn from './components/SignIn'
import {useLazyCheckAuthQuery} from './store/api/authEndpoints'

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
			<SignIn/>
		</ThemeProvider>
	)
}
