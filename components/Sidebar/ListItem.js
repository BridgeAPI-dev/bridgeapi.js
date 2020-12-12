import {
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
  let message = completed ? `${timestamp}` : 'Ongoing';
  if (statusCode) {
    message += ` - ${statusCode}`;
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
