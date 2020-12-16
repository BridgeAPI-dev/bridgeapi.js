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

export default function Angel() {
  const classes = useStyles();

  return (
    <>
      <Avatar className={classes.avatar}>A</Avatar>
      <Typography variant="h5">Angel Ruiz-Bates</Typography>
      <Typography variant="subtitle1">Software Engineer</Typography>
      <Typography variant="subtitle2">Rincón, PR</Typography>
      <Links linkedIn="https://www.linkedin.com/in/angel-ruiz-bates-1b68a2142/" email="angelbates5@yahoo.com" />
      <AdditionalInfo interests="Full-stack development, decentralized systems, containerization, security, algorithms." />
    </>
  );
}
