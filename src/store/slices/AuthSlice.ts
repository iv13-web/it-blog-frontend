import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IUser} from '../../types/common'
import {api} from '../api'
import {IAuthResponse} from '../../types/responses'

type AuthState = {
	user: IUser | null,
	token: string | null,
	isAuthenticated: boolean
}

const initialState: AuthState = {
	user: null,
	token: null,
	isAuthenticated: false,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: () => initialState
	},
	extraReducers: (build) => {
		build.addMatcher(
			api.endpoints.login.matchFulfilled,
			(state, action: PayloadAction<IAuthResponse>) => {
				const {payload} = action
				state.token = payload.accessToken
				state.user = payload.user
				state.isAuthenticated = true // add extra logic with checking the activation link
			}
		)
	},
})

export const authReducer = authSlice.reducer
export const {logout} = authSlice.actions