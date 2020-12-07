import {
  ListItem as MUIListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Link from 'next/link';

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
        <Typography
          style={{ fontSize: '0.75em' }}
          noWrap
          align="center"
        >
          <Link href={`/events/${eventId}`}>
            {message}
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
