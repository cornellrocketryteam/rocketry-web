import * as arraySupport from 'dayjs/plugin/arraySupport';
import * as dayjs from 'dayjs';

import { Avatar, Container, Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import InfoSessionTimeline from './timelines/InfoSessionTimeline';
import AlumniCarousel from './AlumniCarousel';

dayjs.extend(arraySupport);

const useStyles = makeStyles((theme) => ({
  root: {
    scrollMarginTop: '25px',
  },
  moreInfo: {
    padding: '50px 20px 0px 20px',
    [theme.breakpoints.down('md')]: {
      padding: '30px 5px 0 5px',
    },
    maxWidth: '100vw',
    marginBottom: 100,
  },
  infoSection: {
    padding: 40,
    [theme.breakpoints.down('md')]: {
      padding: 20,
    },
    height: '100%',
    border: '2px solid #8D8D8D',
  },
  infoHeading: {
    marginBottom: 35,
  },
  alumni: {
    position: 'relative',
  },
  alumniPic: {
    marginTop: 20,
    marginBottom: 20,
    margin: 'auto',
    height: 200,
    width: 200,
  },
  alumniQuote: {
    marginTop: 20,
  },
  video: {
    width: '100%',
    height: 600,
  },
}));

export default function MoreInfo({ moreInfoRef, timelineData }) {
  const classes = useStyles();

  return (
    <Container maxWidth='xl' ref={moreInfoRef} className={classes.root}>
      <Grid
        container
        justifyContent='center'
        className={classes.moreInfo}
        spacing={5}
      >
        <Grid item md={6}>
          <div className={classes.infoSection}>
            <Typography variant='h3' className={classes.infoHeading}>
              Meet us at our information sessions.
            </Typography>
            <InfoSessionTimeline timelineData={timelineData} />
          </div>
        </Grid>
        <Grid item md={6}>
          <div className={classes.infoSection}>
            <Typography variant='h3' className={classes.infoHeading}>
              Words from our Alumni.
            </Typography>
            <AlumniCarousel />
          </div>
        </Grid>
        <Grid item md={12}>
          <div className={classes.infoSection}>
            <iframe
              className={classes.video}
              src='https://www.youtube.com/embed/roTs-19zDyE?si=UglhiBwIZI1KXZ8l&rel=0'
              title='YouTube video player'
              frameborder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowfullscreen
            ></iframe>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
