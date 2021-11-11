import {FC} from 'react'
import NavSidebar from '../components/NavSidebar'
import MainContainer from '../Layout/MainContainer'
import {
	NavLink,
	Route,
	Switch,
	useRouteMatch
} from 'react-router-dom'
import {Top} from './Top'
import {Latest} from './Latest'
import {Feed} from './Feed'
import {Button} from '@mui/material'

const nestedTopRoutes = [
	{name: 'Week', path: '/top/week'},
	{name: 'Month', path: '/top/month'},
	{name: 'Year', path: '/top/year'},
	{name: 'Infinity', path: '/top/infinity'},
]

export const Main: FC = () => {
	let matchTopCategory = useRouteMatch('/top/:period')

	return (
		<>
			<NavSidebar/>
			<MainContainer>

				<div style={{display: 'flex', justifyContent: 'space-between'}}>
					<div>
						<NavLink exact activeStyle={{fontWeight: 'bold'}} to='/'>Feed </NavLink>
						<NavLink activeStyle={{fontWeight: "bold"}} to='/latest'>Latest </NavLink>
						<NavLink
							isActive={() => Boolean(matchTopCategory)}
							activeStyle={{fontWeight: "bold"}}
							to='/top/week'
						>
							Top
						</NavLink>
					</div>
					{matchTopCategory && (
						<div>
							{nestedTopRoutes.map(route => (
								<NavLink activeStyle={{fontWeight: "bold"}} to={route.path}>
									<Button variant='text' color='inherit' sx={{fontWeight: 'inherit'}}>
										{route.name}
									</Button>
								</NavLink>
							))}
						</div>
					)}
				</div>

				<Switch>
					<Route exact path='/' component={Feed}/>
					<Route path='/latest' component={Latest}/>
					<Route path='/top/:period' component={Top}/>
				</Switch>
			</MainContainer>
		</>
	)
}
