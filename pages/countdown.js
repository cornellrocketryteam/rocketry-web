import { makeStyles, Typography } from '@material-ui/core';
import Header from '../components/layout/Header';
import Head from '../components/layout/Head';
import Footer from '../components/layout/Footer';
import { useEffect, useState } from 'react';

const MADNESS_GROUP_ID = 4559291
const MADNESS_YEAR = 2022
const MADNESS_URL = `https://fantasy.espncdn.com/tournament-challenge-bracket/${MADNESS_YEAR}/en/api/v7/group?groupID=${MADNESS_GROUP_ID}&sort=-1&start=0&length=50&periodPoints=false`


const useStyles = makeStyles((theme) => ({
  text: {
    width: '90%',
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: "center",
  },
  textMadness: {
    height: "50vh",
    backgroundColor: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  rocketryMadness: {
    height: "50vh",
    backgroundColor: "white",
    padding: "20px",
    color: "black"
  },
  madnessList: {
    columnCount: 2,
    marginTop: 15,
    "& :nth-child(1)": {
      listStyle: "\"\uD83E\uDD47 \"",
    },
    "& :nth-child(2)": {
      listStyle: "\"\uD83E\uDD48 \"",
    },
    "& :nth-child(3)": {
      listStyle: "\"\uD83E\uDD49 \"",
    }
  },
  countdown: {
    fontSize: 70,
    [theme.breakpoints.up('lg')]: {
      fontSize: 150,
    },
  },
  logo: {
    paddingTop: 20,
    height: 100
  }
}));


const calculateTimeUntil = (from, to) => {
  const distance = to.getTime() - (from.getTime());

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  const elapsed = distance < 0;

  return { elapsed, days, hours, minutes, seconds };
}

const decodeEntities = (inputStr) => {
  var textarea = document.createElement("textarea");
  textarea.innerHTML = inputStr;
  return textarea.value;
}

const launch = new Date("2022-03-27T13:00:00.000Z") // 2022-03-19 9:00am EDT
const reloadTime = 1000 /*ms*/ * 60 /*sec*/ * 15 /*min*/

export default function Countdown() {
  const classes = useStyles();

  const [countdown, setCountdown] = useState({ elapsed: true, days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [madnessData, setMadnessData] = useState(null);
  const [madnessUpdateTime, setMadnessUpdateTime] = useState(new Date());

  useEffect(() => {
    // assume monitor refresh rate is 120Hz: (120Hz)
    const timer = setInterval(() => setCountdown(calculateTimeUntil(new Date(), launch)), 20);
    const pageReloadTimer = setInterval(() => document.location.reload(), reloadTime)
    return () => { clearInterval(timer); clearInterval(pageReloadTimer) };
  }, [setCountdown])

  useEffect(async () => {
    if (new Date("2022-03-17T16:00:00.000Z") > new Date() && !(new URLSearchParams(window.location.search).has("showMadness"))) {
      return
    }
    const response = await fetch(MADNESS_URL)
    const data = await response.json()
    console.log(data)
    setMadnessData(data)
    setMadnessUpdateTime(new Date())
  }, [setMadnessData, setMadnessUpdateTime])

  return (
    <div className={classes.root}>
      <Head title='Countdown' />
      <div className={`${madnessData ? classes.textMadness : classes.text}`} id="text">
        <Typography variant='h1' align='center' className={classes.countdown}>
          {countdown.elapsed ?
            <>Cornell Rocketry Team</> :
            <>T-{countdown.days}d {countdown.hours}h {countdown.minutes}m {countdown.seconds}s</>
          }
        </Typography>
        <Typography variant='h3' align='center'>
          {!countdown.elapsed && "Dress Rehearsal"}
        </Typography>
        {!madnessData && <img
          src='/static/crt.png'
          alt='logo'
          className={classes.logo}
        />}
      </div>
      {madnessData && <div className={classes.rocketryMadness}>
        <Typography variant='h2'>&#x1F3C0; Rocketry Madness</Typography>
        <Typography variant='h4'>(Top {madnessData.g.e.length > 10 && "10"} brackets updated every 15 minutes, last {madnessUpdateTime.toLocaleTimeString()})</Typography>
        <Typography variant='h3'>
          <ol className={classes.madnessList}>
            {madnessData.g.e.slice(0, 10).map((data, i) => <li key={i}>{decodeEntities(data.n_d)} ({data.p})</li>)}
          </ol>
        </Typography>
      </div>}
    </div>
  );
}
