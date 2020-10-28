import Link from 'next/link';
import {
  Typography, MenuItem, Menu,
} from '@material-ui/core';

function AccountMenu({ anchorEl, open, handleClose }) {
  return (
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
        <Link href="/users/account">
          <Typography variant="subtitle1">
            <a className="menu-link-item">Log Out</a>
          </Typography>
        </Link>
      </MenuItem>
    </Menu>
  );
}

export default AccountMenu;
