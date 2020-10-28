import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Typography, MenuItem, Menu, IconButton, makeStyles,
} from '@material-ui/core';

import { FaArrowDown } from 'react-icons/fa';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
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

function BridgesMenu({ width }) {
  const classes = useStyles();
  const [bridges, setBridges] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
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
  }, []);

  return (
    <div className={classes.root}>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        className={classes.bridgesMenu}
        style={{ right: (width / 2) }}
      >
        Bridges
        <FaArrowDown size={15} className={classes.bridgesIcon} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        keepMounted
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        onClose={handleClose}
      >
        {bridges.map((bridge) => (
          <MenuItem onClick={handleClose}>
            <Link href="/users/account">
              <Typography variant="subtitle1">
                <a className="menu-link-item">{bridge}</a>
              </Typography>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default BridgesMenu;
