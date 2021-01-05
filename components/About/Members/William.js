import {
  Typography,
} from '@material-ui/core';

import Image from 'next/image';

import AdditionalInfo from '../AdditionalInfo';
import Avatar from '../Avatar';
import Links from '../Links';

export default function William() {
  return (
    <>
      <Avatar>
        <Image layout="fill" src="/william.jpg" />
      </Avatar>
      <Typography variant="h5">William Jackson</Typography>
      <Typography variant="subtitle1">Software Engineer</Typography>
      <Typography variant="subtitle2">Chicago, IL</Typography>
      <Links
        linkedIn="https://www.linkedin.com/in/william-jackson-62514b5/"
        email="williampj@gmail.com"
        website="https://williampj.github.io/"
      />
      <AdditionalInfo interests="Back-end development, decentralized systems, security, algorithms, containerization" />
    </>
  );
}
