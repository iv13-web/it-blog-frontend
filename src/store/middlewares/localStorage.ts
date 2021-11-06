import {login, logout, updateToken} from '../slices/AuthSlice'
import {Middleware} from 'redux'

export const localStorageMiddleware: Middleware = store => next => action => {
	next(action)
	if (login.match(action)) {
		try {
			localStorage.setItem('accessToken', action.payload.accessToken)
		} catch (e) {
			console.log(e)
		}
	}
	if (logout.match(action)) {
		try {
			localStorage.removeItem('accessToken')
		} catch (e) {
			console.log(e)
		}
	}
	if (updateToken.match(action)) {
		try {
			localStorage.setItem('accessToken', action.payload)
		} catch (e) {
			console.log(e)
		}
	}
}
