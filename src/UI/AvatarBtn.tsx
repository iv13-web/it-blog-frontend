import React from 'react'
import IconButton from '@mui/material/IconButton'
import {Avatar} from '@mui/material'

type Props = {
	menuId: string
	onClick: React.MouseEventHandler
}

export default function AvatarBtn({menuId, onClick}: Props) {

  return (
		<IconButton
			size="small"
			edge="end"
			aria-label="account of current user"
			aria-controls={menuId}
			aria-haspopup="true"
			onClick={onClick}
			color="inherit"
			sx={{ml: {xs: 0,sm: 1}}}
		>
			<Avatar
				src='https://lh3.googleusercontent.com/ogw/ADea4I4orE6-p_raZ-qk1h1nN9CVUT6sZmUiwQxf4xHN=s32-c-mo'
			/>
		</IconButton>
  )
}
