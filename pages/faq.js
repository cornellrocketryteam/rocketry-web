import { useRef, useEffect, useState } from 'react';
import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { createTheme } from '@material-ui/core/styles'
import {
  Container,
  makeStyles,
  Typography,
  Grid,
  useMediaQuery,
  useTheme,
  Box,
} from '@material-ui/core';
import Header from '../components/layout/Header';
import Stars from '../components/Stars';
import { gsap } from 'gsap/dist/gsap';
import lottie from 'lottie-web';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Head from '../components/layout/Head';
import Footer from '../components/layout/Footer';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const useStyles = makeStyles((theme) => ({
  // root: {
  //   height: '200vh',
  // },
  content: {
    padding: '100px 50px 50px 50px',
    [theme.breakpoints.only('xs')]: {
      padding: '80px 20px 30px 20px',
    },
  },
  mainRocketContainer: {
    minHeight: 'calc(1vh - 70px)',
    [theme.breakpoints.only('xs')]: {
      paddingBottom: 100,
    },
  },
  title: {
    marginBottom: 80,
  },
  imgWrapper: {
    position: 'relative',
  },
  rocketImage: {
    opacity: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: 700,
    width: 70,
  },
  spotlight: {
    zIndex: -1,
    display: 'block',
    position: 'absolute',
    width: 285,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  bigLine: {
    color: 'white',
    backgroundColor: 'white',
    height: 3,
    border: 'none',
    marginBottom: 12,
  },
  tableRow: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  smallLine: {
    color: theme.typography.h5.color,
    backgroundColor: theme.typography.h5.color,
    height: 1,
    border: 'none',
    marginTop: 3,
    marginBottom: 3,
  },
  description: {
    marginTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    color: theme.typography.h5.color,
  },
  timelineSpotlight: {
    zIndex: -1,
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    height: 100,
  },
  timelineRocket: {
    outline: 'none',
    display: 'block',
    margin: 'auto',
    height: 450,
    paddingBottom: 55,
    transition: '300ms ease',
    '&[active="false"]': {
      '&[adjacent="true"]': {
        opacity: 0.5,
        transform: 'scale(0.8)',
      },
      '&[adjacent="false"]': {
        opacity: 0,
        transform: 'scale(0.55)',
      },
    },
  },
  timelineLabel: {
    transition: '300ms ease',
    fontWeight: 800,
    color: theme.palette.secondary.main,
    '&[active="false"]': {
      opacity: 0,
    },
  },
  timeline: {
    marginTop: 10,
    marginBottom: 10,
  },
  timelineYear: {
    cursor: 'pointer',
    outline: 'none',
    transition: '300ms ease',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
    '&[active="true"]': {
      color: theme.palette.secondary.main,
      transform: 'scale(1.5)',
    },
    '&[adjacent="false"]': {
      opacity: 0,
      display: 'hidden',
      cursor: 'default',
    },
  },
  timelineControl: {
    zIndex: 1,
    // opacity: 1,
    transition: '300ms ease',
    fontSize: 60,
    color: 'white',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
    '&[first="true"]': {
      opacity: 0,
      display: 'none',
    },
  },
  timelineInfo: {
    color: theme.typography.h5.color,
    // [theme.breakpoints.only('xs')]: {
    //   transform: 'scale(0.9)',
    // },
  },
  patchesContainer: {
    marginBottom: 50,
  },
  patch: {
    display: 'block',
    margin: 'auto',
    width: '100%',
    height: 'auto',
    [theme.breakpoints.up('md')]: {
      paddingLeft: 100,
      paddingRight: 100,
    },
  },
  competitionHeading: {
    marginBottom: 15,
  },
  spaceport: {
    margin: '10px auto 10px auto',
    display: 'block',
  },
}));

export default function Faq() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const theme = useTheme();
  const mediaXs = useMediaQuery(theme.breakpoints.only('xs'));

  const mainRocketRef = useRef();

  const [rocketNav, setRocketNav] = useState(null);
  const [timelineNav, setTimelineNav] = useState(null);
  const [infoNav, setInfoNav] = useState(null);
  const rocketSlider = useRef(null);
  const timelineSlider = useRef(null);
  const infoSlider = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    setRocketNav(rocketSlider.current);
    setTimelineNav(timelineSlider.current);
    setInfoNav(infoSlider.current);
  }, []);

  useEffect(() => {
    let anim = lottie.loadAnimation({
      container: mainRocketRef.current,
      renderer: 'canvas',
      loop: false,
      autoplay: true,
      path: '../static/lotties/bigRed1SpinHD.json',
    });

    anim.setSpeed(0.75);

    anim.addEventListener('complete', () => {
      // manually restart the animation to prevent flickering
      anim.goToAndPlay(1, true);
    });

    anim.addEventListener('DOMLoaded', () => {
      console.log('Lottie Loaded');
      gsap.to(
        mainRocketRef.current,
        // { opacity: 0 },
        { duration: 0.5, opacity: 1 }
      );
    });
    return () => {
      anim.destroy();
    };
  }, [mainRocketRef]);


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (


    <div className={classes.root}>
      <Head title='FAQ | Cornell Rocketry Team' />
      <Header />
      <Stars height={600} />
      <Container maxWidth='lg' className={classes.content}>
        <div className={classes.mainRocketContainer}>
          <Grid container spacing={200} justify='center'>
            <Grid item xs={100} md={100} lg={100} xl={100}>
            </Grid>
          </Grid>
        </div>
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography className={classes.heading}></Typography>
            <Typography className={classes.secondaryHeading}>Am I expected to have prior technical experience in order to apply?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nope! What we mainly look for is genuine interest in the team and what we do. We teach our new members everything they need to know.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography className={classes.heading}></Typography>
            <Typography className={classes.secondaryHeading}>
              Do you only accept certain majors?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Once again, nope! A related major is one way to show interest in what we do, but there are many ways to show interest, regardless of major.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography className={classes.heading}></Typography>
            <Typography className={classes.secondaryHeading}>
              I’m unsure which subteam to apply to. Do I have to pick a subteam in order to apply?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              No worries! In our application you can indicate both your first and second choice subteam, and your application will be reviewed by both subteams!
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography className={classes.heading}>*Question 4*</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              *Answer 4*
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Container>
      <Container maxWidth='md'>
        <img
          src='/static/images/rockets-page/rockets/spotlight.png'
          className={classes.timelineSpotlight}
        />
      </Container >
      <Grid container spacing={50}>

        <Grid container>
          <Grid item xs={10} sm={60}></Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          justify='center'
          alignItems='flex-end'
          alignContent='space-between'
          className={classes.patchesContainer}
        >
          <Grid
            item
            xs={10}
            md={10}
            lg={60}
            xl={60}
            className={classes.imgWrapper}
          ></Grid>
        </Grid>
      </Grid>
      <Footer />
    </div >

  );
}

