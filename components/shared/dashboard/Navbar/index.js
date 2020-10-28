import React, {
  useState, useEffect, useRef,
} from 'react';
import Link from 'next/link';
import {
  AppBar, Toolbar, Typography, IconButton, makeStyles,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { FaPlus, FaArrowDown } from 'react-icons/fa';

import AccountMenu from './AccountMenu';
import BridgesMenu from './BridgesMenu';

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
  bridgesMenu: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  bridgesIcon: {
    marginLeft: '5px',
    top: '3px',
    position: 'relative',
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [width, setWidth] = useState(null);

  const [accountAnchorEl, setAccountAnchorEl] = useState(null);
  const AccountMenuOpen = Boolean(accountAnchorEl);

  const handleAccountMenu = (event) => {
    setAccountAnchorEl(event.currentTarget);
  };

  const handleAccountClose = () => {
    setAccountAnchorEl(null);
  };

  const [bridgesAnchorEl, setBridgesAnchorEl] = useState(null);
  const BridgesMenuOpen = Boolean(bridgesAnchorEl);

  const handleBridgesMenu = (event) => {
    setBridgesAnchorEl(event.currentTarget);
  };

  const handleBridgesClose = () => {
    setBridgesAnchorEl(null);
  };

  // Determine the width of the 'Dashboard' link &
  // move the brigdes dropdown to center of the screen
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    } else {
      console.log('Ref not found');
    }
  }, [ref.current]);

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
              <a className="menu-link-item" style={{ color: 'white' }}>Dashboard</a>
            </Link>
          </Typography>

          <div className={classes.title}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleBridgesMenu}
              color="inherit"
              className={classes.bridgesMenu}
              style={{ right: (width / 2) }}
            >
              Bridges
              <FaArrowDown size={15} className={classes.bridgesIcon} />
            </IconButton>
            <BridgesMenu
              anchorEl={bridgesAnchorEl}
              handleClose={handleBridgesClose}
              open={BridgesMenuOpen}
            />
          </div>

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleAccountMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <AccountMenu
              anchorEl={accountAnchorEl}
              handleClose={handleAccountClose}
              open={AccountMenuOpen}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
