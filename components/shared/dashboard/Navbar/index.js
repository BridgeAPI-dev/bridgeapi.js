import React, {
  useState, useEffect, useRef,
} from 'react';
import Link from 'next/link';
import {
  AppBar, Toolbar, Typography, IconButton, makeStyles,
} from '@material-ui/core';
import { FaPlus } from 'react-icons/fa';

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
  appbar: {
    alignItems: 'center',
  },
  toolbar: {
    minHeight: 46,
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [width, setWidth] = useState(0);

  // Determine the width of the 'Dashboard' link &
  // move the brigdes dropdown to center of the screen
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.offsetWidth);
    } else {
      throw new Error('Ref not found');
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

          <Typography variant="h6" ref={ref} className="menu-link-item" style={{ color: 'white' }}>
            <Link href="/dashboard">
              Dashboard
            </Link>
          </Typography>

          <BridgesMenu width={width} />

          <AccountMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
}
