import * as dayjs from 'dayjs';
import * as arraySupport from 'dayjs/plugin/arraySupport';
dayjs.extend(arraySupport);

import {
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
  IconButton,
} from '@material-ui/core';

import MainTimeline from './timelines/MainTimeline';

import MobileTimeline from './timelines/MobileTimeline';
import ApplyButtons from './ApplyButtons';
import MobileApplyButtons from './MobileApplyButtons';
import ScrollDownButton from './ScrollDownButton';

const useStyles = makeStyles((theme) => ({
  applicationClosed: {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  applicationOpenMobile: {
    marginTop: '10vh',
  },
  applicationOpen: {
    position: 'absolute',
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
  scrollDownButton: {
    height: 100,
    width: 100,
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '105%',
  },
  scrollDownIcon: {
    height: 80,
    width: 80,
  },
}));

export default function HudContent({
  applicationOpen,
  timelineData,
  freshmanLink,
  nonFreshmanLink,
  freshmanDueDate,
  nonFreshmanDueDate,
  moreInfoRef,
}) {
  const classes = useStyles();
  const theme = useTheme();
  const mediaXs = useMediaQuery(theme.breakpoints.only('xs'));

  // Application Closed
  if (!applicationOpen) {
    return (
      <div className={classes.applicationClosed}>
        <Typography variant='h3' align='center'>
          Applications for Fall 2022 will open soon.
        </Typography>
      </div>
    );
  }

  // Application open - mobile screen size
  else if (mediaXs) {
    return (
      <div className={classes.applicationOpenMobile}>
        <Typography variant='h6' align='center'>
          RECRUITMENT TIMELINE
        </Typography>
        <MobileTimeline
          timelineData={timelineData}
          freshmanLink={freshmanLink}
          nonFreshmanLink={nonFreshmanLink}
        />
        <MobileApplyButtons
          freshmanLink={freshmanLink}
          nonFreshmanLink={nonFreshmanLink}
          freshmanDueDate={freshmanDueDate}
          nonFreshmanDueDate={nonFreshmanDueDate}
        />
      </div>
    );
  }

  // Application open - desktop screen size
  else {
    return (
      <div className={classes.applicationOpen}>
        <Typography variant='h3' align='center'>
          RECRUITMENT TIMELINE
        </Typography>
        <MainTimeline timelineData={timelineData} />
        <ApplyButtons
          freshmanLink={freshmanLink}
          nonFreshmanLink={nonFreshmanLink}
          freshmanDueDate={freshmanDueDate}
          nonFreshmanDueDate={nonFreshmanDueDate}
        />
        <ScrollDownButton moreInfoRef={moreInfoRef} />
      </div>
    );
  }
}
