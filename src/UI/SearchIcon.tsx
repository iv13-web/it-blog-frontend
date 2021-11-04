import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import {IconButton} from '@mui/material'

type Props = {
	width?: string,
	height?: string,
	onClick?: React.MouseEventHandler,
}

export default function SearchIconButton({width, height, onClick}: Props) {
	return (
			<IconButton
				onClick={onClick}
				sx={{
					display: {
						xs: 'block',
						sm: 'none'
					},
				}}
			>
				<SearchIcon sx={{
					cursor: 'pointer',
					color: 'inherit',
				}}/>
			</IconButton>
	)
}
