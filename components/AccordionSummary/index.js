import {
  AccordionSummary as MUIAccordionSummary, Grid, Typography, makeStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
  },
  heading: {
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#a6a6a4',
  },
}));

function AccordionSummary({ title, subtitle, icon }) {
  const classes = useStyles();

  return (
    <MUIAccordionSummary
      expandIcon={icon}
      className={classes.root}
    >
      <Grid container direction="column" align="left">
        <Typography className={classes.heading}>{title}</Typography>
        <Typography variant="subtitle1" className={classes.subtitle}>{subtitle}</Typography>
      </Grid>
    </MUIAccordionSummary>
  );
}

export default AccordionSummary;

AccordionSummary.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
