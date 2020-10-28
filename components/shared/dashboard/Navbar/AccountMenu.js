import { useState } from 'react';
import Link from 'next/link';
import {
  Typography, MenuItem, Menu, IconButton,
} from '@material-ui/core';

import { AccountCircle } from '@material-ui/icons';

function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link href="/users/account">
            <Typography variant="subtitle1">
              <a className="menu-link-item">Profile</a>
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          {/* TODO: This should remove session cookies too */}
          <Link href="/users/login">
            <Typography variant="subtitle1">
              <a className="menu-link-item">Log Out</a>
            </Typography>
          </Link>
        </MenuItem>
      </Menu>
    </>
  );
}

export default AccountMenu;
