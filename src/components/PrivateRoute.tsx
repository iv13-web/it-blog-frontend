import React, {useState} from 'react'
import {Route, Redirect, RouteProps} from 'react-router-dom'
import {useAppSelector} from '../store/store'
import {RouteComponentProps} from 'react-router'

interface IPrivateRouteProps extends RouteProps {
	component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>
}

export const PrivateRoute = (props: IPrivateRouteProps) => {
	const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
	const {component: Component, ...rest} = props

	return (
		<Route
			{...rest}
			render={(routeProps) =>
				isAuthenticated ? (
					<Component {...routeProps} />
				) : (
					<Redirect
						to={{
							pathname: '/enter',
							state: {from: routeProps.location}
						}}
					/>
				)
			}
		/>
	)
}
