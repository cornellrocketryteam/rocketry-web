import { useState } from 'react';
import clsx from 'clsx';
import {
  makeStyles,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
} from '@material-ui/core';
import Header from '../components/layout/Header';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // backgroundColor: '',
  },
  backgroundOpen: {
    backgroundImage:
      "radial-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 1) ), url('/static/images/apply-page/new mexico.png')",
  },
  backgroundClosed: {
    backgroundImage:
      "radial-gradient( rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1) ), url('/static/images/apply-page/earth.jpg')",
  },
  hud: {
    position: 'relative',
    width: '100%',
    height: '100vh',
  },
  hudElement: {
    position: 'absolute',
    height: '20vw',
    maxHeight: 280,
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  hudTop: {
    top: 80,
  },
  hudRight: {
    right: 40,
  },
  hudBottom: {
    bottom: 35,
  },
  hudLeft: {
    left: 40,
  },
  rocket: {
    height: '45vh',
    top: '45%',
    left: 45,
    transform: 'translateY(-50%)',
  },
  centerBar: {
    top: 100,
    height: 50,
    maxWidth: '40vw',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  applicationClosed: {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  applicationOpen: {
    position: 'absolute',
    // marginTop: 180,
    // marginTop: 300,
    top: '52%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    [theme.breakpoints.up('md')]: {
      width: '60vw',
    },
    [theme.breakpoints.only('sm')]: {
      width: '75vw',
    },
    [theme.breakpoints.only('xs')]: {
      width: '90vw',
    },
  },
  timeline: {
    marginTop: 60,
    padding: '30px 0 70px 0',
  },
  timelineDot: {
    margin: 'auto',
    width: 15,
    height: 15,
    backgroundColor: '#B22025',
    position: 'relative',
    borderRadius: '50%',
    '& > p': {
      textAlign: 'center',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
    },
  },
  rightLine: {
    '&:after': {
      content: "''",
      display: 'block',
      position: 'absolute',
      zIndex: -1,
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: 'white',
      width: '5vw',
      minWidth: 100,
      height: 3,
    },
  },
  leftLine: {
    '&:before': {
      left: 'min(calc(15px - 5vw), calc(15px - 100px))', //width of line - width of the circle indicator
      content: "''",
      display: 'block',
      position: 'absolute',
      zIndex: -1,
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: 'white',
      width: '5vw',
      minWidth: 100,
      height: 3,
    },
  },
  date: {
    top: -30,
  },
  label: {
    top: '150%',
  },
  battery: {
    marginTop: 100,
    position: 'relative',
    left: 8,
  },
  rectangle: {
    top: '50%',
    transform: 'translateY(-50%)',
    left: '8.5%',
    position: 'absolute',
    margin: '0 5px 0 5px',
    height: '80%',
    width: '20%', //80% is max battery %
    backgroundColor: 'white',
    // borderRadius: 5,
  },
  buttons: {
    marginTop: 70,
  },
  button: {
    transition: '300ms ease',
    cursor: 'pointer',
    '&:hover': {
      filter: 'brightness(140%)',
    },
    [theme.breakpoints.up('lg')]: {
      margin: '0 5vw 0 5vw',
    },
    [theme.breakpoints.only('md')]: {
      margin: '0 40px 0 40px',
    },
    [theme.breakpoints.only('sm')]: {
      margin: '0 30px 0 30px',
    },
    [theme.breakpoints.only('xs')]: {
      margin: '0 5px 0 5px',
    },
  },

  //mobile application open
  applicationOpenMobile: {
    marginTop: '10vh',
  },
  mobileTimeline: {
    paddingTop: 10,
    position: 'relative',
  },
  mobileDot: {
    listStyleType: 'none',
    paddingBottom: 20,
    borderLeft: '1px solid white',
    position: 'relative',
    paddingLeft: 20,
    marginLeft: 10,
    '&:last-child': {
      border: 0,
      paddingBottom: 0,
    },
    '&:before': {
      content: "''",
      width: 10,
      height: 10,
      background: '#B22025',
      borderRadius: '50%',
      position: 'absolute',
      left: -5,
      top: 0,
    },
  },
  mobileText: {
    position: 'relative',
    top: -6,
  },
  mobileButtons: {
    textAlign: 'center',
  },
  mobileButton: {
    margin: 5,
  },
}));

