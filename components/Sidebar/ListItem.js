import {
  ListItem as MUIListItem,
  ListItemText,
  Typography,
  Link,
} from '@material-ui/core';
import PropTypes from 'prop-types';

function ListItem({
  completed, completedAt, statusCode, eventId,
}) {
  const timestamp = new Date(completedAt).toDateString();
  let message = completed ? `${timestamp}` : 'Ongoing';
  if (statusCode) {
    message += ` - ${statusCode}`;
  }

  return (
    <MUIListItem divider>

      <ListItemText>
        <Link href={`/events/${eventId}`}>
          <Typography
            style={{ fontSize: '0.75em' }}
            noWrap
            align="center"
          >
            {message}
          </Typography>
        </Link>
      </ListItemText>

    </MUIListItem>
  );
}

export default ListItem;

ListItem.propTypes = {
  statusCode: PropTypes.number,
  completedAt: PropTypes.string,
  completed: PropTypes.bool.isRequired,
  eventId: PropTypes.number.isRequired,
};

ListItem.defaultProps = {
  statusCode: null,
  completedAt: null,
};
