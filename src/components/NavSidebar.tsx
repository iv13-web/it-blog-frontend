import {Grid} from '@mui/material'
import Box from '@mui/material/Box'
import {HEADER_HEIGHT} from '../Layout/constants'
import Drawer from '@mui/material/Drawer'
import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded'
import TagRoundedIcon from '@mui/icons-material/TagRounded'
import EmojiObjectsRoundedIcon from '@mui/icons-material/EmojiObjectsRounded'

const NavLinks = [
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

export const navMenu = (
	<>
		<Toolbar sx={{display: {xs: 'block', md: 'none'}}}/>
		<List
			disablePadding
			sx={{backgroundColor: theme => theme.palette.background.default}}
		>
			{NavLinks.map((item, index) => (
				<ListItem
					button
					disableTouchRipple
					key={index}
					sx={{
						minWidth: 200,
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
	</>
)

export default function NavSidebar() {

	return (
		<Grid
			item
			sx={{display: {xs: 'none', md: 'block'},}}
			component='aside'
		>
			<Box sx={{mt:`${HEADER_HEIGHT}px`, pt: 1}}>
				<Drawer
					variant="persistent"
					open
					sx={{
						display: {xs: 'none', sm: 'block'},
						'& .MuiDrawer-paper': {
							boxSizing: 'border-box',
							border: 'none',
							position: 'static',
							boxShadow: 'none'
						},
					}}
				>
					{navMenu}
				</Drawer>
			</Box>
		</Grid>
	)
}