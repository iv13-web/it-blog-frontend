import React from 'react'
import {Grid} from '@mui/material'
import Box from '@mui/material/Box'
import {HEADER_HEIGHT} from './constants'

type Props = {
	children: React.ReactNode
}

export default function MainContainer({children}: Props) {

  return (
		<Grid
			item
			component='main'
			sx={{maxWidth: '100%', flexGrow: 1}}
		>
			<Box sx={{mt: `${HEADER_HEIGHT}px`, pt: 2,}}>
				{children}
			</Box>
		</Grid>
  )
}