import React from 'react'
import {MOBILE_DRAWER_WIDTH} from '../Layout/constants'
import {Drawer, DrawerProps} from '@mui/material'


export default function MobileDrawer({open, onClose, children}: DrawerProps) {
	return (
		<Drawer
			variant="temporary"
			open={open}
			onClose={onClose}
			ModalProps={{keepMounted: true}}
			sx={{
				display: {sm: 'block', md: 'none'},
				'& .MuiDrawer-paper': {
					boxSizing: 'border-box',
					minWidth: MOBILE_DRAWER_WIDTH
				},
			}}
		>
			{children}
		</Drawer>
	)
}
