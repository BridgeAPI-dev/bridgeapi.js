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
      <div className={classes.triangle} />
      <div className={classes.box}>
        <Typography variant="body2">Test</Typography>
      </div>
    </>
  );
}
