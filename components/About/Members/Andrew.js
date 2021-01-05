import {
  Typography,
} from '@material-ui/core';

import Image from 'next/image';

import AdditionalInfo from '../AdditionalInfo';
import Avatar from '../Avatar';
import Links from '../Links';

export default function Andrew() {
  return (
    <>
      <Avatar>
        <Image layout="fill" src="/andrew.png" />
      </Avatar>
      <Typography variant="h5">Andrew Crotwell</Typography>
      <Typography variant="subtitle1">Software Engineer</Typography>
      <Typography variant="subtitle2">Asheville, NC</Typography>
      <Links
        linkedIn="https://www.linkedin.com/in/awcrotwell/"
        email="awcrotwell@gmail.com"
        website="https://awcrotwell.com"
      />
      <AdditionalInfo
        interests="React, Rails, AWS, Typescript, Distributed Systems, Serverless, Docker"
      />
    </>
  );
}
