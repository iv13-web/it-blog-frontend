import {FC, useState} from 'react'
import * as yup from "yup"
import {alpha, Box, Button, Paper, styled, TextField} from '@mui/material'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import {OutlinedTextFieldProps} from '@mui/material/TextField/TextField'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

const validationSchema = yup.object({
	title: yup.string().required(),
	content: yup.string().required()
})

const BigInput = styled(TextField)({
	width: '100%',
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			border: 'none',
		},
	},
	'& .MuiOutlinedInput-input': {
		padding: 0,
		marginBottom: 10,
		fontSize: 30,
		height: 46,
		fontWeight: 'bold',
		'&::placeholder': {
			fontSize: 'inherit',
			fontWeight: 'inherit',
			color: 'black'
		}
	}
})

const SmallInput = styled(TextField)<OutlinedTextFieldProps>(({theme}) => ({
	width: '100%',
	[theme.breakpoints.up('xs')]: {
		marginBottom: theme.spacing(2)
	},
	[theme.breakpoints.up('sm')]: {
		marginBottom: theme.spacing(4)
	},
	'& .MuiOutlinedInput-input': {
		padding: 0,
	},
	'& .MuiOutlinedInput-root': {
		paddingTop: 0,
		'& fieldset': {
			border: 'none',
		},
	}
}))

const UploadButton = styled(Button)(({theme}) => ({
	borderRadius: 0,
	paddingBottom: theme.spacing(1.2),
	paddingTop: theme.spacing(1.2),
	color: alpha(theme.palette.common.black, 0.6),
	display: 'flex',
	justifyContent: 'start',
	fontWeight: 600,
	[theme.breakpoints.up('xs')]: {
		width: `calc(100% + ${theme.spacing(2)} * 2)`,
		marginLeft: `-${theme.spacing(2)}`,
		marginRight: `-${theme.spacing(2)}`,
	},
	[theme.breakpoints.up('sm')]: {
		width: `calc(100% + ${theme.spacing(4)} * 2)`,
		marginLeft: `-${theme.spacing(4)}`,
		marginRight: `-${theme.spacing(4)}`,
	},
	'&.MuiButton-root': {
		backgroundColor: alpha(theme.palette.common.black, 0.1),
	}
}))



export const PostForm: FC = () => {
	const [showHints, setShowHints] = useState<boolean>(true)
	const {register, handleSubmit, formState:{errors}, clearErrors, watch} = useForm({
		resolver: yupResolver(validationSchema),
		mode: 'all',
	})

	return (
		<Box sx={{display: 'flex', justifyContent: 'start'}}>
			<Box sx={{
				display: 'flex',
				flexDirection: 'column',
				mr: {xs: 0, sm: 1},
				flexGrow: 1,
			}}>
				<Paper sx={{p: {xs: 2, sm: 4}}}>
					{/*	FORM_TOP*/}
					<BigInput placeholder='New post title here...'/>
					<SmallInput variant='outlined' placeholder='Add up to 4 tags...'/>
					<UploadButton
						disableRipple
						variant='contained'
						startIcon={<ImageOutlinedIcon sx={{ml: {sm: 2}}}/>}
					>
						Upload image
					</UploadButton>
				</Paper>
			</Box>

			{/*RIGHT_TOOLTIP*/}
			<Paper sx={{
				display: {
					xs: 'none',
					md: 'block'
				},
				p: {xs: 2, sm: 4},
				maxWidth: 250
			}}>
				# Header
				...
				###### Header	H1 Header
				...
				H6 Header
			</Paper>
		</Box>
	)
}

