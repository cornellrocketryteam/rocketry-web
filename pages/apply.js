import { useState } from 'react';
import clsx from 'clsx';
import {
  makeStyles,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Button,
  Container,
  Avatar,
  IconButton,
} from '@material-ui/core';
import Header from '../components/layout/Header';

const useStyles = makeStyles((theme) => ({
  splash: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  backgroundOpen: {
    backgroundImage:
      "radial-gradient(closest-side, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 1) ), url('/static/images/apply-page/new mexico.png')",
  },
  backgroundClosed: {
    backgroundImage:
      "radial-gradient(closest-side, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1) ), url('/static/images/apply-page/earth.jpg')",
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
    [theme.breakpoints.down('sm')]: {
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
    maxHeight: 'none',
    height: '30vh',
    top: '50%',
    left: '4vw',
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
    [theme.breakpoints.up('lg')]: {
      width: '65vw',
    },
    [theme.breakpoints.only('md')]: {
      width: '80vw',
    },
    [theme.breakpoints.down('sm')]: {
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
      left: 'min(calc(15px - 5vw), calc(15px - 100px))', //width of the circle indicator - width of line
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
  buttons: {
    marginTop: 80,
    [theme.breakpoints.only('xl')]: {
      padding: '0 60px 0 60px',
    },
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
  scrollDownButton: {
    height: 100,
    width: 100,
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '125%',
  },
  scrollDownIcon: {
    height: 80,
    width: 80,
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
    borderLeft: '1px solid #C0C0C0',
    position: 'relative',
    paddingLeft: 20,
    marginLeft: 10,
    '&:last-child': {
      border: 0,
      paddingBottom: 0,
      marginLeft: 11,
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
  moreInfo: {
    maxWidth: '100vw',
  },
  infoSection: {
    margin: '50px 20px 0px 20px',
    height: '100%',
    padding: 40,
    border: '2px solid #8D8D8D',
    // borderRadius: 10,
  },
  infoHeading: {
    marginBottom: 35,
  },
  infoTimeline: {
    paddingLeft: 0,
    // paddingTop: 30,
    position: 'relative',
  },
  infoDot: {
    listStyleType: 'none',
    paddingBottom: 20,
    borderLeft: '2px solid #C0C0C0',
    position: 'relative',
    paddingLeft: 20,
    marginLeft: 10,
    '&:last-child': {
      border: 0,
      paddingBottom: 0,
      marginLeft: 12,
    },
    '&:before': {
      content: "''",
      width: 18,
      height: 18,
      background: '#B22025',
      border: '3px solid black',
      borderRadius: '50%',
      position: 'absolute',
      left: -10,
      top: 0,
    },
  },
  infoText: {
    position: 'relative',
    top: -7,
  },
  infoLabel: {
    fontWeight: 600,
  },
  infoButton: {
    marginTop: 10,
  },
  alumni: {
    position: 'relative',
  },
  alumniPic: {
    marginTop: 20,
    margin: 'auto',
    height: 200,
    width: 200,
  },
  alumniQuote: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
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
    {
      date: '9/6',
      label: 'information session #1 @ zoom',
      location: '@ 6 pm zoom',
      link:
        'https://cornell.zoom.us/j/93851903660?pwd=OUs4OVppVGNuVGNIbml2Z3pKNktKZz09',
    },
    { date: nonFreshmanDueDate, label: 'non‑freshman applications due' },
    { date: '9/16', label: 'information session #2', location: 'location tbd' },
    { date: '9/23', label: 'information session #3', location: 'location tbd' },
    {
      date: '9/26',
      label: 'information session #4',
      location: '@ 4:30 pm Upson 216',
    },
    { date: freshmanDueDate, label: 'freshman applications due' },
  ];

  return (
    <div>
      <div
        className={clsx(
          classes.splash,
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
            className={clsx(
              classes.hudElement,
              classes.hudTop,
              classes.hudRight
            )}
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
          ) : mediaXs ? (
            //display different applicationOpen page when on mobile browsers
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
            // end mobile content
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
                        {
                          [classes.rightLine]: index < timelineData.length - 1,
                        }, // all dots but the last
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
                  <Typography align='center' variant='body1'>
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
                  <Typography align='center' variant='body1'>
                    DUE {nonFreshmanDueDate}
                  </Typography>
                </Grid>
              </Grid>

              <IconButton className={classes.scrollDownButton}>
                <img
                  className={classes.scrollDownIcon}
                  src='/static/images/apply-page/scrolldown.svg'
                  alt='Scroll Down'
                />
              </IconButton>
            </div>
          )}
        </div>
      </div>
      <Container maxWidth='xl'>
        <Grid container justify='center' className={classes.moreInfo}>
          <Grid item md={6}>
            <div className={classes.infoSection}>
              <Typography variant='h3' className={classes.infoHeading}>
                Meet us at our information sessions.
              </Typography>
              <ul className={classes.infoTimeline}>
                {timelineData.map((data, index) => (
                  <li item xs key={index} className={classes.infoDot}>
                    <div className={classes.infoText}>
                      <Typography variant='h6' className={classes.infoLabel}>
                        {data.label.toUpperCase()}
                      </Typography>
                      <Typography variant='body1'>
                        {data.date.toUpperCase()}{' '}
                        {data.location && data.location.toUpperCase()}
                      </Typography>
                      {data.link && (
                        <Button
                          href={data.link}
                          target='_blank'
                          size='small'
                          variant='contained'
                          color='secondary'
                          className={classes.infoButton}
                        >
                          Join
                        </Button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Grid>
          <Grid item md={6}>
            <div className={classes.infoSection}>
              <Typography variant='h3' className={classes.infoHeading}>
                Words from our Alumni.
              </Typography>
              <Grid
                container
                justify='center'
                spacing={3}
                className={classes.alumni}
              >
                <Grid item md={4}>
                  <Avatar
                    className={classes.alumniPic}
                    alt='Matt Schneider'
                    src='/static/images/apply-page/alumni/mattschneider.png'
                  />
                  <Typography variant='h6' align='center'>
                    Matt Schneider '21
                  </Typography>
                </Grid>
                <Grid item md={8}>
                  <Typography variant='body1' className={classes.alumniQuote}>
                    ...
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                justify='center'
                spacing={3}
                className={classes.alumni}
              >
                <Grid item md={4}>
                  <Avatar
                    className={classes.alumniPic}
                    alt='Sam DiPietro'
                    src='/static/images/apply-page/alumni/samdipietro.png'
                  />
                  <Typography variant='h6' align='center'>
                    Sam DiPietro '21
                  </Typography>
                </Grid>
                <Grid item md={8}>
                  <Typography variant='body1' className={classes.alumniQuote}>
                    ...
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
