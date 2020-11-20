import {
  ListItem as MUIListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';

function ListItem({
  completed, completedAt, statusCode,
}) {
  return (
    <MUIListItem divider>
      <ListItemText>
        <Typography
          style={{ fontSize: '0.75em' }}
          noWrap
          align="center"
        >
          {completed ? `${completedAt} - ${statusCode}` : 'Ongoing' }
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
};
