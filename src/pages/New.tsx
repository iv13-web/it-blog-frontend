import MainContainer from '../Layout/MainContainer'
import {Box, Button, Paper, Typography} from '@mui/material'
import {useAppSelector} from '../store/store'
import {PostForm} from '../components/PostForm'

export const New = () => {
	const isActivated = useAppSelector(state => state.auth.user?.isActivated)
	const userEmail = useAppSelector(state => state.auth.user?.email)

	if (!isActivated) {
		return (
			<MainContainer>
				<Paper sx={{width: 600, m: '0 auto', p: {xs: 2, sm: 5}}}>
					<Typography
						variant='h6'
						sx={{textAlign: 'center', fontWeight: '600'}}
						gutterBottom
					>
						Activate your account
					</Typography>
					<Typography variant='body1' sx={{textAlign: 'center'}} gutterBottom>
						link was sent to:
					</Typography>
					<Typography variant='subtitle2' sx={{textAlign: 'center'}}>
						{userEmail}
					</Typography>
				</Paper>
			</MainContainer>
		)
	}

	return (
		<MainContainer>
			<Box>
				<Button>Edit</Button>
				<Button>Preview</Button>
				<PostForm/>
			</Box>
		</MainContainer>
	)
}
