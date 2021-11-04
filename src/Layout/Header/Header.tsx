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

type Props = {
	onDrawerToggle: React.MouseEventHandler
}

const Search = styled('div')(({theme}) => ({
	position: 'relative',
	border: `1px solid ${theme.palette.grey['400']}`,
	borderRadius: theme.shape.borderRadius,
	marginRight: theme.spacing(2),
	marginLeft: 0,
	height: 40,
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
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		width: '100%',
		height: 'auto',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}))


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
							<Button variant='contained' color='error'>DEVS 🔥</Button>
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
					<Box sx={{display: 'flex', alignItems: 'stretch', height: '40px', ml: 1}}>
						<SearchIconButton onClick={() => console.log('searchBtn')}/>
						{isAuthenticated &&
							<>
								<CreatePostBtn/>
								<CreatePostBtnMobile/>
								<AvatarBtn onClick={handleProfileMenuOpen} menuId={menuId}/>
								<AvatarMenu
									anchorEl={anchorEl}
									isMenuOpen={isMenuOpen}
									onClose={handleMenuClose}
									menuId={menuId}
								/>
							</>
						}
						{!isAuthenticated &&
							<Link to='/signin'>
								<Button variant='contained' sx={{ml: {xs: 1}}}>Sign In</Button>
							</Link>
						}

					</Box>

				</Toolbar>
			</Container>
		</AppBar>
	)
}
