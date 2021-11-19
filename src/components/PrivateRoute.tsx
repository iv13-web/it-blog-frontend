import React from 'react'
import {
	Route,
	Redirect,
	RouteProps,
	useHistory,
} from 'react-router-dom'
import {useAppSelector} from '../store/store'
import {RouteComponentProps} from 'react-router'
import useUpdatedEffect from '../hooks/useUpdatedEffect'

interface IPrivateRouteProps extends RouteProps {
	component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
}

export const PrivateRoute = (props: IPrivateRouteProps) => {
	const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
	const {push} = useHistory()
	const {component: Component, ...rest} = props

	useUpdatedEffect(() => {
		if (!isAuthenticated) {
			push('/enter')
		}
	}, [isAuthenticated])

	if (localStorage.getItem('accessToken')) {
		return <Route
			{...rest}
			render={(routeProps) =>
				<Component {...routeProps} />
			}
		/>
	}

	return (
		<Route
			{...rest}
			render={(routeProps) =>
				<Redirect
					to={{
						pathname: '/enter',
						state: {from: routeProps.location}
					}}
				/>
			}
		/>
	)
}
