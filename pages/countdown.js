import { makeStyles, Typography } from '@material-ui/core';
import Header from '../components/layout/Header';
import Head from '../components/layout/Head';
import Footer from '../components/layout/Footer';
import { useEffect, useState } from 'react';

const useStyles = makeStyles((theme) => ({
  text: {
    width: '90%',
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  countdown: {
    fontSize: 70,
    [theme.breakpoints.up('lg')]: {
      fontSize: 150,
    },
  },
}));


const calculateTimeUntil = (from, to) => {
  const distance = to.getTime() - (from.getTime());

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

const launch = new Date("2022-03-19T13:00:00.000Z") // 2022-03-19 9:00am EDT

export default function Countdown() {
  const classes = useStyles();

  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => setCountdown(calculateTimeUntil(new Date(), launch)), 1000);
    return () => clearInterval(timer);
  }, [setCountdown])

  return (
    <div className={classes.root}>
      <Head title='Countdown' />
      <Header hideMenu />
      <div className={classes.text}>
        <Typography variant='h1' align='center' className={classes.countdown}>
          T&mdash;{countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s
        </Typography>
        <Typography variant='h3' align='center'>
          Test Launch
        </Typography>
      </div>
    </div>
  );
}
