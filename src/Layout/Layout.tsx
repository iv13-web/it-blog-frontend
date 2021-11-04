import React, {useState} from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import {Container, CssBaseline, Grid} from '@mui/material'
import Header from './Header/Header'
import {MOBILE_DRAWER_WIDTH, HEADER_HEIGHT} from './constants'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded'
import TagRoundedIcon from '@mui/icons-material/TagRounded'
import EmojiObjectsRoundedIcon from '@mui/icons-material/EmojiObjectsRounded'

const AsideLinks = [
	{
		text: 'Favorites',
		icon: <FavoriteRoundedIcon/>,
		path: '/favorites'
	},
	{
		text: 'Bookmarks',
		icon: <BookmarksRoundedIcon/>,
		path: '/bookmarks'
	},
	{
		text: 'Tags',
		icon: <TagRoundedIcon/>,
		path: '/tags'
	},
	{
		text: 'FAQ',
		icon: <EmojiObjectsRoundedIcon/>,
		path: '/faq'
	}
]


export default function Layout({children}: {children: React.ReactNode}) {
	const [mobileOpen, setMobileOpen] = useState(false)
	const handleDrawerToggle = () => setMobileOpen(!mobileOpen)

	const drawer = (
		<div>
			<CssBaseline/>
			<Toolbar sx={{display: {xs: 'block', md: 'none'}}}/>
			<List disablePadding sx={{backgroundColor: theme => theme.palette.background.default}}>
				{AsideLinks.map((item, index) => (
					<ListItem
						button
						key={index}
						sx={{
							'&: hover': {
								borderRadius: '8px',
								color: theme => theme.palette.primary.main
							}
						}}
					>
						<ListItemIcon>
							{item.icon}
						</ListItemIcon>
						<ListItemText primary={item.text}/>
					</ListItem>
				))}
			</List>
		</div>
	)

	return (
		<>
			<Header onDrawerToggle={handleDrawerToggle}/>

			<Container maxWidth='lg'>
				<Grid container spacing={3}>

					<Drawer
						variant="temporary"
						open={mobileOpen}
						onClose={handleDrawerToggle}
						ModalProps={{keepMounted: true}}
						sx={{
							display: {sm: 'block', md: 'none'},
							'& .MuiDrawer-paper': {boxSizing: 'border-box', width: MOBILE_DRAWER_WIDTH},
						}}
					>
						{drawer}
					</Drawer>

					<Grid item sx={{display: {xs: 'none', md: 'block'}}} md={3} component='aside'>
						<Box sx={{mt: `${HEADER_HEIGHT}px`, pt: 2}}>
							<Drawer
								variant="persistent"
								open
								sx={{
									display: {xs: 'none', sm: 'block'},
									'& .MuiDrawer-paper': {
										boxSizing: 'border-box',
										border: 'none',
										position: 'static'
									},
								}}
							>
								{drawer}
							</Drawer>
						</Box>
					</Grid>


					<Grid item xs={12} md={9} component='main'>
						<Box sx={{mt: `${HEADER_HEIGHT}px`, pt: 2,}}>
							{children}
						</Box>
					</Grid>

				</Grid>
			</Container>
		</>

	)
}
