import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import {IconButton} from '@mui/material'

type Props = {
	onClick?: React.MouseEventHandler,
	hideMobile?: boolean
}

export default function SearchIconButton({onClick, hideMobile}: Props) {
	return (
			<IconButton
				onClick={onClick}
				sx={{
					display: {
						xs: 'block',
						sm: hideMobile ? 'none' : 'block'
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
