import PropTypes from 'prop-types';
import { makeStyles, Avatar as MUIAvatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: '15vh',
    height: '15vh',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('md')]: {
      height: '22vh',
      width: '22vh',
    },
    [theme.breakpoints.up('lg')]: {
      height: '30vh',
      width: '30vh',
    },
  },
}));

export default function Avatar({ children }) {
  const classes = useStyles();

  return (
    <MUIAvatar className={classes.avatar}>{children}</MUIAvatar>
  );
}

Avatar.propTypes = {
  // source: PropTypes.string,
  children: PropTypes.string,
};

Avatar.defaultProps = {
  // source: null,
  children: null,
};