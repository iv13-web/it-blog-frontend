import {Menu, MenuItem} from '@mui/material'
import React from 'react'
import {useAppDispatch} from '../../../store/store'
import {logout} from '../../../store/slices/AuthSlice'
import {useLogoutMutation} from '../../../store/api/authEndpoints'

type Props = {
  anchorEl: HTMLElement | null,
  isMenuOpen: boolean,
  onClose: any
  menuId: string
}

export default function AvatarMenu({anchorEl, isMenuOpen, onClose, menuId}: Props) {
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
      onClose={onClose}
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
        onClick={logout}
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
