import {
  Avatar, makeStyles, Typography,
} from '@material-ui/core';

import AdditionalInfo from './AdditionalInfo';
import Links from './Links';

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: '90%',
    marginBottom: theme.spacing(5),
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

export default function William() {
  const classes = useStyles();

  return (
    <>
      <Avatar className={classes.avatar}>W</Avatar>
      <Typography variant="h5">William Jackson</Typography>
      <Typography variant="subtitle1">Software Engineer</Typography>
      <Typography variant="subtitle2">Chicago, IL</Typography>
      <Links linkedIn="https://www.linkedin.com/in/william-jackson-62514b5/" email="williampj@gmail.com" />
      <AdditionalInfo interests="Back-end development, security, algorithms, infrastructure, DevOps" />
    </>
  );
}
