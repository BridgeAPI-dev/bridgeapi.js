import {
  Avatar, Link, makeStyles,
} from '@material-ui/core';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
// import PublicIcon from '@material-ui/icons/Public';
import EmailIcon from '@material-ui/icons/Email';

import AdditionalInfo from './AdditionalInfo';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: '100%',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('xs')]: {
      height: '12vh',
    },
    [theme.breakpoints.up('md')]: {
      height: '22vh',
    },
    [theme.breakpoints.up('lg')]: {
      height: '30vh',
    },
  },
  link: {
    margin: theme.spacing(0, 2),
  },
  triangle: {
    margin: '0 auto',
    width: 0,
    height: 0,
    borderLeft: '25px solid transparent',
    borderRight: '25px solid transparent',
    borderBottom: '25px solid #e8e8e8',
  },
  box: {
    width: '100%',
    height: '10vh',
    backgroundColor: '#e8e8e8',
    paddingTop: theme.spacing(3),
    borderRadius: theme.spacing(1),
  },
}));

export default function Andrew() {
  const classes = useStyles();

  return (
    <>
      <Avatar className={classes.avatar}>A</Avatar>
      <Link href="https://www.linkedin.com/in/angel-ruiz-bates-1b68a2142/" className={classes.link}>
        <LinkedInIcon fontSize="large" />
      </Link>
      <Link href="mailto:angelbates5@yahoo.com" className={classes.link}>
        <EmailIcon fontSize="large" />
      </Link>
      <AdditionalInfo />
    </>
  );
}
