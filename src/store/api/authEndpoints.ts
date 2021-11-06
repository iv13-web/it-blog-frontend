import {api} from './api'
import {IAuthResponse} from '../../types/responses'
import {login, logout} from '../slices/AuthSlice'

export const authEndpoints = api.injectEndpoints({
	endpoints: build => ({
		login: build.mutation({
			query: (credentials: {email: string, password: string}) => ({
				url: `/login`,
				method: 'POST',
				credentials: "include",
				body: credentials
			}),
			async onQueryStarted(arg, {dispatch, queryFulfilled, getCacheEntry}) {
				await queryFulfilled
				const userData = getCacheEntry().data
				dispatch(login(userData))
			}
		}),
		signup: build.mutation({
			query: (credentials: {username: string, email: string, password: string}) => ({
				url: `/signup`,
				method: 'POST',
				body: credentials
			}),
			async onQueryStarted(arg, {dispatch, queryFulfilled, getCacheEntry}) {
				await queryFulfilled
				const userData = getCacheEntry().data
				dispatch(login(userData))
			}
		}),
		logout: build.mutation({
			query: () => ({
				url: `/logout`,
				credentials: "include",
				method: 'POST',
			}),
			async onQueryStarted(arg, {queryFulfilled, dispatch}) {
				await queryFulfilled
				dispatch(logout())
			}
		}),
		checkAuth: build.query<IAuthResponse, null>({
			query: () => ({
				url: `/refresh`,
				credentials: "include"
			}),
			async onQueryStarted(arg, {dispatch, queryFulfilled, getCacheEntry}) {
				await queryFulfilled
				const userData = getCacheEntry().data
				if (userData) {
					dispatch(login(userData))
				}
			}
		}),
		checkUsername: build.mutation({
			query: (username) => ({
				url: `/check-username`,
				method: 'POST',
				body: username
			}),
		}),
		getUsers: build.query<IAuthResponse, null>({
			query: () => ({
				url: `/users`,
				credentials: "include"
			})
		})
	})
})

export const {
	useLoginMutation,
	useSignupMutation,
	useLogoutMutation,
	useLazyCheckAuthQuery,
	useCheckUsernameMutation
} = authEndpoints