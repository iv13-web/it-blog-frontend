import {FC, useState} from 'react'
import {api, useLoginMutation} from '../store/api'

const SignIn: FC = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	const [login] = useLoginMutation()


	return (
		<div style={{margin: '50px auto', maxWidth: 400, display: 'flex', flexDirection: 'column'}}>
			<input style={{marginBottom: 20, padding:20, fontSize: 20}} type='text' placeholder='email' value={email} onChange={e => setEmail(e.target.value)}/>
			<input style={{marginBottom: 20, padding:20, fontSize: 20}} type='text' placeholder='password' value={password} onChange={e => setPassword(e.target.value)}/>

			<button style={{height: 50}} onClick={() => login({email, password})}>Send</button>

			<button style={{height: 50}} onClick={() => {

			}}>Register</button>
		</div>
	)
}

export default SignIn
