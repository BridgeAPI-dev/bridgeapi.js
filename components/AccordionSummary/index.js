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
  title, subtitle, icon, tooltip = false, tooltipMessage, id,
}) {
  const classes = useStyles();

  return (
    <MUIAccordionSummary
      expandIcon={icon}
      className={classes.root}
      id={id}
    >
      <Grid container>
        <Grid item align="left">
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

AccordionSummary.defaultProps = {
  tooltip: false,
  tooltipMessage: '',
  id: '',
};

AccordionSummary.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  tooltip: PropTypes.bool,
  tooltipMessage: PropTypes.string,
  id: PropTypes.string,
};
