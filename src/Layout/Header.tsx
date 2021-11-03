import {alpha, Avatar, Badge, Button, Container, InputBase, Menu, MenuItem, styled} from '@mui/material'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import SearchIcon from '@mui/icons-material/Search'
import {AccountCircle} from '@mui/icons-material'
import Box from '@mui/material/Box'
import React from 'react'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'

type Props = {
	onDrawerToggle: any,
}


const Search = styled('div')(({theme}) => ({
	position: 'relative',
	border: `1px solid ${theme.palette.grey['400']}`,
	borderRadius: theme.shape.borderRadius,
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	display: 'none',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(2),
		width: 'auto',
		display: 'block'
	},
}))

const SearchIconWrapper = styled('div')(({theme}) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({theme}) => ({
	'& ::placeholder': {
		transition: 'color .3s ease'
	},
	'& :focus::placeholder': {
		color: theme.palette.common.white
	},
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}))


export default function Header({onDrawerToggle}: Props) {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const isMenuOpen = Boolean(anchorEl)

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleMenuClose = () => setAnchorEl(null)

	const menuId = 'primary-search-account-menu'

	return (
		<AppBar>
			<Container maxWidth='lg'>
				<Toolbar sx={{'&.MuiToolbar-root': {p: 0, minHeight: 56}}}>
					<Box sx={{display: 'flex', alignItems: 'stretch', height: '40px'}}>
					<IconButton
						aria-label="open drawer"
						edge="start"
						onClick={onDrawerToggle}
						sx={{mr: 1, display: {md: 'none'}}}
					>
						<MenuIcon/>
					</IconButton>

					<Box sx={{display: 'flex', alignItems: 'stretch'}}>
						<Button variant='contained' color='secondary'>DEVS</Button>

						<Search>
							<SearchIconWrapper>
								<SearchIcon sx={{color: theme => theme.palette.grey['400']}}/>
							</SearchIconWrapper>
							<StyledInputBase
								placeholder="Search…"
								inputProps={{'aria-label': 'search'}}
								onChange={(e) => console.log(e.target.value)}
							/>
						</Search>
					</Box>
					</Box>

					<Box sx={{flexGrow: 1}}/>

					<Box sx={{display: 'flex', alignItems: 'stretch', maxHeight: '40px'}}>
						<Button variant='contained' color='secondary' sx={{flexShrink: 0}}>
							Create Post
						</Button>
						<IconButton
							size="small"
							edge="end"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							onClick={handleProfileMenuOpen}
							color="inherit"

						>
							<Avatar src='https://lh3.googleusercontent.com/ogw/ADea4I4orE6-p_raZ-qk1h1nN9CVUT6sZmUiwQxf4xHN=s32-c-mo'/>
						</IconButton>
					</Box>


					<Menu
						anchorEl={anchorEl}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
						id={menuId}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						open={isMenuOpen}
						onClose={handleMenuClose}
					>
						<MenuItem onClick={handleMenuClose}>Profile</MenuItem>
						<MenuItem onClick={handleMenuClose}>My account</MenuItem>
					</Menu>

				</Toolbar>
			</Container>
		</AppBar>
	)
}
