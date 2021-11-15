import {responsiveFontSizes, ThemeProvider} from '@mui/material'
import {theme} from './theme/theme'
import React, {FC, useEffect} from 'react'
import {useLazyCheckAuthQuery} from './store/api/authEndpoints'
import Layout from './Layout/Layout'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Enter from './pages/Enter'
import {Main} from './pages/Main'
import 'react-toastify/dist/ReactToastify.css'
import {New} from './pages/New'
import {PrivateRoute} from './components/PrivateRoute'


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
				<Layout>
					<Switch>
						<PrivateRoute path='/new' component={New}/>
						<Route path='/enter' component={Enter}/>
						<Route path='/:category?' component={Main}/>
					</Switch>
				</Layout>
			</BrowserRouter>
		</ThemeProvider>
	)
}
