import {login, logout, updateToken} from '../slices/AuthSlice'
import {Middleware} from 'redux'

export const localStorageMiddleware: Middleware = store => next => action => {
	if (login.match(action)) {
		localStorage.setItem('accessToken', action.payload.accessToken)
	}
	if (logout.match(action)) {
		localStorage.removeItem('accessToken')
	}
	if (updateToken.match(action)) {
		localStorage.setItem('accessToken', action.payload)
	}
	return next(action)
}
