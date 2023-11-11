import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {
  Box,
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Footer from '../components/layout/Footer';
import Head from '../components/layout/Head';
import Header from '../components/layout/Header';
import RocketsJson from '../public/static/rockets/rockets';
import Slider from 'react-slick';
import Stars from '../components/Stars';
import { gsap } from 'gsap/dist/gsap';
import lottie from 'lottie-web';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: '120px 50px 50px 50px',
    [theme.breakpoints.only('xs')]: {
      padding: '80px 20px 30px 20px',
    },
  },
  mainRocketContainer: {
    minHeight: 'calc(100vh - 70px)',
    [theme.breakpoints.only('xs')]: {
      paddingBottom: 100,
    },
  },
  title: {
    marginBottom: 60,
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
    [theme.breakpoints.down('md')]: {
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
    height: 450,
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
    marginBottom: 60,
  },
  patch: {
    display: 'block',
    margin: 'auto',
    width: '100%',
    height: 'auto',
    [theme.breakpoints.up('md')]: {
      paddingLeft: 50,
      paddingRight: 50,
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

export default function Rockets() {
  const classes = useStyles();
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

  const rocketTimelineData = RocketsJson['rockets'];

  return (
    <div className={classes.root}>
      <Head title='Rockets | Cornell Rocketry Team' />
      <Header />
      <Stars height={600} />

      <Container maxWidth='lg' className={classes.content}>
        <div className={classes.mainRocketContainer}>
          <Grid container spacing={5} justifyContent='center'>
            <Grid item xs={9} md={8} lg={6} xl={6}>
              <Typography variant='h2' className={classes.title}>
                Our Rockets
              </Typography>
              <RocketTable
                name={rocketTimelineData[0].name}
                year={rocketTimelineData[0].year}
                data={rocketTimelineData[0].data}
              />
              <Typography variant='body1' className={classes.description}>
                {rocketTimelineData[0].description}
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}
              md={4}
              lg={6}
              xl={6}
              className={classes.imgWrapper}
            >
              <div ref={mainRocketRef} className={classes.rocketImage}>
                <img
                  src='/static/images/rockets-page/rockets/spotlight.png'
                  className={classes.spotlight}
                />
              </div>
            </Grid>
          </Grid>
        </div>

        <Container maxWidth='md'>
          <img
            src='/static/images/rockets-page/rockets/spotlight.png'
            className={classes.timelineSpotlight}
          />
          <Slider
            asNavFor={timelineNav}
            ref={rocketSlider}
            centerMode={true}
            slidesToShow={!mediaXs ? 3 : 1}
            centerPadding='20px'
            focusOnSelect={true}
            beforeChange={(_, next) => {
              setSlideIndex(next);
              infoSlider.current.slickGoTo(next);
            }}
            prevArrow={<TimelinePrev />}
            nextArrow={<TimelineNext />}
          >
            {rocketTimelineData.map((data, index) => (
              <div key={index}>
                <img
                  className={classes.timelineRocket}
                  src={`/static/images/rockets-page/rockets/${data.name}.png`}
                  alt={data.name}
                  active={(slideIndex === index).toString()}
                  adjacent={(
                    slideIndex === index + 1 || slideIndex === index - 1
                  ).toString()}
                />
                <Typography
                  className={classes.timelineLabel}
                  align='center'
                  variant='h5'
                  active={(slideIndex === index).toString()}
                >
                  {data.name.toUpperCase()}
                </Typography>
              </div>
            ))}
          </Slider>
          <Slider
            asNavFor={rocketNav}
            ref={timelineSlider}
            centerMode={true}
            slidesToShow={!mediaXs ? 3 : 3}
            centerPadding='20px'
            focusOnSelect={true}
            className={classes.timeline}
            arrows={false}
          >
            {rocketTimelineData.map((data, index) => (
              <Typography
                align='center'
                variant='h6'
                key={index}
                className={classes.timelineYear}
                active={(slideIndex === index).toString()}
                adjacent={(Math.abs(index - slideIndex) <= 2).toString()}
              >
                {data.year}
              </Typography>
            ))}
          </Slider>
          <Slider
            ref={infoSlider}
            slidesToShow={1}
            swipe={false}
            centerPadding='20px'
            arrows={false}
            fade={true}
          >
            {rocketTimelineData.map((data, index) => (
              <div className={classes.timelineInfo} key={index}>
                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <RocketTable key={index} data={data.data} size='small' />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant='body1'>{data.description}</Typography>
                  </Grid>
                </Grid>
              </div>
            ))}
          </Slider>
        </Container>
        <Grid
          container
          spacing={6}
          justifyContent='center'
          alignItems='flex-end'
          alignContent='space-between'
          className={classes.patchesContainer}
        >
          {[2018, 2019, 2020, 2021, 2022, 2023].map((year) => (
            <Grid item xs={8} sm={4} key={year}>
              <img
                src={`/static/images/rockets-page/patches/${year}Patch.png`}
                alt={`${year} Patch`}
                className={classes.patch}
              />
            </Grid>
          ))}
        </Grid>
        <Typography
          variant='h4'
          color='secondary'
          className={classes.competitionHeading}
        >
          THE COMPETITION
        </Typography>

        <Typography variant='h6'>
          Every year, over 1,700 students and faculty gather in Southern New
          Mexico to compete in the Spaceport America Cup &mdash;
          <b>
            the world’s largest intercollegiate rocket engineering competition
          </b>
          . These competitors represent the best and brightest from more than
          150 institutions located all across the world. Cornell Rocketry Team
          is proud to represent our team each year and compete for the cup!
        </Typography>
        <hr className={classes.bigLine} />
        <Grid container>
          <Grid item xs={12} sm={9}>
            <Typography variant='h6'>
              <b>The requirements for the competion include...</b>
              <ul>
                <li>
                  <Typography variant='body1'>
                    Constructing a rocket sufficiently durable so that it may be
                    launched, recovered, and re-launched repeatedly
                  </Typography>
                </li>
                <li>
                  <Typography variant='body1'>
                    Creating a communications system that will track the rocket
                    and relay its flight information and location coordinates
                  </Typography>
                </li>
                <li>
                  <Typography variant='body1'>
                    Launching to precisely 10,000 feet above ground level
                  </Typography>
                </li>
                <li>
                  <Typography variant='body1'>
                    Reaching the required height with a one engine stage
                  </Typography>
                </li>

                <li>
                  <Typography variant='body1'>
                    Deploying a guided parafoil which ejects from the forward
                    section during descent
                  </Typography>
                </li>
              </ul>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <img
              className={classes.spaceport}
              src='/static/images/rockets-page/spaceport.png'
              alt='Spaceport America Cup'
              height={150}
            />
            <Typography
              className={classes.spaceportText}
              variant='h4'
              color='secondary'
              align='center'
            >
              SPACEPORT <br /> AMERICA <br /> CUP
            </Typography>
          </Grid>
        </Grid>
        <Box py={5}></Box>
      </Container>
      <Footer />
    </div>
  );

  function RocketTable({ name, year, data, size }) {
    return (
      <>
        {name && <RocketHeader name={name} year={year} />}
        <hr className={classes.bigLine} />
        {data.map((row) => (
          <RocketRow
            key={row.property}
            property={row.property}
            value={row.value}
            size={size}
          />
        ))}
      </>
    );
  }

  function RocketHeader({ name, year }) {
    return (
      <Grid container>
        <Grid item xs={6}>
          <Typography variant='h4' color='secondary'>
            {name.toUpperCase()}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h4' align='right'>
            {year}
          </Typography>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    );
  }

  function RocketRow({ property, value, size }) {
    return (
      <Grid container className={classes.tableRow}>
        <Grid item xs={6}>
          <Typography variant={size == 'small' ? 'body1' : 'h5'}>
            {property.toUpperCase()}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant={size == 'small' ? 'body1' : 'h5'} align='right'>
            {value}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <hr className={classes.smallLine} />
        </Grid>
      </Grid>
    );
  }

  function TimelinePrev({ className, onClick }) {
    return (
      <ChevronLeftIcon
        className={[className, classes.timelineControl].join(' ')}
        onClick={onClick}
        first={(slideIndex === 0).toString()}
      />
    );
  }
  function TimelineNext({ className, onClick }) {
    return (
      <ChevronRightIcon
        className={[className, classes.timelineControl].join(' ')}
        onClick={onClick}
      />
    );
  }
}
