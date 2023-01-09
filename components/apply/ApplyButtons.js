import React from 'react';
import * as dayjs from 'dayjs';
import clsx from 'clsx';

import { Typography, Grid } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginTop: 50,
    [theme.breakpoints.up('md')]: {
      padding: '0 60px 0 60px',
    },
    justifyContent: 'space-evenly',
  },
  buttonContainer: {
    maxWidth: 500,
  },
  button: {
    transition: '300ms ease',
    cursor: 'pointer',
    '&:hover': {
      filter: 'brightness(140%)',
    },
    [theme.breakpoints.only('sm')]: {
      margin: '0 30px 0 30px',
    },
    [theme.breakpoints.only('xs')]: {
      margin: '0 5px 0 5px',
    },
  },
  leftButton: {
    [theme.breakpoints.up('lg')]: {
      marginLeft: '5vw',
      marginRight: '1vw',
    },
    [theme.breakpoints.only('md')]: {
      marginLeft: 80,
      marginRight: 20,
    },
  },
  rightButton: {
    [theme.breakpoints.up('lg')]: {
      marginRight: '5vw',
      marginLeft: '1vw',
    },
    [theme.breakpoints.only('md')]: {
      marginRight: 80,
      marginLeft: 20,
    },
  },
}));

export default function ApplyButtons({
  freshmanLink,
  nonFreshmanLink,
  freshmanDueDate,
  nonFreshmanDueDate,
}) {
  const classes = useStyles();

  return (
    <Grid
      className={classes.buttons}
      container
      direction='row'
      // justifyContent='space-evenly'
      alignItems='center'
    >
      <Grid item xs className={classes.buttonContainer}>
        <a href={freshmanLink} target='_blank'>
          <img
            className={clsx(classes.button, classes.leftButton)}
            src='/static/images/apply-page/freshman button.svg'
            alt='Freshman Application'
          />
        </a>
        <Typography
          align='center'
          variant='body1'
          className={classes.leftButton}
        >
          DUE {freshmanDueDate.format('M/D @ hh:mm A')}
        </Typography>
      </Grid>
      <Grid item xs className={classes.buttonContainer}>
        <a href={nonFreshmanLink} target='_blank'>
          <img
            className={clsx(classes.button, classes.rightButton)}
            src='/static/images/apply-page/nonfreshman button.svg'
            alt='Non-Freshman Application'
          />
        </a>
        <Typography
          align='center'
          variant='body1'
          className={classes.rightButton}
        >
          DUE {nonFreshmanDueDate.format('M/D @ hh:mm A')}
        </Typography>
      </Grid>
    </Grid>
  );
}
