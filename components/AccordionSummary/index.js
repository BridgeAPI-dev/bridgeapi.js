import {
  AccordionSummary as MUIAccordionSummary, Grid, Typography, makeStyles, Tooltip, Button,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { FaQuestionCircle } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
  root: {
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
  },
  heading: {
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#a6a6a4',
  },
  'ml-2': {
    marginLeft: theme.spacing(2),
  },
}));

function AccordionSummary({
  title, subtitle, icon, tooltip = false, tooltipMessage,
}) {
  const classes = useStyles();

  return (
    <MUIAccordionSummary
      expandIcon={icon}
      className={classes.root}
    >
      <Grid container>
        <Grid item direction="column" align="left">
          <Typography className={classes.heading}>
            {title}
          </Typography>
          <Typography variant="subtitle1" className={classes.subtitle}>
            {subtitle}
          </Typography>
        </Grid>

        {tooltip
          && (
          <Grid item alignItems="center" style={{ display: 'flex' }}>
            <Tooltip title={tooltipMessage} arrow>
              <Button>
                <FaQuestionCircle />
              </Button>
            </Tooltip>
          </Grid>
          )}

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
  // TODO
  tooltip: PropTypes.bool.isRequired,
  tooltipMessage: PropTypes.string.isRequired,
};