export default function Apply() {
  const classes = useStyles();
  const theme = useTheme();
  const mediaXs = useMediaQuery(theme.breakpoints.only('xs'));
  const [applicationOpen, setApplicationOpen] = useState(true);

  const freshmanDueDate = '10/1';
  const nonFreshmanDueDate = '9/8';

  const freshmanLink =
    'https://docs.google.com/forms/d/1soWOWv5oeyhswul7IttXiuI130NXR7yJXcVqgS4c8vg/edit';
  const nonFreshmanLink =
    'https://docs.google.com/forms/d/16i_osd_6HiKYCoNoaj464LkVqi_AGc3CAQxnC4w3bWg/edit';

  // ‑ no break hyphen, copy and paste
  const timelineData = [
    { date: '8/23', label: 'applications go live' },
    { date: '9/6', label: 'information session #1 @ 6 pm zoom' },
    { date: '9/16', label: 'information session #2 location tbd' },
    { date: nonFreshmanDueDate, label: 'non‑freshman applications due' },
    { date: '9/23', label: 'information session #3 location tbd' },
    { date: '9/26', label: 'information session #4 @ 4:30 pm Upson 216' },
    { date: freshmanDueDate, label: 'freshman applications due' },
  ];

  return (
    <div
      className={clsx(
        classes.root,
        applicationOpen ? classes.backgroundOpen : classes.backgroundClosed
      )}
    >
      <Header />
      <div className={classes.hud}>
        {!applicationOpen ? (
          <img
            className={clsx(
              classes.hudElement,
              classes.hudTop,
              classes.hudLeft
            )}
            src='/static/images/apply-page/hud/top left closed.svg'
            alt='Top Left'
          />
        ) : (
          <img
            className={clsx(
              classes.hudElement,
              classes.hudTop,
              classes.hudLeft
            )}
            src='/static/images/apply-page/hud/top left open.svg'
            alt='Top Left'
          />
        )}
        <img
          className={clsx(classes.hudElement, classes.hudTop, classes.hudRight)}
          src='/static/images/apply-page/hud/top right.svg'
          alt='Top Right'
        />
        <img
          className={clsx(
            classes.hudElement,
            classes.hudBottom,
            classes.hudLeft
          )}
          src='/static/images/apply-page/hud/bottom left.svg'
          alt='Bottom Left'
        />
        <img
          className={clsx(
            classes.hudElement,
            classes.hudBottom,
            classes.hudRight
          )}
          src='/static/images/apply-page/hud/bottom right.svg'
          alt='Bottom Right'
        />
        <img
          className={clsx(classes.hudElement, classes.rocket)}
          src='/static/images/apply-page/hud/rocket.svg'
          alt='Rocket'
        />
        <img
          className={clsx(classes.hudElement, classes.centerBar)}
          src='/static/images/apply-page/hud/center bar.svg'
          alt='Center Bar'
        />
        {!applicationOpen ? (
          <div className={classes.applicationClosed}>
            <Typography variant='h3' align='center'>
              Applications for Fall 2020 have closed
            </Typography>
          </div>
        ) : mediaXs ? ( //display different applicationOpen page when on mobile browsers
          <div className={classes.applicationOpenMobile}>
            <Typography variant='h6' align='center'>
              RECRUITMENT TIMELINE
            </Typography>
            <ul className={classes.mobileTimeline}>
              {timelineData.map((data, index) => (
                <li item xs key={index} className={classes.mobileDot}>
                  <div className={classes.mobileText}>
                    <Typography variant='caption'>
                      {data.date.toUpperCase()}
                    </Typography>
                    <Typography variant='body2'>
                      {data.label.toUpperCase()}
                    </Typography>
                  </div>
                </li>
              ))}
            </ul>
            <Grid
              container
              direction='row'
              justifyContent='space-evenly'
              alignItems='center'
              className={classes.mobileButtons}
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
                  DUE {freshmanDueDate}
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
                  DUE {nonFreshmanDueDate}
                </Typography>
              </Grid>
            </Grid>
          </div>
        ) : (
          <div className={classes.applicationOpen}>
            <Typography variant='h3' align='center'>
              RECRUITMENT TIMELINE
            </Typography>
            <Grid
              className={classes.timeline}
              container
              direction='row'
              justifyContent='space-evenly'
              alignItems='center'
            >
              {timelineData.map((data, index) => (
                <Grid item xs key={index}>
                  <div
                    className={clsx(
                      classes.timelineDot,
                      { [classes.rightLine]: index < timelineData.length - 1 }, // all dots but the last
                      { [classes.leftLine]: index != 0 } // all dots but the first
                    )}
                  >
                    <Typography variant='body1' className={classes.date}>
                      {data.date.toUpperCase()}
                    </Typography>
                    <Typography variant='body1' className={classes.label}>
                      {data.label.toUpperCase()}
                    </Typography>
                  </div>
                </Grid>
              ))}
            </Grid>
            {/* <div className={classes.battery}>
              <img
                src='/static/images/apply-page/battery6.svg'
                alt='Non-Freshman Application'
              />
              <div className={classes.rectangle}></div>
            </div> */}
            <Grid
              className={classes.buttons}
              container
              direction='row'
              justifyContent='space-evenly'
              alignItems='center'
            >
              <Grid item xs>
                <a href={freshmanLink} target='_blank'>
                  <img
                    className={classes.button}
                    src='/static/images/apply-page/freshman button.svg'
                    alt='Freshman Application'
                  />
                </a>
                <Typography align='center' variant='body2'>
                  DUE {freshmanDueDate}
                </Typography>
              </Grid>
              <Grid item xs>
                <a href={nonFreshmanLink} target='_blank'>
                  <img
                    className={classes.button}
                    src='/static/images/apply-page/nonfreshman button.svg'
                    alt='Non-Freshman Application'
                  />
                </a>

                <Typography align='center' variant='body2'>
                  DUE {nonFreshmanDueDate}
                </Typography>
              </Grid>
            </Grid>
          </div>
        )}
      </div>
    </div>
  );
}
