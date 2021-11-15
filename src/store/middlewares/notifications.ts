import {login} from '../slices/AuthSlice'
import {Middleware} from 'redux'
import {toast} from 'react-toastify'

export const notificationsMiddleware: Middleware = store => next => action => {
	next(action)
	if (login.match(action)) {
		if (localStorage.getItem('accessToken')) {
			return
		}
		const {user} = action.payload
		toast(`🖐️ Welcome back, @${user.username}`, {
			pauseOnHover: false,
			hideProgressBar: true,
		})
		if (!user.isActivated) {
			toast(`Activate your account. Link was sent to ${user.email}`, {
				autoClose: false,
				type: 'warning',
			})
		}
	}
}
