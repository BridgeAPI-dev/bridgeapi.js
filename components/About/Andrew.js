import {
  Avatar, makeStyles, Typography,
} from '@material-ui/core';

import AdditionalInfo from './AdditionalInfo';
import Links from './Links';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: '100%',
    marginBottom: theme.spacing(4),
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
  icon: {
    fontSize: '3rem',
    padding: '8px',
    margin: theme.spacing(4, 0),
    borderRadius: '100%',
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
  },
}));

export default function Andrew() {
  const classes = useStyles();

  return (
    <>
      <Avatar className={classes.avatar}>A</Avatar>
      <Typography variant="h5">Andrew Crotwell</Typography>
      <Typography variant="subtitle1">Software Engineer</Typography>
      <Links linkedIn="https://www.linkedin.com/in/andrewcrotwell/" email="Andrewcrotwell910@gmail.com" />
      <AdditionalInfo />
    </>
  );
}
