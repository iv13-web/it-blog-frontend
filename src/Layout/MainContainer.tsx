import React from 'react'
import {Grid} from '@mui/material'
import {HEADER_HEIGHT} from './constants'
import {theme} from '../theme/theme'
import {SxProps} from '@mui/system'
import {Theme} from '@mui/material/styles'

type Props = {
	children: React.ReactNode
	sx?: SxProps<Theme>
}

export default function MainContainer({children, sx}: Props) {

	return (
		<Grid
			item
			component='main'
			sx={{
				flexGrow: 1,
				margin: '0 auto',
				mt: `calc(${HEADER_HEIGHT}px + ${theme.spacing(1)})`,
				pt: 1,
				...sx
			}}
		>
			{children}
		</Grid>
	)
}