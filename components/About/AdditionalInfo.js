import PropTypes from 'prop-types';
import {
  makeStyles, Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  triangle: {
    margin: '0 auto',
    width: 0,
    height: 0,
    borderLeft: '25px solid transparent',
    borderRight: '25px solid transparent',
    borderBottom: `25px solid ${theme.palette.secondary.main}`,
  },
  box: {
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    padding: theme.spacing(3, 2),
    borderRadius: theme.spacing(1),
  },
  header: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontSize: '1.2rem',
    marginBottom: theme.spacing(2),
  },
  interests: {
    color: theme.palette.primary.main,
    fontSize: '1.25rem',
  },
}));

export default function AdditionalInfo({ interests }) {
  const classes = useStyles();

  return (
    <>
      <div className={classes.triangle} />
      <div className={classes.box}>
        <Typography variant="h6" className={classes.header}>Area of interest:</Typography>
        <Typography variant="body1" className={classes.interests}>{interests}</Typography>
      </div>
    </>
  );
}

AdditionalInfo.propTypes = {
  interests: PropTypes.string.isRequired,
};
