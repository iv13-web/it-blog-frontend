import {IconButton} from '@mui/material'
import CreateRoundedIcon from '@mui/icons-material/CreateRounded'
import {useHistory} from 'react-router-dom'

export default function CreatePostBtnMobile() {
	const history = useHistory()

	return (
		<IconButton
			sx={{
				flexShrink: 0,
				display: {
					xs: 'block',
					sm: 'none'
				},
			}}
			onClick={() => history.push('/new')}
		>
			<CreateRoundedIcon/>
		</IconButton>
	)
}