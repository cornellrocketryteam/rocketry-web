import * as dayjs from 'dayjs';

import { makeStyles, Typography, Grid, Button } from '@material-ui/core';

//mobile
import MuiTimeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';

const useStyles = makeStyles(() => ({
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

export default function MobileTimeline({ timelineData }) {
  const classes = useStyles();

  return (
    <>
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
    </>
  );
}
