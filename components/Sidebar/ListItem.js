import {
  ListItem as MUIListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';

function ListItem({
  date, statusCode, timestamp, completed,
}) {
  return (
    <MUIListItem divider>
      <ListItemText>
        <Typography
          style={{ fontSize: '0.75em' }}
          noWrap
          align="center"
        >
          {completed ? `${timestamp} - ${date} ${statusCode}` : 'Ongoing' }
        </Typography>
      </ListItemText>
    </MUIListItem>
  );
}

export default ListItem;
