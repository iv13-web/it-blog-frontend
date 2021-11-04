import {CssBaseline, ThemeProvider} from '@mui/material'
import {theme} from './theme/theme'
import React, {FC, useEffect} from 'react'
import {useLazyCheckAuthQuery} from './store/api/authEndpoints'
import Layout from './Layout/Layout'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import SignIn from './pages/SignIn'
import Main from './pages/Main'

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
			<BrowserRouter>
				<Switch>
					<Layout>
						<Route exact path='/' component={Main}/>
						<Route path='/signin' component={SignIn}/>
					</Layout>
				</Switch>
			</BrowserRouter>
		</ThemeProvider>
	)
}
