import {useState} from 'react'
import {useAppSelector} from '../store/store'
import {
	useLazyGetUsersQuery,
	useLoginMutation,
	useLogoutMutation,
	useSignupMutation
} from '../store/api/authEndpoints'
import MainContainer from '../Layout/MainContainer'
import {Box, Button, Divider, Link, Paper, Typography} from '@mui/material'
import {Link as BrowserLink} from 'react-router-dom'
import GitHubIcon from '@mui/icons-material/GitHub'
import InputWithLabel from '../UI/InputWithLabel'

export default function Enter() {
	const [formType, setFormType] = useState<'login' | 'signup'>('login')
	const toggleFormType = () => {
		setFormType(formType === 'login' ? 'signup' : 'login')
	}

	// const [email, setEmail] = useState<string>('iivanovspg@gmail.com')
	// const [password, setPassword] = useState<string>('111111')
	// const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
	// const user = useAppSelector(state => state.auth.user)
	// const [login] = useLoginMutation()
	// const [signup] = useSignupMutation()
	// const [logout] = useLogoutMutation()
	// const [getUsers] = useLazyGetUsersQuery()

	return (
		<MainContainer sx={{maxWidth: 640}}>
			<Paper sx={{display: 'flex', flexDirection: 'column', p: 5}}>
				<Box sx={{mb: 2}}>
					<Typography variant='h4'
											sx={{fontWeight: 'bold', textAlign: 'center'}}>
						Welcome to DEVS
					</Typography>
				</Box>
				<Button
					variant='contained'
					startIcon={<GitHubIcon/>}
					sx={{
						py: 1,
						mb: 4,
						height: 44,
						transition: 'color .3s ease',
						backgroundColor: '#24292e',
						'&:hover': {
							backgroundColor: '#24292e',
							filter: 'brightness(80%)'
						}
					}}
				>
					Sign up with GitHub
				</Button>
				<Link
					component='button'
					underline='none'
					onClick={toggleFormType}
				>
					<Divider sx={{
						mb: 2,
						'&.MuiDivider-wrapper': {},
						'&.MuiDivider-root': {
							whiteSpace: 'normal',
							justifyContent: 'space-between',
							'&:before, &:after': {
								width: '25%',
								borderTop: '2px solid rgba(0, 0, 0, 0.12)'
							}
						}
					}}>
						<Typography component='span' variant='body2'>
							Already have an account? Log in
						</Typography>
					</Divider>
				</Link>

				<InputWithLabel
					fullWidth
					label='Email'
				/>
				<InputWithLabel
					fullWidth
					label='Password'
				/>
				<Button
					sx={{py: 1, mt: 1, mb: 2}}
					variant='contained'
				>
					Sign Up
				</Button>
				<Link
					variant='caption'
					underline='none'
					sx={{
						width: 'inherit',
						textAlign: 'center',
						cursor: 'pointer',
					}}
					onClick={() => console.log('history push')}
				>
					Forgot password
				</Link>
			</Paper>
		</MainContainer>
	)
}
