import {Box, InputBase, InputLabel, styled} from '@mui/material'
import {InputBaseProps} from '@mui/material/InputBase/InputBase'

const StyledInput = styled(InputBase)(({theme, fullWidth}) => ({
	'& .MuiInputBase-input': {
		borderRadius: 4,
		position: 'relative',
		border: '1px solid #ced4da',
		fontSize: 16,
		width: fullWidth ? '100% ' : 'auto',
		padding: '10px 12px',
		transition: 'all .3s ease',
		'&:focus': {
			boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
		},
	}
}))

interface IInputWithLabel extends InputBaseProps{
	fullWidth?: boolean,
	label?: string
}

export default function InputWithLabel({
	label,
	sx,
	fullWidth,
	...props
}: IInputWithLabel) {

	return (
		<Box sx={{mb: 3}}>
			<InputLabel
				shrink
				htmlFor="email"
				sx={{
					fontSize: 20,
					color: '#000',
					fontWeight: 600,
					'&.Mui-focused': {
						color: 'inherit'
					},
					...sx
				}}
			>
				{label}
			</InputLabel>
			<StyledInput fullWidth={fullWidth} {...props}/>
		</Box>
	)
}