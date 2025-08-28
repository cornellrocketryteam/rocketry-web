import { Box, Container, Grid, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';

import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import ScrollLottie from '../lib/ScrollLottie';
import { gsap } from 'gsap/dist/gsap';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: 'hidden',
  },
  background: {
    zIndex: -2,
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    height: '100vh',
  },
  h100: {
    height: '100vh',
    position: 'relative',
  },
  relative: {
    position: 'relative',
    overflowY: 'hidden',
  },
  center: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
  },
  animationContainer: {
    zIndex: -1,
    overflowX: 'hidden',
    position: 'absolute',
    width: '100%',
  },
  animation: {
    height: '100vh',
    opacity: 0,
    overflowY: 'hidden',
  },
  content: {
    textAlign: 'center',
    paddingBottom: 450,
  },
  title: {
    fontSize: 100,
  },
  spacer: {
    paddingTop: 1900,
  },
  rocketPartText: {
    [theme.breakpoints.down('md')]: {
      textShadow:
        '0.05em 0 black, 0 0.05em black, -0.05em 0 black, 0 -0.05em black, -0.05em -0.05em black, -0.05em 0.05em black, 0.05em -0.05em black, 0.05em 0.05em black;',
    },
  },
}));

export default function Home() {
  const classes = useStyles();

  const backupAnimRef = useRef();
  const animRef = useRef();

  const statsRef = useRef();
  const whoRef = useRef();

  const drillRef = useRef();
  const blimsRef = useRef();
  const avRef = useRef();
  const motorRef = useRef();

  const rocketParts = [
    {
      ref: drillRef,
      name: 'Payload',
      description:
        'Each year, our rocket carries a new payload to its target apogee of 10,000 feet. This year\’s payload is a deployable camera system designed to capture in-flight footage of the rocket\’s guided descent under a steerable parafoil.',
    },
    {
      ref: blimsRef,
      name: 'BLiMS',
      description:
        'The Break Line Manipulation System autonomously pulls the parachute’s brake lines, steering the descending rocket to a predetermined GPS coordinate.',
    },
    {
      ref: avRef,
      name: 'AV Bay',
      description:
        'The avionics bay houses the main electrical boards, such as the Central Flight Computer, and flight batteries of the launch vehicle.',
    },
    {
      ref: motorRef,
      name: 'Rocket Motor',
      description:
        'Machined in-house from aluminum, our N2O-HTPB Hybrid motor is engineered to lift the launch vehicle to the target altitude of 10,000 feet, generating over 1,300 pounds of thrust.',
    },
  ];

  useEffect(() => {
    ScrollLottie({
      target: backupAnimRef.current,
      path: '../static/lotties/dataIncludedNew.json',
      duration: 3800 * 2,
      acceleration: 0.3,
    });
  }, [backupAnimRef]);

  useEffect(() => {
    ScrollLottie({
      target: animRef.current,
      path: '../static/lotties/highResAnim.json',
      duration: 3800 * 2,
      acceleration: 0.3,
    });
  }, [animRef]);

  useEffect(() => {
    const statsTimeline = Timeline(statsRef, 800);
    const whoTimeline = Timeline(whoRef, 800);
  }, [statsRef, whoRef]);

  useEffect(() => {
    let drillTimeline = Timeline(drillRef, 600);
    let blimsTimeline = Timeline(blimsRef, 500);
    let avTimeline = Timeline(avRef, 500);
    let motorTimeline = Timeline(motorRef, 550);
  });
  // }, [drillRef, blimsRef, avRef, motorRef]);
  // Removing this line fixes issue when clicking navbar Home when on homepage

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.animationContainer}>
        <div ref={backupAnimRef} className={classes.animation}></div>
      </div>
      <div className={classes.animationContainer}>
        <div ref={animRef} className={classes.animation}></div>
      </div>
      <div className={classes.content}>
        <div className={classes.h100}>
          <Typography variant='h2' className={(classes.title, classes.center)}>
            Cornell Rocketry Project Team
          </Typography>
        </div>

        <Container className={classes.relative}>
          <div ref={statsRef}>
            <Box mb={12}>
              <Typography variant='h2'>At a Glance</Typography>
            </Box>
            <Grid
              container
              direction='row'
              justifyContent='space-between'
              spacing={3}
            >
              <StatsNumber number={50} label={'Team Members'} />
              <StatsNumber number={6} label={'Subteams'} />
              <StatsNumber number={10} label={'Majors'} />
              <StatsNumber number={8} label={'Rockets Launched'} />
            </Grid>
          </div>
        </Container>

        <Container className={classes.relative} maxWidth='md'>
          <div ref={whoRef}>
            <Box mb={6}>
              <Typography variant='h2'>Who We Are</Typography>
            </Box>
            <Typography variant='h5'>
              Cornell Rocketry is an engineering project team dedicated to
              designing, assembling, and launching high-powered rockets to
              compete in the annual Spaceport America Cup.
            </Typography>
          </div>
        </Container>

        <Box className={classes.spacer} />

        {rocketParts.map(({ ref, name, description }) => (
          <RocketPart
            reference={ref}
            name={name}
            description={description}
            key={name}
          />
        ))}
      </div>
      <Footer />
    </div>
  );

  function RocketPart({ reference, name, description }) {
    return (
      <Container className={classes.relative}>
        <div ref={reference}>
          <Grid container className={classes.rocketPartText}>
            <Grid item xs={8} sm={6} md={4}>
              <Box mb={6}>
                <Typography variant='h4'>{name}</Typography>
              </Box>
              <Typography variant='h5'>{description}</Typography>
            </Grid>
          </Grid>
        </div>
      </Container>
    );
  }

  function StatsNumber({ number, label }) {
    return (
      <Grid item xs={6} sm={3}>
        <Typography variant='h2' className='statsNum'>
          {number}
        </Typography>
        <Typography variant='h5'>{label}</Typography>
      </Grid>
    );
  }

  function Timeline(ref, duration) {
    const timeline = gsap.timeline({
      scrollTrigger: ScrollTrigger(ref, duration),
    });

    timeline
      .addLabel('start')
      .fromTo(
        ref.current,
        { opacity: 0, yPercent: 5 },
        { duration: 1, opacity: 1, yPercent: 0 },
        '-=1' //increases the pause duration at 100% opacity
      )
      .to(
        ref.current,
        {
          duration: 1,
          opacity: 0,
          yPercent: -5,
          display: 'none',
        },
        '+=1' //increases the pause duration at 100% opacity
      )
      .addLabel('end');

    return timeline;
  }

  function ScrollTrigger(ref, duration) {
    const scrollTrigger = {
      trigger: ref.current,
      pin: true,
      scrub: true,
      start: `top ${50 - (ref.current.clientHeight / window.innerHeight) * 50
        }%`, // makes the content appear in the center of the screen
      end: '+=' + duration,
      // markers: true //debug markers
    };
    return scrollTrigger;
  }
}
