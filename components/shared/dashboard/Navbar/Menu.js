import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  MenuItem, Menu as MUIMenu, IconButton,
} from '@material-ui/core';

function Menu({
  children,
  icon,
  width,
  text,
  classes,
  transforms,
  useEff,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(useEff, []);

  return (
    <div className={classes.root}>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        style={{ right: (width / 2), padding: '0 !important' }}
        className={classes.iconButton}
      >
        {text}
        {icon}
      </IconButton>
      <MUIMenu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={transforms.anchor}
        keepMounted
        transformOrigin={transforms.transform}
        open={open}
        onClose={handleClose}
        getContentAnchorEl={null}
      >
        {children
          && React.Children.map(children, (child) => (
            <MenuItem onClick={handleClose} key={`child-${child.props.id}`}>
              {React.cloneElement(child)}
            </MenuItem>
          ))}
      </MUIMenu>
    </div>
  );
}

export default Menu;

Menu.propTypes = {
  width: PropTypes.number,
  text: PropTypes.string,
  classes: PropTypes.shape({
    root: PropTypes.string,
    iconButton: PropTypes.string,
  }),
  transforms: PropTypes.shape({
    anchor: PropTypes.shape({
      vertical: PropTypes.string,
      horizontal: PropTypes.string,
    }),
    transform: PropTypes.shape({
      vertical: PropTypes.string,
      horizontal: PropTypes.string,
    }),
  }),
  useEff: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Menu.defaultProps = {
  width: 0,
  text: '',
  classes: {
    root: undefined,
    iconButton: undefined,
  },
  transforms: {
    anchor: {
      vertical: 'top',
      horizontal: 'right',
    },
    transform: {
      vertical: 'top',
      horizontal: 'right',
    },
  },
  useEff: () => {},
};
