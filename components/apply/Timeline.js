import * as dayjs from 'dayjs';
import * as arraySupport from 'dayjs/plugin/arraySupport';

import {
  makeStyles,
  withStyles,
  useMediaQuery,
  useTheme,
  Typography,
} from '@material-ui/core';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import StepIcon from '@material-ui/core/StepIcon';
import { useState } from 'react';
import { useEffect } from 'react';

const TimelineConnector = withStyles({
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

const TimelineDot = withStyles({
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
  },
  stepperTimeline: {
    backgroundColor: 'transparent',
  },
  timelineLabelDate: {
    position: 'relative',
    top: -90,
  },
}));

export default function Timeline() {
  const classes = useStyles();
  const theme = useTheme();
  const mediaXs = useMediaQuery(theme.breakpoints.only('xs'));

  const [activeStep, setActiveStep] = useState(0);

  const freshmanDueDate = dayjs([2022, 9, 29]);
  const nonFreshmanDueDate = dayjs([2022, 9, 1]);

  // ‑ no break hyphen, copy and paste
  const timelineData = [
    { date: dayjs([2022, 8, 24]), label: 'Info Session' },
    {
      date: dayjs([2022, 8, 30]),
      label: 'Info Session',
    },
    {
      date: dayjs([2022, 12, 1]),
      label: 'Project Team Fest',
      location: '@ 4‑7pm ELL',
    },
  ];

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
      {/* <Grid
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
              </Grid> */}
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<TimelineConnector />}
        className={classes.stepperTimeline}
      >
        {timelineData.map((data) => (
          <Step key={data.label}>
            <StepLabel
              StepIconComponent={TimelineDot}
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
