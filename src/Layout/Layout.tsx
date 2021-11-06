import React, {useState} from 'react'
import {Container, CssBaseline, Grid} from '@mui/material'
import Header from './Header/Header'
import {navMenu} from '../components/NavSidebar'
import MobileDrawer from '../components/MobileDrawer'

export default function Layout({children}: { children: React.ReactNode }) {
	const [mobileOpen, setMobileOpen] = useState<boolean>(false)
	const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

	return (
		<Container maxWidth='lg'>
			<CssBaseline/>
			<Header onDrawerToggle={handleDrawerToggle}/>
				<Grid container spacing={2}>
					<MobileDrawer
						open={mobileOpen}
						onClose={handleDrawerToggle}
					>
						{navMenu}
					</MobileDrawer>
					{children}
				</Grid>
		</Container>
	)
}
