import {
  Typography,
} from '@material-ui/core';

import AdditionalInfo from '../AdditionalInfo';
import Avatar from '../Avatar';
import Links from '../Links';

export default function Andrew() {
  return (
    <>
      <Avatar>A</Avatar>
      <Typography variant="h5">Andrew Crotwell</Typography>
      <Typography variant="subtitle1">Software Engineer</Typography>
      <Typography variant="subtitle2">Asheville, NC</Typography>
      <Links linkedIn="https://www.linkedin.com/in/andrewcrotwell/" email="Andrewcrotwell910@gmail.com" />
      <AdditionalInfo />
    </>
  );
}
