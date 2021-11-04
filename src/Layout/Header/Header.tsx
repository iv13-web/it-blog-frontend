import {Button, Container, InputBase, styled} from '@mui/material'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import SearchIcon from '@mui/icons-material/Search'
import Box from '@mui/material/Box'
import React from 'react'
import SearchIconButton from '../../UI/SearchIcon'
import CreatePostBtn from '../../UI/CreatePostBtn'
import CreatePostBtnMobile from '../../UI/CreatePostBtnMobile'
import AvatarBtn from '../../UI/AvatarBtn'
import AvatarMenu from './components/AvatarMenu'
import {useAppSelector} from '../../store/store'
import {Link} from 'react-router-dom'
import Searchbar from './components/Searchbar'

type Props = {
	onDrawerToggle?: React.MouseEventHandler
}

export default function Header({onDrawerToggle}: Props) {
	const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated)
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const menuId = 'primary-search-account-menu'
	const isMenuOpen = Boolean(anchorEl)
	const handleMenuClose = () => setAnchorEl(null)
	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	return (
		<AppBar>
			<Container maxWidth='lg'>
				<Toolbar sx={{
					justifyContent: 'space-between',
					'&.MuiToolbar-root': {p: 0, minHeight: 56}
				}}>
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
							<Link to='/'>
								<Button variant='contained' color='error' sx={{height: '100%'}}>
									DEVS 🔥
								</Button>
							</Link>
							<Searchbar/>
						</Box>
					</Box>

					<Box sx={{
						display: 'flex',
						alignItems: 'stretch',
						height: '40px',
						ml: 1
					}}>
						<SearchIconButton
							hideMobile
							onClick={() => console.log('searchBtn')}
						/>
						{isAuthenticated ? (
							<>
								<CreatePostBtn/>
								<CreatePostBtnMobile/>
								<AvatarBtn onClick={handleProfileMenuOpen} menuId={menuId}/>
								<AvatarMenu
									anchorEl={anchorEl}
									isMenuOpen={isMenuOpen}
									onMenuClose={handleMenuClose}
									menuId={menuId}
								/>
							</>
						) : (
							<Link to='/signin'>
								<Button variant='contained' sx={{ml: {xs: 1}}}>Sign In</Button>
							</Link>
						)}

					</Box>

				</Toolbar>
			</Container>
		</AppBar>
	)
}
