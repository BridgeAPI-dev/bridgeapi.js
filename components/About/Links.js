import PropTypes from 'prop-types';
import { Link, makeStyles } from '@material-ui/core';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import PublicIcon from '@material-ui/icons/Public';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles((theme) => ({
  link: {
    margin: theme.spacing(0, 1),
  },
  icon: {
    fontSize: '3rem',
    padding: '8px',
    margin: theme.spacing(4, 0),
    borderRadius: '100%',
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

export default function Links({ linkedIn, website, email }) {
  const classes = useStyles();

  return (
    <>
      <Link href={linkedIn} className={classes.link}>
        <LinkedInIcon className={classes.icon} />
      </Link>
      {website && (
        <Link href={website} className={classes.link}>
          <PublicIcon className={classes.icon} />
        </Link>
      )}
      <Link href={`mailto:${email}`} className={classes.link}>
        <EmailIcon className={classes.icon} />
      </Link>
    </>
  );
}

Links.propTypes = {
  linkedIn: PropTypes.string.isRequired,
  website: PropTypes.string,
  email: PropTypes.string.isRequired,
};

Links.defaultProps = {
  website: null,
};
