import * as arraySupport from 'dayjs/plugin/arraySupport';
import * as dayjs from 'dayjs';

import {
  Avatar,
  Container,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';

import InfoSessionTimeline from './timelines/InfoSessionTimeline';

dayjs.extend(arraySupport);

const useStyles = makeStyles((theme) => ({
  root: {
    scrollMarginTop: '25px',
  },
  moreInfo: {
    padding: '50px 20px 0px 20px',
    [theme.breakpoints.down('sm')]: {
      padding: '30px 5px 0 5px',
    },
    maxWidth: '100vw',
    marginBottom: 100,
  },
  infoSection: {
    padding: 40,
    [theme.breakpoints.down('sm')]: {
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
            <div>
              <Avatar
                className={classes.alumniPic}
                alt='Matt Schneider'
                src='/static/images/apply-page/alumni/mattschneider.png'
              />
              <Typography variant='h6' align='center'>
                Matt Schneider '21
              </Typography>
              <Typography variant='body1' className={classes.alumniQuote}>
                “As an incoming freshman, Cornell Rocketry provided me the
                opportunity to work on challenging problems and be a part of
                something bigger than myself. Early on I focused my efforts on
                expressing my creative potential and honing my design instincts,
                but came to see an equally significant value in the friendships
                and mentorships gained along the way. The team gave me the
                chance to develop as a leader, learning in the moment from my
                mistakes and taking on more responsibilities along the way.
                Without a doubt, my time on Cornell Rocketry was THE formative
                experience of my time in college and I’m grateful to have been
                able to contribute.”
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}
