import {responsiveFontSizes, ThemeProvider} from '@mui/material'
import {theme} from './theme/theme'
import React, {FC, useEffect} from 'react'
import {useLazyCheckAuthQuery} from './store/api/authEndpoints'
import Layout from './Layout/Layout'
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import Enter from './pages/Enter'
import {Main} from './pages/Main'
import 'react-toastify/dist/ReactToastify.css'
import {Top} from './pages/Top'
import {Latest} from './pages/Latest'
import {New} from './pages/New'
import MainContainer from './Layout/MainContainer'
import NavSidebar from './components/NavSidebar'


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
						<Route path='/new' component={New}/>


						<Route path='/:category?' component={Main}/>


							<Route path='/enter' component={Enter}/>
					</Switch>
				</Layout>
			</BrowserRouter>
		</ThemeProvider>
	)
}
