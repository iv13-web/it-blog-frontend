import {FC} from 'react'
import NavSidebar from '../components/NavSidebar'
import MainContainer from '../Layout/MainContainer'
import {NavLink, Route, Switch, useRouteMatch} from 'react-router-dom'
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

const NavButton = ({children}: {children: string}) => (
	<Button
		disableRipple
		variant='text'
		color='inherit'
		sx={{fontWeight: 'inherit'}}
	>
		{children}
	</Button>
)

export const Main: FC = () => {
	const topCategorySelected = useRouteMatch('/top/:period')

	return (
		<>
			<NavSidebar/>
			<MainContainer>

				<div style={{display: 'flex', justifyContent: 'space-between'}}>
					<div>
						<NavLink exact activeStyle={{fontWeight: 'bold'}} to='/'>
							<NavButton>Feed</NavButton>
						</NavLink>

						<NavLink activeStyle={{fontWeight: "bold"}} to='/latest'>
							<NavButton>Latest</NavButton>
						</NavLink>
						<NavLink
							isActive={() => Boolean(topCategorySelected)}
							activeStyle={{fontWeight: "bold"}}
							to='/top/week'
						>
							<NavButton>Top</NavButton>
						</NavLink>
					</div>
					{topCategorySelected && (
						<div>
							{nestedTopRoutes.map(route => (
								<NavLink key={route.name} activeStyle={{fontWeight: "bold"}} to={route.path}>
									<NavButton>{route.name}</NavButton>
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
