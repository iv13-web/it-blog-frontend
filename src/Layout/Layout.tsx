import {useState} from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MailIcon from '@mui/icons-material/Mail'
import Toolbar from '@mui/material/Toolbar'
import {Container, CssBaseline, Grid} from '@mui/material'
import Header from './Header'
import {DRAWER_WIDTH, HEADER_HEIGHT} from './constants'


interface Props {
}

export default function ResponsiveDrawer(props: Props) {
	const [mobileOpen, setMobileOpen] = useState(false)
	const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

	const drawer = (
		<>
			<CssBaseline/>
			<Toolbar sx={{display: {xs: 'block', md: 'none'}}}/>
			<List disablePadding>
				{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
					<ListItem button key={text}>
						<ListItemIcon>
							{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
						</ListItemIcon>
						<ListItemText primary={text}/>
					</ListItem>
				))}
			</List>
		</>
	)

	return (
		<>
			<Header onDrawerToggle={handleDrawerToggle}/>

			<Container maxWidth='lg'>
				<Grid container spacing={2}>


					<Drawer
						variant="temporary"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{keepMounted: true}}
						sx={{
							display: {sm: 'block', md: 'none'},
							'& .MuiDrawer-paper': {boxSizing: 'border-box', width: DRAWER_WIDTH},
						}}
					>
						{drawer}
					</Drawer>




					<Grid item sx={{display: {xs: 'none', md: 'block'}}} md={2} component='aside'>
						<Box sx={{mt: `${HEADER_HEIGHT}px`, pt: 2,}}>
							<Drawer
								variant="persistent"
								sx={{
									display: {xs: 'none', sm: 'block'},
									'& .MuiDrawer-paper': {
										boxSizing: 'border-box',
										border: 'none',
										position: 'static'
									},
								}}
								open
							>
								{drawer}
							</Drawer>
						</Box>
					</Grid>


					<Grid item xs={12} md={10} component='main'>
						<Box sx={{mt: `${HEADER_HEIGHT}px`, pt: 2,}}>
							<div style={{width: '100%', backgroundColor: 'teal', height: '350px'}}/>
						</Box>
					</Grid>




				</Grid>
			</Container>
		</>

	)
}
