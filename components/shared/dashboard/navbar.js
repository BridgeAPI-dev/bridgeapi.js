import React, {
  useState, useEffect, useRef,
} from 'react';
import Link from 'next/link';
import {
  AppBar, Toolbar, Typography, IconButton, MenuItem, Menu, makeStyles,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { FaPlus } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '70px',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  appbar: {
    alignItems: 'center',
  },
  toolbar: {
    minHeight: 46,
    flexGrow: 1,
  },
  menuItemLink: {
    textDecoration: 'none',

    margin: 'auto',
    '&:visited': {
      textDecoration: 'none',
    },
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [width, setWidth] = useState(null);
  const open = Boolean(anchorEl);

  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    } else {
      console.log('Ref not found');
    }
  }, [ref.current]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <Link href="/editor">
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <FaPlus />
            </IconButton>
          </Link>

          <Typography variant="h6" ref={ref}>
            <Link href="/dashboard">
              <a className={classes.menuItemLink} style={{ color: 'white' }}>Dashboard</a>
            </Link>
          </Typography>

          <Typography
            variant="h6"
            className={classes.title}
            style={{
              position: 'relative', display: 'flex', alignItems: 'center', right: (width / 2),
            }}
          >
            Bridges
          </Typography>

          <div>
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
                    <a className={classes.menuItemLink}>Profile</a>
                  </Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link href="/users/account">
                  <Typography variant="subtitle1">
                    <a className={classes.menuItemLink}>Log Out</a>
                  </Typography>
                </Link>
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
