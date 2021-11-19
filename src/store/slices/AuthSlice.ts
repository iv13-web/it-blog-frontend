import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {IUser} from '../../types/common'
import {IAuthResponse} from '../../types/responses'

type AuthState = {
	user: IUser | null,
	accessToken: string | null,
	isAuthenticated: boolean
}

const initialState: AuthState = {
	user: null,
	accessToken: null,
	isAuthenticated: false,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state) => {
			state.accessToken = null
			state.user = null
			state.isAuthenticated = false
		},
		login: (state, {payload}: PayloadAction<IAuthResponse>) => {
			state.accessToken = payload.accessToken
			state.user = payload.user
			state.isAuthenticated = true // add extra logic with checking the activation link
		},
		updateToken: (state, {payload}: PayloadAction<string>) => {
			state.accessToken = payload
		},
	}
})

export const authReducer = authSlice.reducer
export const {updateToken, logout, login} = authSlice.actions
