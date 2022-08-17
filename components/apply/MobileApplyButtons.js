import React from 'react';
import * as dayjs from 'dayjs';

import { makeStyles, Typography, Grid, Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    textAlign: 'center',
  },
  mobileButton: {
    margin: 5,
  },
}));

export default function MobileApplyButtons({ freshmanLink, nonFreshmanLink }) {
  const freshmanDueDate = dayjs([2022, 8, 29]);
  const nonFreshmanDueDate = dayjs([2022, 8, 1]);
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
          DUE {freshmanDueDate.format('M/D')}
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
          DUE {nonFreshmanDueDate.format('M/D')}
        </Typography>
      </Grid>
    </Grid>
  );
}
