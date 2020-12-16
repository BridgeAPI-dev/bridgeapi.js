import {
  Avatar, makeStyles, Typography,
} from '@material-ui/core';

import AdditionalInfo from './AdditionalInfo';
import Links from './Links';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: '90%',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('xs')]: {
      height: '15vh',
    },
    [theme.breakpoints.up('md')]: {
      height: '22vh',
    },
    [theme.breakpoints.up('lg')]: {
      height: '30vh',
    },
  },
}));

export default function Andrew() {
  const classes = useStyles();

  return (
    <>
      <Avatar className={classes.avatar}>A</Avatar>
      <Typography variant="h5">Andrew Crotwell</Typography>
      <Typography variant="subtitle1">Software Engineer</Typography>
      <Typography variant="subtitle2">Asheville, NC</Typography>
      <Links linkedIn="https://www.linkedin.com/in/andrewcrotwell/" email="Andrewcrotwell910@gmail.com" />
      <AdditionalInfo />
    </>
  );
}
