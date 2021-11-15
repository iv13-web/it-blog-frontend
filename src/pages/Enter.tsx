import {
	Box,
	Button,
	CircularProgress,
	Divider,
	IconButton,
	Link,
	Paper,
	styled,
	TextField,
	Tooltip,
	Typography
} from '@mui/material'
import {
	useCheckUsernameMutation,
	useLoginMutation,
	useSignupMutation
} from '../store/api/authEndpoints'
import {useCallback, useEffect, useState} from 'react'
import MainContainer from '../Layout/MainContainer'
import GitHubIcon from '@mui/icons-material/GitHub'
import {theme} from '../theme/theme'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined'
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from "yup"
import {useAppSelector} from '../store/store'
import LoadingButton from '@mui/lab/LoadingButton'
import {useHistory} from 'react-router-dom'
import debounce from 'lodash/debounce'
import useUpdatedEffect from '../hooks/useUpdatedEffect'
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import {ErrorTooltip, SuccessTooltip} from '../UI/Tooltips'

const Label = styled('label')(({theme}) => ({
	marginBottom: '8px',
	fontWeight: 600
}))

const styles: any = {
	wrapper: {
		display: 'flex',
		flexDirection: 'column',
		p: {xs: 2, sm: 5}
	},
	topBtn: {
		mb: 4,
		height: 48,
		transition: 'color .3s ease',
		'&:hover': {
			filter: 'brightness(80%)'
		}
	},
	gitHubBtn: {
		'&.MuiButton-root': {
			backgroundColor: '#24292e',
		}
	},
	divider: {
		mb: 2,
		'&.MuiDivider-root': {
			whiteSpace: 'normal',
			justifyContent: 'space-between',
			'&:before, &:after': {
				xs: {width: 0},
				sm: {
					width: '25%',
					borderTop: '2px solid rgba(0, 0, 0, 0.12)'
				}
			}
		}
	},
	errorBlock: {
		marginTop: 2,
		marginBottom: 2,
		padding: 2,
		backgroundColor: 'tomato',
		borderRadius: '4px',
		color: theme.palette.common.white,
		textAlign: 'center'
	},
	inputHeight: {
		'&.MuiInputBase-root': {
			height: 48,
		},
	}
}

type SubmitData = {
	username: string
	email: string
	password: string
}

const password = {
	password: yup
		.string()
		.required('⚠️ Password is required')
		.min(6, '⚠️ Password must be of minimum 6 characters')
		.max(16, '⚠️ Password must be of maximum 16 characters')
}

const email = {
	email: yup
		.string()
		.required('⚠️ Email is required')
		.email('⚠️ Enter a valid email'),
}

const signUpSchema = yup.object({
	username: yup
		.string()
		.required('⚠️ Username is required')
		.min(3, '⚠️ Username must be of minimum 3 characters'),
	...email,
	...password
}).required()

const logInSchema = yup.object({
	...email,
	...password
}).required()


