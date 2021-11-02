import { configureStore } from '@reduxjs/toolkit'
import {authReducer} from './slices/AuthSlice'
import {api} from './api'
import {localStorageMiddleware} from './middlewares/localStorage'


export const store = configureStore({
	reducer: {
		// init: initReducer,
		auth: authReducer,
		[api.reducerPath]: api.reducer
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(localStorageMiddleware)
	}
})

export type RootState = ReturnType<typeof store.getState>