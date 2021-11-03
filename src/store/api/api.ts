import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query/react"
import {RootState} from '../store'
import {logout, updateToken} from '../slices/AuthSlice'

const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:5000',
	prepareHeaders: (headers, {getState}) => {
		const {auth: {accessToken}} = getState() as RootState
		if (accessToken) {
			headers.set('authorization', `Bearer ${accessToken}`)
		}
		return headers
	},
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown , FetchBaseQueryError> = async (
	args,
	api,
	extraOptions
) => {
	let result = await baseQuery(args, api, extraOptions)
	if (result.error && result.error.status === 401) {
		const refreshResult = await baseQuery({
			url: '/refresh',
			method: 'GET',
			credentials: 'include'
		}, api, extraOptions)
		if (refreshResult.data) {
			// @ts-ignore
			const accessToken = refreshResult.data.accessToken
			api.dispatch(updateToken(accessToken as string))
			result = await baseQuery(args, api, extraOptions)
		} else {
			api.dispatch(logout())
			await baseQuery({
				url: '/logout',
				method: 'POST',
				credentials: "include",
			}, api, extraOptions)
		}
	}
	return result
}

export const api = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
	})
})
