import { Avatar, Link, makeStyles } from '@material-ui/core';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
// import PublicIcon from '@material-ui/icons/Public';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: '100%',
    marginBottom: theme.spacing(2),
    [theme.breakpoints.up('xs')]: {
      height: '12vh',
    },
    [theme.breakpoints.up('md')]: {
      height: '25vh',
    },
    [theme.breakpoints.up('lg')]: {
      height: '30vh',
    },
  },
  link: {
    margin: theme.spacing(0, 2),
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
    </>
  );
}
