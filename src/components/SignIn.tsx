import {FC, useState} from 'react'
import {useAppSelector} from '../store/store'
import {useLoginMutation, useLogoutMutation, useSignupMutation, useLazyGetUsersQuery} from '../store/api/authEndpoints'

const SignIn: FC = () => {
	const [email, setEmail] = useState<string>('iivanovspg@gmail.com')
	const [password, setPassword] = useState<string>('111111')
	const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
	const user = useAppSelector(state => state.auth.user)
	const [login] = useLoginMutation()
	const [signup] = useSignupMutation()
	const [logout] = useLogoutMutation()
	const [getUsers] = useLazyGetUsersQuery()

	return (
		<div style={{margin: '50px auto', maxWidth: 400, display: 'flex', flexDirection: 'column'}}>
			<input style={{marginBottom: 20, padding:20, fontSize: 20}} type='text' placeholder='email' value={email} onChange={e => setEmail(e.target.value)}/>
			<input style={{marginBottom: 20, padding:20, fontSize: 20}} type='text' placeholder='password' value={password} onChange={e => setPassword(e.target.value)}/>

			<button style={{height: 50, marginBottom: 20, cursor: 'pointer'}} onClick={() => login({email, password})}>Send</button>

			<button style={{height: 50, marginBottom: 20, cursor: 'pointer'}} onClick={() => signup({email, password})}>Register</button>

			<button disabled={!isAuthenticated} style={{height: 50, marginBottom: 20, cursor: 'pointer'}} onClick={logout}>Logout</button>

			<button  style={{height: 50, marginBottom: 20, cursor: 'pointer'}} onClick={() => getUsers(null)}>Users</button>

			<br/>
			<br/>
			<br/>
			<h1>{isAuthenticated ? `Пользователь ${user && user?.email}` : 'авторизуйтесь'}</h1>
		</div>
	)
}

export default SignIn
