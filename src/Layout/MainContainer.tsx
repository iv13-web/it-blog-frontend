import React from 'react'
import {Grid} from '@mui/material'
import {HEADER_HEIGHT} from './constants'
import {theme} from '../theme/theme'
import {SxProps} from '@mui/system'
import {Theme} from '@mui/material/styles'

type Props = {
	children: React.ReactNode
	maxWidth?: string | number,
	sx?: SxProps<Theme>
}

export default function MainContainer({children, maxWidth, sx}: Props) {

	return (
		<Grid
			item
			component='main'
			sx={{
				width: '100%',
				margin: '0 auto',
				mt: `calc(${HEADER_HEIGHT}px + ${theme.spacing(2)})`,
				pt: 2,
				...sx
			}}
		>
			{children}
		</Grid>
	)
}