import * as dayjs from 'dayjs';

import {
  makeStyles,
  withStyles,
  useMediaQuery,
  useTheme,
  Typography,
  Grid,
  Button,
} from '@material-ui/core';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import StepIcon from '@material-ui/core/StepIcon';
import { useState } from 'react';
import { useEffect } from 'react';

//mobile
import MuiTimeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';

const StyledStepConnector = withStyles({
  active: {
    '& $line': {
      borderColor: '#B22025',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#B22025',
    },
  },
  line: {
    borderColor: 'rgba(255, 255, 255, 0.7)',
    borderTopWidth: '2px',
  },
})(StepConnector);

const StyledStepIcon = withStyles({
  root: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  active: {
    '&>*': {
      color: '#B22025',
    },
  },
  completed: {
    '&>*': {
      color: '#B22025',
    },
  },
  text: {
    display: 'none',
  },
})(StepIcon);

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 50,
    [theme.breakpoints.only('md')]: {
      margin: '50px 50px 0 50px',
    },
  },
  stepperTimeline: {
    position: 'relative',
    backgroundColor: 'transparent',
  },
  timelineLabelDate: {
    position: 'absolute',
    top: -35,
    left: '50%',
    transform: 'translate(-50%)',
  },
}));

export default function Timeline({ timelineData }) {
  const classes = useStyles();
  const theme = useTheme();
  const mediaXs = useMediaQuery(theme.breakpoints.only('xs'));

  const [activeStep, setActiveStep] = useState(0);

  const freshmanDueDate = dayjs([2022, 9, 29]);
  const nonFreshmanDueDate = dayjs([2022, 9, 1]);

  // ‑ no break hyphen, copy and paste
  // const timelineData = [
  //   { date: dayjs([2022, 8, 24]), label: 'Info Session' },
  //   {
  //     date: dayjs([2022, 8, 30]),
  //     label: 'Info Session',
  //   },
  //   {
  //     date: dayjs([2022, 9, 1]),
  //     label: 'Project Team Fest / Upperclassmen Apps Due',
  //     location: '@ 4‑7pm ELL',
  //   },
  //   {
  //     date: dayjs([2022, 9, 15]),
  //     label: 'Info Session',
  //   },
  //   {
  //     date: dayjs([2022, 9, 21]),
  //     label: 'Info Session',
  //   },
  //   {
  //     date: dayjs([2022, 9, 29]),
  //     label: 'Freshman Apps Due',
  //   },
  // ];

  useEffect(() => {
    var now = dayjs();
    for (let [index, val] of timelineData.entries()) {
      if (now.isAfter(val.date)) {
        setActiveStep(index + 1);
      }
    }
  });

  return (
    <div className={classes.root}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<StyledStepConnector />}
        className={classes.stepperTimeline}
      >
        {timelineData.map((data) => (
          <Step key={data.label}>
            <StepLabel
              StepIconComponent={StyledStepIcon}
              className={classes.timelineLabel}
            >
              {data.label.toUpperCase()}
              <br />
              <span className={classes.timelineLabelDate}>
                {data.date.format('M/D')}
              </span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}

const mobileTimelineStyles = makeStyles(() => ({
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
}));

export function MobileTimeline({
  timelineData,
  freshmanLink,
  nonFreshmanLink,
}) {
  const classes = mobileTimelineStyles();

  const freshmanDueDate = dayjs([2022, 9, 29]);
  const nonFreshmanDueDate = dayjs([2022, 9, 1]);

  return (
    <div className={classes.applicationOpenMobile}>
      <Typography variant='h6' align='center'>
        RECRUITMENT TIMELINE
      </Typography>
      <MuiTimeline>
        {timelineData.map((data, index) => (
          <TimelineItem>
            <TimelineOppositeContent style={{ flex: 0.2 }}>
              <Typography color='textSecondary'>
                {data.date.format('M/D')}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot color='secondary' />
              {/* don't put timeline connector for the last element */}
              {index != timelineData.length - 1 ? <TimelineConnector /> : null}
            </TimelineSeparator>
            <TimelineContent>
              <Typography>{data.label.toUpperCase()}</Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </MuiTimeline>
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
    </div>
  );
}
