import {
  Container,
  ListItem as MUIListItem,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  active: {
    backgroundColor: theme.palette.lightGrey.main,
  },
}));

function ListItem({
  completed, completedAt, statusCode, eventId,
}) {
  const classes = useStyles();
  const router = useRouter();
  const active = Number(router.asPath.split('/')[2]) === Number(eventId);
  const timestamp = new Date(completedAt).toDateString();
  const message = completed ? `${timestamp}` : 'Ongoing';

  function color(code) {
    if (code <= 299) {
      return '#5cb660';
    } if (code <= 399) {
      return 'yellow';
    }
    return '#f55347';
  }

  return (
    <MUIListItem divider className={active ? classes.active : ''}>

      <ListItemText>
        <Typography
          style={{ fontSize: '0.75em' }}
          noWrap
          align="center"
        >
          <Link href={`/events/${eventId}`}>
            <Container style={{ cursor: 'pointer' }}>
              {message}
              {statusCode && (
                <>
                  {' '}
                  -
                  {' '}
                  <Typography
                    display="inline"
                    style={{
                      color: color(statusCode),
                      fontSize: '1em',
                      fontWeight: '600',
                    }}
                  >
                    {statusCode}
                  </Typography>
                </>
              )}
            </Container>
          </Link>
        </Typography>
      </ListItemText>

    </MUIListItem>
  );
}

export default ListItem;

ListItem.propTypes = {
  statusCode: PropTypes.number.isRequired,
  completedAt: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  eventId: PropTypes.number.isRequired,
};
