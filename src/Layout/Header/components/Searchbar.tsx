import {InputBase, styled} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import React from 'react'

const Search = styled('div')(({theme}) => ({
	position: 'relative',
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
	padding: theme.spacing(0,1,0,1),
	height: 40,
	position: 'absolute',
	zIndex: 1,
	right: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',

}))

const StyledInputBase = styled(InputBase)(({theme}) => ({
	'& .MuiInputBase-input': {
		height: 40,
		boxSizing: 'border-box',
		transition: theme.transitions.create('all'),
		border: `1px solid ${theme.palette.grey['400']}`,
		borderRadius: theme.shape.borderRadius,
		paddingLeft: theme.spacing(1),
		width: '100%',
		'&::placeholder': {
			transition: theme.transitions.create('all'),
			color: 'inherit',
		},
		'&:focus': {
			boxShadow: `0 0 0 1px ${theme.palette.primary.main}`,
			'&::placeholder': {
				color: 'transparent',
			},
		},
	}
}))

export default function Searchbar() {

  return (
		<Search>
			<SearchIconWrapper>
				<IconButton size='small'>
					<SearchIcon sx={{color: theme => theme.palette.grey['400'], '&.MuiSvgIcon-root': {width: '1.1em'}}}/>
				</IconButton>
			</SearchIconWrapper>
			<StyledInputBase
				placeholder="Search…"
				inputProps={{'aria-label': 'search'}}
				onChange={(e) => console.log(e.target.value)}
			/>
		</Search>
  )
}