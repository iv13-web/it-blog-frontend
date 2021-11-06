import {responsiveFontSizes, ThemeProvider} from '@mui/material'
import {theme} from './theme/theme'
import React, {FC, useEffect} from 'react'
import {useLazyCheckAuthQuery} from './store/api/authEndpoints'
import Layout from './Layout/Layout'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Enter from './pages/Enter'
import Main from './pages/Main'
import 'react-toastify/dist/ReactToastify.css'


export const App: FC = () => {
	const responsiveFontTheme = responsiveFontSizes(theme)
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
		<ThemeProvider theme={responsiveFontTheme}>
			<BrowserRouter>
				<Switch>
					<Layout>
						<Route exact path='/' component={Main}/>
						<Route path='/enter' component={Enter}/>
					</Layout>
				</Switch>
			</BrowserRouter>
		</ThemeProvider>
	)
}
