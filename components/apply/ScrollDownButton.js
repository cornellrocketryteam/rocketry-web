import * as dayjs from 'dayjs';
import * as arraySupport from 'dayjs/plugin/arraySupport';
dayjs.extend(arraySupport);

import { IconButton } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
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

export default function ScrollDownButton({ moreInfoRef }) {
  const classes = useStyles();
  return (
    <IconButton
      className={classes.scrollDownButton}
      onClick={() => moreInfoRef.current.scrollIntoView()}
      size="large">
      <img
        className={classes.scrollDownIcon}
        src='/static/images/apply-page/scrolldown.svg'
        alt='Scroll Down'
      />
    </IconButton>
  );
}
