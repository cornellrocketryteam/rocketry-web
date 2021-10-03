import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import ScrollLottie from '../lib/ScrollLottie';
import { useRef, useEffect } from 'react';
import {
  makeStyles,
  Typography,
  Grid,
  Box,
  Container,
} from '@material-ui/core';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: 'hidden',
  },
  h100: {
    height: '100vh',
    position: 'relative',
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
  },
  content: {
    textAlign: 'center',
  },
  title: {
    fontSize: 100,
  },
  statistics: {
    opacity: 0,
  },
}));

export default function Home() {
  /*
  Cornell Rocketry’s mission is to design, assemble, and launch high-powered rockets. 
  Each year the team dedicates itself to pushing their limits even further by taking on different challenges. 
  The team also values volunteering in the local area to help kids gain a passion for aerospace and science.
  */

  const classes = useStyles();
  const animRef = useRef();
  const statsRefContainer = useRef();
  const statsRef = useRef();

  useEffect(() => {
    ScrollLottie({
      target: animRef.current,
      path: '../static/lotties/homePage.json',
      duration: 2000,
      acceleration: 0.5,
    });
  }, [animRef]);

  useEffect(() => {
    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: statsRefContainer.current,
        pin: true,
        scrub: true,
        start: `top ${
          50 - (statsRef.current.clientHeight / window.innerHeight) * 50
        }%`,
        end: '+=800',
        // markers: true, //debug markers
      },
    });

    timeline
      .addLabel('start')
      .fromTo(
        statsRef.current,
        { opacity: 0, yPercent: 5 },
        { duration: 2, opacity: 1, yPercent: 0 },
        '-=1'
      )
      .addLabel('middle')
      .to(
        statsRef.current,
        {
          duration: 2,
          opacity: 0,
          yPercent: -5,
          display: 'none',
        },
        '+=1'
      )
      .addLabel('end');
  }, [statsRefContainer, statsRef]);

  return (
    <div className={classes.root}>
      <Header />
      <div className={classes.animationContainer}>
        <div ref={animRef} className={classes.animation}></div>
      </div>
      <div className={classes.content}>
        <div className={classes.h100}>
          <Typography variant='h1' className={(classes.title, classes.center)}>
            Cornell Rocketry Team
          </Typography>
        </div>

        <Container ref={statsRefContainer} className={classes.h100}>
          <div ref={statsRef} className={classes.statistics}>
            <Box mb={12}>
              <Typography variant='h2'>At a Glance</Typography>
            </Box>
            <Grid container direction='row' justify='space-between' spacing={3}>
              <StatsNumber number={40} label={'Team Members'} />
              <StatsNumber number={6} label={'Subteams'} />
              <StatsNumber number={6} label={'Majors'} />
              <StatsNumber number={5} label={'Rockets Launched'} />
            </Grid>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );

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
}
