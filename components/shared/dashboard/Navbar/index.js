import React, {
  useState, useEffect, useRef,
} from 'react';
import Link from 'next/link';
import {
  AppBar, Toolbar, Typography, IconButton, makeStyles,
} from '@material-ui/core';
import { FaPlus, FaArrowDown } from 'react-icons/fa';

import { AccountCircle } from '@material-ui/icons';
import Menu from './Menu';

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
  menuRoot: {
    flexGrow: 1,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  iconButton: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    padding: '0 !important',
  },
  icon: {
    marginLeft: '5px',
    top: '3px',
    position: 'relative',
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const [bridges, setBridges] = useState([]);
  const [width, setWidth] = useState(null);

  const bridgeMenuTransforms = {
    anchor: {
      vertical: 'bottom',
      horizontal: 'center',
    },
    transform: {
      vertical: 'top',
      horizontal: 'center',
    },
  };

  const menuUseEffect = () => {
    const getBridges = async () => {
      // await axios.get('http://localhost:3001/bridges')
      //   .then((res) => {
      //     setBridges(res.data);
      //   });
      setBridges([
        'Bridge 1',
        'Bridge 2',
        'Bridge 3',
      ]);
    };

    getBridges();
  };

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
          <Link href="/editor/new">
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

          <Menu
            icon={<FaArrowDown size={15} className={classes.icon} />}
            text="Bridges"
            width={width}
            classes={{
              root: classes.menuRoot,
              iconButton: classes.iconButton,
            }}
            transforms={bridgeMenuTransforms}
            useEff={menuUseEffect}
          >
            {bridges.map((bridge) => (
              <Link href="/editor/32" id={`bridge-${bridge}`} key={`bridge-${bridge}`}>
                <Typography variant="subtitle1" className="menu-link-item">
                  {bridge}
                </Typography>
              </Link>
            ))}
          </Menu>

          <Menu icon={<AccountCircle />}>
            <Link href="/users/account" id="menu-item-profile">
              <Typography variant="subtitle1" className="menu-link-item">
                Profile
              </Typography>
            </Link>
            <Link href="/users/login" id="menu-item-logout">
              <Typography variant="subtitle1" className="menu-link-item">
                Log Out
              </Typography>
            </Link>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
}
