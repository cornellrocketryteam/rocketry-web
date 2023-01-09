import * as dayjs from 'dayjs';

import { Typography } from '@mui/material';

//mobile
import MuiTimeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

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
