import {
  Typography,
} from '@material-ui/core';

import AdditionalInfo from '../AdditionalInfo';
import Avatar from '../Avatar';
import Links from '../Links';

export default function William() {
  return (
    <>
      <Avatar>W</Avatar>
      <Typography variant="h5">William Jackson</Typography>
      <Typography variant="subtitle1">Software Engineer</Typography>
      <Typography variant="subtitle2">Chicago, IL</Typography>
      <Links linkedIn="https://www.linkedin.com/in/william-jackson-62514b5/" email="williampj@gmail.com" />
      <AdditionalInfo interests="Back-end development, security, algorithms, infrastructure, DevOps" />
    </>
  );
}
