import React from 'react';
import * as dayjs from 'dayjs';

import { Typography, Grid, Button } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
  },
  mobileButton: {
    margin: 5,
  },
}));

export default function MobileApplyButtons({
  freshmanLink,
  nonFreshmanLink,
  freshmanDueDate,
  nonFreshmanDueDate,
}) {
  const classes = useStyles();

  return (
    <Grid
      container
      direction='row'
      justifyContent='space-evenly'
      alignItems='center'
      className={classes.root}
    >
      <Grid item xs>
        <Button
          variant='contained'
          color='secondary'
          className={classes.mobileButton}
          size='small'
          href={freshmanLink}
          target='_blank'
        >
          Freshman App
        </Button>
        <br />
        <Typography align='center' variant='caption'>
          DUE {freshmanDueDate.format('M/D @ hh:mm A')}
        </Typography>
      </Grid>
      <Grid item xs>
        <Button
          variant='contained'
          color='secondary'
          className={classes.mobileButton}
          size='small'
          href={nonFreshmanLink}
          target='_blank'
        >
          Non-freshman App
        </Button>
        <br />
        <Typography align='center' variant='caption'>
          DUE {nonFreshmanDueDate.format('M/D @ hh:mm A')}
        </Typography>
      </Grid>
    </Grid>
  );
}
