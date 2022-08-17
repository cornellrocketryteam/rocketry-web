import * as dayjs from 'dayjs';

import { Typography } from '@material-ui/core';

//mobile
import MuiTimeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';

export default function MobileTimeline({ timelineData }) {
  return (
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
  );
}