export default function Enter() {
	const {push} = useHistory()
	const [formType, setFormType] = useState<'login' | 'signup'>('login')
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
	const [login, {error: loginError, isLoading: loadingLogin}] = useLoginMutation()
	const [signup, {error: signupError, isLoading: loadingSignUp}] = useSignupMutation()
	const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
	const validationSchema = formType === 'login' ? logInSchema : signUpSchema
	const {register, handleSubmit, formState:{errors}, clearErrors, watch} = useForm({
		resolver: yupResolver(validationSchema),
		mode: 'all',
	})
	const username = watch('username')
	const [checking, setChecking] = useState<boolean>(false)
	const [check, {data}] = useCheckUsernameMutation()
	const isUniqueUsername = data?.available
	const minUsernameLength = username?.length >= 3

	useUpdatedEffect(() => {
		if (minUsernameLength) {
			setChecking(true)
			checkUsername(username)

		} else {
			checkUsername.cancel()
			setChecking(false)
		}
	}, [username])


	const checkUsername = useCallback(
		debounce(async (username: string) => {
			check({username})
			setChecking(false)
		}, 500),[]
	)

	useEffect(() => {
		isAuthenticated && push('/')
	}, [isAuthenticated])

	const onSubmit = (credentials: SubmitData) => {
		formType === 'login'
			? login(credentials)
			: signup(credentials)
	}

	const toggleFormType = () => {
		setFormType(formType === 'login' ? 'signup' : 'login')
	}

	const shouldShowSuccess = isUniqueUsername && !checking && minUsernameLength
	const shouldShowError = !isUniqueUsername && !checking && minUsernameLength && data

	return (
		<MainContainer sx={{maxWidth: 640}}>
			<Paper sx={styles.wrapper}>
				<Box sx={{mb: 2}}>
					<Typography
						variant='h4'
						sx={{fontWeight: 'bold', textAlign: 'center'}}
					>
						Welcome to DEVS
					</Typography>
				</Box>
				<Button
					variant='contained'
					startIcon={<GitHubIcon/>}
					sx={{...styles.topBtn, ...styles.gitHubBtn}}
				>
					{formType === 'signup'
						? 'Sign up with GitHub'
						: 'Continue with GitHub'
					}
				</Button>

				<Divider sx={styles.divider}>
					<Link
						component='button'
						underline='none'
						onClick={() => {
							toggleFormType()
							clearErrors()
						}}
					>
						<Typography component='span' variant='body2'>
							{formType === 'signup'
								? 'Already have an account? Log in'
								: 'First time here? Create an account'
							}
						</Typography>
					</Link>
				</Divider>

				<form noValidate onSubmit={handleSubmit(onSubmit)}>
					{(loginError || signupError) &&
						<Box sx={styles.errorBlock}>
							{loginError
								? 'Invalid password or email 😕'
								: 'Error during registration, try later 😕'
							}
						</Box>
					}
					{formType === 'signup' &&
						<>
							<Label htmlFor='username'>Username</Label>
							<TextField
								{...register('username')}
								error={Boolean(shouldShowError)}
								id='username'
								name='username'
								fullWidth
								autoComplete='off'
								sx={{mb: theme.spacing(2)}}
								InputProps={{
									sx: {
										...styles.inputHeight,
										'&.MuiOutlinedInput-root': shouldShowSuccess && {
											'& fieldset': {borderColor:'green'},
											'&:hover fieldset': {borderColor:'green'},
											'&.Mui-focused fieldset': {borderColor:'green'},
										},
									},
									startAdornment: (
										<AlternateEmailOutlinedIcon
											fontSize='small'
											color='disabled'
											sx={{mr: 1}}
										/>
									),
									endAdornment: (
										<>
											{checking && <CircularProgress size={24}/>}
											{shouldShowSuccess &&
												<SuccessTooltip
													placement='left'
													title={`"${username}" is available 😎`}
												>
													<DoneOutlinedIcon color='success' sx={{cursor: 'default'}}/>
												</SuccessTooltip>
											}
											{shouldShowError &&
												<ErrorTooltip
													placement='left'
													title={`"${username}" already exists 😑`}
												>
													<ErrorOutlineOutlinedIcon color='error' sx={{cursor: 'default'}}/>
												</ErrorTooltip>
											}
											{!username?.length || checking && null}
										</>
									)
								}}
							/>
							{errors.username && (
								<Typography
									variant='subtitle2'
									sx={{mb: 3, mt: -1}}
								>
									{errors.username.message}
								</Typography>
							)}
						</>
					}

					<Label htmlFor='email'>Email</Label>
					<TextField
						{...register('email')}
						id='email'
						name='email'
						type='email'
						fullWidth
						sx={{mb: theme.spacing(2),}}
						InputProps={{sx: styles.inputHeight}}
					/>
					{errors.email && (
						<Typography
							variant='subtitle2'
							sx={{mb: 3, mt: -1}}
						>
							{errors.email.message}
						</Typography>
					)}

					<Label htmlFor='password'>Password</Label>
					<TextField
						{...register('password')}
						id='password'
						name='password'
						type={passwordVisible ? '' : 'password'}
						fullWidth
						sx={{mb: theme.spacing(2),}}
						InputProps={{
							sx: styles.inputHeight,
							endAdornment: (
								<Tooltip
									placement='left'
									title={passwordVisible ? 'click to hide' : 'click to show'}
								>
									<IconButton
										disableRipple
										onClick={() => setPasswordVisible(prev => !prev)}>
										{passwordVisible
											? <VisibilityOffOutlinedIcon/>
											: <VisibilityOutlinedIcon/>
										}
									</IconButton>
								</Tooltip>
							)
						}}
					/>
					{errors.password &&
						<Typography
							variant='subtitle2'
							sx={{mb: 3, mt: -1}}
						>
							{errors.password.message}
						</Typography>
					}

					{loadingLogin || loadingSignUp
						? (
							<LoadingButton
								fullWidth
								loading
								variant="outlined"
								loadingIndicator={formType === 'login'
									? 'Logging in...'
									: 'Signing Up...'
								}
								sx={{height: 48}}
							/>
						) : (
							<Button
								sx={{mt: 1, mb: 2, height: 48}}
								variant='contained'
								fullWidth
								type='submit'
							>
								{formType === 'login' ? 'Log In' : 'Sign Up'}
							</Button>
						)
					}
				</form>


			</Paper>
		</MainContainer>
	)
}

/*
 				{formType === 'login' ? (
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
						<Typography variant='subtitle2' sx={{textAlign: 'center'}}>
							Forgot password
						</Typography>
					</Link> ) : (
						<Typography sx={{textAlign: 'center'}}>
							Welcome on board 👋
						</Typography>
					)
					}
*/
