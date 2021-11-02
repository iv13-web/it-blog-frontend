import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError} from "@reduxjs/toolkit/query/react"
import {logout} from './slices/AuthSlice'
import {RootState} from './store'



const baseQuery = fetchBaseQuery({
	baseUrl: 'http://localhost:5000',
	prepareHeaders: (headers, { getState }) => {
		console.log(getState())
		const {auth: {token: accessToken}} = getState() as RootState

		if (accessToken) {
			headers.set('authorization', `Bearer ${accessToken}`)
		}
		return headers
	}
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
	args,
	api,
	extraOptions
) => {
	let result = await baseQuery(args, api, extraOptions)

	if (result.error && result.error.status === 401) {
		const refreshResult = await baseQuery({
			url: 'refresh/',
			method: 'POST'
		}, api, extraOptions)

		if (refreshResult.data) {
			// api.dispatch(tokenUpdated({ accessToken: refreshResult.data as string }))

			// retry the initial query
			result = await baseQuery(args, api, extraOptions)
		} else {
			api.dispatch(logout())
		}
	}
	return result
}






export const api = createApi({
	reducerPath: 'api',
	baseQuery: baseQueryWithReauth,
	// baseQuery: fetchBaseQuery({
	// 	baseUrl: 'http://localhost:5000',
	// 	// prepareHeaders: (headers, { getState }) => {
	// 	// 	const token = getState().auth.token
	// 	//
	// 	// 	// If we have a token set in state, let's assume that we should be passing it.
	// 	// 	if (token) {
	// 	// 		headers.set('authorization', `Bearer ${token}`)
	// 	// 	}
	// 	//
	// 	// 	return headers
	// 	// },
	// }),
	endpoints: (build) => ({
		login: build.mutation({
			query: (credentials: {email: string, password: string}) => ({
				url: `/login`,
				method: 'POST',
				body: credentials
			}),
		})
	})
})

export const {useLoginMutation} = api