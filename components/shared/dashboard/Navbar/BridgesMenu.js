import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Typography, MenuItem, Menu,
} from '@material-ui/core';

function BridgesMenu({ anchorEl, open, handleClose }) {
  const [bridges, setBridges] = useState([]);

  useEffect(() => {
    const getBridges = async () => {
      // await axios.get('http://localhost:3001/bridges')
      //   .then((res) => {
      //     setBridges(res.data);
      //   });
      setBridges([
        'Bridge 1',
        'Bridges 2',
        'Bridge 3',
      ]);
    };

    getBridges();
  }, []);

  return (
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
  );
}

export default BridgesMenu;
