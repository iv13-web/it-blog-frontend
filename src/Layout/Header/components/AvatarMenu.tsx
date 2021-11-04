import {Menu, MenuItem} from '@mui/material'
import React from 'react'
import {useLogoutMutation} from '../../../store/api/authEndpoints'

type Props = {
  anchorEl: HTMLElement | null,
  isMenuOpen: boolean,
  onMenuClose: any
  menuId: string
}

export default function AvatarMenu({anchorEl, isMenuOpen, onMenuClose, menuId}: Props) {
  const [logout] = useLogoutMutation()

  return (
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
      onClose={onMenuClose}
      sx={{
        '& .MuiMenu-list': {
          p: 0,
          width: {
            xs: 'calc(100vw - 32px)',
            sm: 320
          }
        }
      }}
    >
      <MenuItem
        onClick={() => {
          onMenuClose()
          logout(null)
        }}
        sx={{
          m: 1,
          width: 'auto',
          borderRadius: '4px'
        }}
      >
        Sign Out
      </MenuItem>
    </Menu>
  )
}
