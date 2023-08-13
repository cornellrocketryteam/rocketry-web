import * as dayjs from 'dayjs';

import { Typography, Button, Box } from '@mui/material';

//mobile
import MuiTimeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';

export default function InfoSessionTimeline({ timelineData }) {
  return (
    <MuiTimeline>
      {timelineData.map((data, index) => (
        <TimelineItem key={index}>
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
            <Box fontSize='h6.fontSize' fontWeight='fontWeightBold'>
              {data.label.toUpperCase()}
            </Box>

            <Typography variant='body1'>
              {data.date.format('h:mm A')}
              {data.location && ' @ ' + data.location.toUpperCase()}
            </Typography>
            {data.link && (
              <Box mt={1}>
                <Button
                  href={data.link}
                  target='_blank'
                  size='small'
                  variant='contained'
                  color='secondary'
                >
                  Join
                </Button>
              </Box>
            )}
          </TimelineContent>
        </TimelineItem>
      ))}
    </MuiTimeline>
  );
}
