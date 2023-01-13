import React from 'react';
import * as dayjs from 'dayjs';
import clsx from 'clsx';

import { makeStyles, Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  buttons: {
    marginTop: 50,
    [theme.breakpoints.up('md')]: {
      padding: '0 60px 0 60px',
    },
    justifyContent: 'space-evenly',
  },
  buttonContainer: {
    maxWidth: 400,
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
      {freshmanLink && (
        <Grid
          item
          xs
          className={clsx(
            classes.buttonContainer,
            nonFreshmanLink ? classes.leftButton : null
          )}
        >
          <a href={freshmanLink} target='_blank'>
            <img
              className={classes.button}
              src='/static/images/apply-page/freshman button.svg'
              alt='Freshman Application'
            />
          </a>
          <Typography
            align='center'
            variant='body1'
            // className={classes.leftButton}
          >
            DUE {freshmanDueDate.format('M/D @ hh:mm A')}
          </Typography>
        </Grid>
      )}
      {nonFreshmanLink && (
        <Grid
          item
          xs
          className={clsx(
            classes.buttonContainer,
            freshmanLink ? classes.rightButton : null
          )}
        >
          <a href={nonFreshmanLink} target='_blank'>
            <img
              className={classes.button}
              src='/static/images/apply-page/nonfreshman button.svg'
              alt='Non-Freshman Application'
            />
          </a>
          <Typography
            align='center'
            variant='body1'
            // className={classes.rightButton}
          >
            DUE {nonFreshmanDueDate.format('M/D @ hh:mm A')}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
