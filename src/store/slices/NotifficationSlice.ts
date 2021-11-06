import {createSlice} from '@reduxjs/toolkit'

const initialState: any= {
	user: null,
	accessToken: null,
	isAuthenticated: false,
}

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
	},
	extraReducers: (build) => {
		// build.addMatcher(
		// 	authEndpoints.endpoints.login.matchRejected,
		// 	() => {
		// 		toast.error("FDFDGFG", {
		// 			icon: "🚀"
		// 		})
		// 	}
		// )
	}
})

export const notificationReducer = notificationSlice.reducer