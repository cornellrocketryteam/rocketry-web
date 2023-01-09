import { Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useEffect } from 'react';
import Head from '../components/layout/Head';

export default function Countdown() {

  useEffect(() => window.location.href = "https://countdown.cornellrocketryteam.com")

  return (
    <div>
      <Head title='Countdown' />
      <div>
        <Typography variant='h1' align='center'>
          Cornell Rocketry Team
        </Typography>
      </div>
    </div>
  );
}
