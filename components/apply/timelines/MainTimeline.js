import * as dayjs from 'dayjs';

import Step from '@mui/material/Step';
import StepConnector from '@mui/material/StepConnector';
import StepIcon from '@mui/material/StepIcon';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import makeStyles from '@mui/styles/makeStyles';
import { useEffect } from 'react';
import { useState } from 'react';
import withStyles from '@mui/styles/withStyles';

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
    padding: '30px 0',
  },
  stepperTimeline: {
    marginTop: 50,
    [theme.breakpoints.only('md')]: {
      margin: '50px 50px 0 50px',
    },
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

export default function MainTimeline({ timelineData }) {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);

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
