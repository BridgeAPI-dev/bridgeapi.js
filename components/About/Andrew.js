import { Avatar, Link, makeStyles } from '@material-ui/core';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: '100%',
    height: '30vh',
    marginBottom: theme.spacing(2),
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
      <Link href="https://www.linkedin.com/in/andrewcrotwell/" className={classes.link}>
        <LinkedInIcon fontSize="large" />
      </Link>
      <Link href="mailto:Andrewcrotwell910@gmail.com" className={classes.link}>
        <EmailIcon fontSize="large" />
      </Link>
    </>
  );
}
