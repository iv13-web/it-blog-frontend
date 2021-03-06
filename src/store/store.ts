import { configureStore } from '@reduxjs/toolkit'
import {authReducer} from './slices/AuthSlice'
import {api} from './api/api'
import {localStorageMiddleware} from './middlewares/localStorage'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import {notificationReducer} from './slices/NotifficationSlice'
import {notificationsMiddleware} from './middlewares/notifications'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		notification: notificationReducer,
		[api.reducerPath]: api.reducer
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(
			api.middleware,
			localStorageMiddleware,
			notificationsMiddleware,
		)
	}
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()
