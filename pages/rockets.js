import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Box, Container, Grid, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Footer from '../components/layout/Footer';
import Head from '../components/layout/Head';
import Header from '../components/layout/Header';
import RocketsJson from '../public/static/rockets/rockets';
import Slider from 'react-slick';
import Stars from '../components/Stars';
import { promises as fs } from 'fs';
import { makeStyles } from '@mui/styles';
import path from 'path';

// width of the carousel column, including room for the arrows on either side
const CAROUSEL_WIDTH = 372;
const CAROUSEL_ARROW_GUTTER = 34;
const ROCKET_HEIGHT = 460;
// how much the two flanking rockets shrink relative to the centered one
const ADJACENT_ROCKET_SCALE = 0.65;
// the centered rocket gets a small bump instead, so it clearly reads as "selected"
const ACTIVE_ROCKET_SCALE = 1.08;
// extra vertical room the slider list needs so the scaled-up active rocket
// doesn't get clipped by the list's (required, for horizontal clipping)
// overflow: hidden
const ROCKET_SCALE_OVERFLOW = (ROCKET_HEIGHT * (ACTIVE_ROCKET_SCALE - 1)) / 2;
const ROCKET_NAME_HEIGHT = 34;

const ROCKETS_PAGE_IMAGE_DIR = '/static/images/rockets-page';
const ROCKETS_IMAGE_DIR = `${ROCKETS_PAGE_IMAGE_DIR}/rockets`;
const ACCOLADES_IMAGE_DIR = ROCKETS_PAGE_IMAGE_DIR;
const SUBSYSTEMS_IMAGE_DIR = `${ROCKETS_PAGE_IMAGE_DIR}/subsystems`;

// valkyrie-drawing.svg is a 1024x768 drawing sheet: the vehicle runs down the
// middle of it, with the callout labels laid out in the margins either side.
// Blown up to the height of a page section the sheet's own labels set larger
// than the copy they'd sit behind, so the backdrop shows only this band of it
// - wide enough for the vehicle, narrow enough to leave every label out.
const DRAWING_SHEET_WIDTH = 1024;
const DRAWING_SHEET_HEIGHT = 768;
const DRAWING_BAND_LEFT = 483;
const DRAWING_BAND_RIGHT = 597;
// the band is faded out rather than cut, so the fin tips it clips taper off
const DRAWING_BAND_FADE = 12;
// parses markdown-style [link text](url) spans out of description strings
// (see rockets.json) into clickable <a> elements, leaving everything else as
// plain text
const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;
const renderWithLinks = (text, linkClassName) => {
  if (!text || !text.includes('](')) return text;

  const nodes = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  LINK_PATTERN.lastIndex = 0;
  while ((match = LINK_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    nodes.push(
      <a
        key={key++}
        href={match[2]}
        target='_blank'
        rel='noopener noreferrer'
        className={linkClassName}
      >
        {match[1]}
      </a>
    );
    lastIndex = LINK_PATTERN.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
};

const sheetFraction = (x) => `${((x / DRAWING_SHEET_WIDTH) * 100).toFixed(2)}%`;
const DRAWING_BAND_MASK = `linear-gradient(to right, transparent ${sheetFraction(
  DRAWING_BAND_LEFT
)}, #000 ${sheetFraction(
  DRAWING_BAND_LEFT + DRAWING_BAND_FADE
)}, #000 ${sheetFraction(
  DRAWING_BAND_RIGHT - DRAWING_BAND_FADE
)}, transparent ${sheetFraction(DRAWING_BAND_RIGHT)})`;
// how much wider than the band the whole sheet is: scaling the sheet by this
// much sizes the band itself to 100% of whatever it sits in
const DRAWING_BAND_SCALE =
  DRAWING_SHEET_WIDTH / (DRAWING_BAND_RIGHT - DRAWING_BAND_LEFT);
// how far past the height of the subsystems section the drawing is blown up on
// a wide window
const DRAWING_LARGE_SCALE = 1;

const useStyles = makeStyles((theme) => ({
  content: {
    padding: '120px 50px 50px 50px',
    [theme.breakpoints.only('xs')]: {
      padding: '80px 20px 30px 20px',
    },
  },
  mainRocketContainer: {
    paddingBottom: 80,
    [theme.breakpoints.only('xs')]: {
      paddingBottom: 100,
    },
  },
  // pinned to the viewport (not the content) so it's always visible on
  // load regardless of how tall the hero content is, and doesn't add any
  // extra document height that would push the subsystems section down
  scrollIndicator: {
    position: 'fixed',
    left: '50%',
    bottom: 24,
    transform: 'translateX(-50%)',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 'fit-content',
    cursor: 'pointer',
    color: theme.typography.h5.color,
    opacity: 1,
    pointerEvents: 'auto',
    transition: 'opacity 300ms ease',
    '&[data-hidden="true"]': {
      opacity: 0,
      pointerEvents: 'none',
    },
    '&:hover $scrollIndicatorChevron': {
      animation: '$scrollIndicatorBounce 1.6s ease-in-out infinite',
    },
  },
  scrollIndicatorChevron: {
    fontSize: 32,
    marginTop: -18,
    '&:last-child': {
      animationDelay: '150ms',
    },
  },
  '@keyframes scrollIndicatorBounce': {
    '0%, 100%': {
      transform: 'translateY(0)',
      opacity: 0.5,
    },
    '50%': {
      transform: 'translateY(8px)',
      opacity: 1,
    },
  },
  title: {
    marginBottom: 60,
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
  // title-block-style row: a few stats packed onto one line, separated by
  // vertical rules, to keep the table shorter than one stat per row
  compactRow: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  compactCell: {
    paddingLeft: 14,
    paddingRight: 14,
    '&:first-child': {
      paddingLeft: 0,
    },
    '&:last-child': {
      paddingRight: 0,
    },
  },
  compactCellDivider: {
    borderLeft: `1px solid ${theme.typography.h5.color}`,
  },
  compactLabel: {
    display: 'block',
    color: theme.typography.h5.color,
  },
  compactValue: {
    marginTop: 2,
  },
  // every description is stacked into the same grid cell, so the box is always
  // as tall as the longest one and switching rockets never shifts the layout
  descriptionStack: {
    display: 'grid',
    marginTop: 30,
  },
  description: {
    gridArea: '1 / 1',
    paddingLeft: 10,
    paddingRight: 10,
    color: theme.typography.h5.color,
    transition: 'opacity 300ms ease',
    '&[data-active="false"]': {
      opacity: 0,
      visibility: 'hidden',
    },
  },
  // roughly half the details column, so it sits alongside the description
  // rather than spanning the full width; wraps to full width on mobile
  inlineLink: {
    color: theme.palette.secondary.main,
    textDecoration: 'underline',
    textUnderlineOffset: 2,
    '&:hover': {
      opacity: 0.8,
    },
  },
  accolades: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    maxWidth: '100%',
    [theme.breakpoints.up('md')]: {
      maxWidth: '50%',
    },
  },
  accoladeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    paddingLeft: 10,
  },
  accoladeImage: {
    height: 40,
    width: 'auto',
    flexShrink: 0,
  },
  accoladeText: {
    color: theme.palette.secondary.main,
    fontWeight: 700,
  },
  carouselColumn: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'flex-end',
    },
  },
  carousel: {
    position: 'relative',
    width: '100%',
    maxWidth: CAROUSEL_WIDTH,
  },
  // holds the rocket slider, the spotlight behind it and the two arrows
  rocketStage: {
    position: 'relative',
    padding: `0 ${CAROUSEL_ARROW_GUTTER}px`,
    // the centered rocket is scaled up past the slider track's natural
    // height; the list still needs overflow: hidden to clip the other
    // slides horizontally, so pad it out vertically instead so the scaled
    // rocket's top/bottom aren't cut off by that same clip
    // slick sets an inline `padding` style on this element itself, which
    // otherwise wins over any class-based padding
    '& .slick-list': {
      paddingTop: `${ROCKET_SCALE_OVERFLOW}px !important`,
      paddingBottom: `${ROCKET_SCALE_OVERFLOW}px !important`,
    },
  },
  timelineSpotlight: {
    zIndex: -1,
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    height: ROCKET_HEIGHT + 40,
  },
  timelineRocket: {
    outline: 'none',
    display: 'block',
    margin: 'auto',
    height: ROCKET_HEIGHT,
    transition: '300ms ease',
    '&[active="true"]': {
      transform: `scale(${ACTIVE_ROCKET_SCALE})`,
    },
    '&[active="false"]': {
      '&[adjacent="true"]': {
        opacity: 0.5,
        transform: `scale(${ADJACENT_ROCKET_SCALE})`,
      },
      // invisible slides must not be clickable, or focusOnSelect would jump to
      // a rocket the user cannot see (e.g. the wrapped-around oldest one)
      '&[adjacent="false"]': {
        opacity: 0,
        transform: 'scale(0.45)',
        pointerEvents: 'none',
      },
    },
  },
  // a single fixed-height slot for the selected rocket's name, rendered once
  // (not per-slide) so it never toggles in/out and the year row beneath it
  // never has to shift up or down as the carousel scrolls
  rocketName: {
    height: ROCKET_NAME_HEIGHT,
    marginTop: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
  timeline: {
    marginTop: 4,
    marginBottom: 10,
    padding: `0 ${CAROUSEL_ARROW_GUTTER}px`,
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
      cursor: 'default',
      pointerEvents: 'none',
    },
  },
  timelineControl: {
    position: 'absolute',
    top: '50%',
    zIndex: 1,
    transition: '300ms ease',
    fontSize: 40,
    cursor: 'pointer',
    color: theme.typography.h5.color,
    transform: 'translateY(-50%)',
    '&:hover': {
      color: theme.palette.secondary.main,
    },
    // absolutely positioned inside a reserved gutter, so hiding the arrow at
    // the newest rocket never shifts anything around it
    '&[data-disabled="true"]': {
      opacity: 0,
      pointerEvents: 'none',
    },
  },
  timelineControlPrev: {
    left: -6,
  },
  timelineControlNext: {
    right: -6,
  },
  patchesContainer: {
    marginBottom: 60,
    width: '100%',
    boxSizing: 'border-box',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'flex-end',
    gap: theme.spacing(0.25),
    overflow: 'hidden',
  },
  patchItem: {
    flex: '1 1 0',
    minWidth: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  patch: {
    display: 'block',
    margin: 'auto',
    width: '100%',
    maxWidth: 180,
    height: 'auto',
  },
  competitionHeading: {
    marginBottom: 15,
  },
  spaceport: {
    margin: '10px auto 10px auto',
    display: 'block',
  },
  // the backdrop is absolutely positioned against this. It isn't clipped here:
  // on a wide window the drawing sits out in the page margin, past the edge of
  // the container, so the clipping is done by its own full-window wrapper
  subsystemsSection: {
    position: 'relative',
  },
  // narrow windows: the drawing is clipped to the container it sits behind
  subsystemsBackdropClip: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    overflow: 'hidden',
    pointerEvents: 'none',
    // wide windows: it reaches out past the container to the left edge of the
    // window. It stops at the container's right edge rather than the window's,
    // so nothing can overhang to the right and widen the page - overhang to
    // the left isn't scrollable in a left-to-right page, so it costs nothing
    [theme.breakpoints.up('lg')]: {
      left: `calc((${theme.breakpoints.values.lg}px - 100vw) / 2)`,
      right: 0,
    },
  },
  // the rocket's technical drawing, sized to the full height of the section so
  // it scrolls down past the subsystem rows as the reader works through them
  subsystemsBackdrop: {
    position: 'absolute',
    top: 0,
    aspectRatio: `${DRAWING_SHEET_WIDTH} / ${DRAWING_SHEET_HEIGHT}`,
    maskImage: DRAWING_BAND_MASK,
    WebkitMaskImage: DRAWING_BAND_MASK,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    // narrow windows: the whole vehicle sized to the width of the window and
    // centred, sitting behind the copy - so it's held well back from it
    left: '50%',
    width: `${(DRAWING_BAND_SCALE * 100).toFixed(2)}%`,
    height: 'auto',
    transform: `translateX(-${sheetFraction(
      (DRAWING_BAND_LEFT + DRAWING_BAND_RIGHT) / 2
    )})`,
    opacity: 0.3,
    // wide windows: the drawing is the graphic on the page rather than a wash
    // behind it - full strength, flush to the left edge of the window, and
    // scaled up past the height of the section, which crops the vehicle at the
    // bottom of the section and runs it over the copy on its way there
    [theme.breakpoints.up('lg')]: {
      left: -120,
      width: 'auto',
      height: `${DRAWING_LARGE_SCALE * 100}%`,
      transform: `translateX(-${sheetFraction(DRAWING_BAND_LEFT)})`,
      opacity: 1,
    },
  },
  subsystemsTitle: {
    position: 'relative',
    textAlign: 'center',
    marginBottom: 60,
  },
  subsystemRow: {
    position: 'relative',
    marginBottom: 80,
    '&:last-child': {
      marginBottom: 0,
    },
  },
  subsystemHeader: {
    marginBottom: 20,
  },
  subsystemImage: {
    display: 'block',
    width: '100%',
    height: 'auto',
  },
  subsystemImagePlaceholder: {
    width: '100%',
    minHeight: 320,
    boxSizing: 'border-box',
    border: `1px dashed ${theme.typography.h5.color}`,
    color: theme.typography.h5.color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
}));

export default function Rockets({
  patchesDirectory,
  patchesFileNames,
  rocketImageNames,
}) {
  const classes = useStyles();

  const [rocketNav, setRocketNav] = useState(null);
  const [timelineNav, setTimelineNav] = useState(null);
  const rocketSlider = useRef(null);
  const timelineSlider = useRef(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const subsystemsRef = useRef(null);
  // hide the scroll cue once the user has already started scrolling past it
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollIndicatorHidden(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setRocketNav(rocketSlider.current);
    setTimelineNav(timelineSlider.current);
  }, []);

  const rocketTimelineData = RocketsJson['rockets'];
  const rocketCount = rocketTimelineData.length;

  // the carousel wraps, so react-slick reports -1 / slideCount while animating
  // across the seam — fold those back onto a real rocket
  const normalizeIndex = (index) =>
    ((index % rocketCount) + rocketCount) % rocketCount;

  // -1 = newer neighbour, 0 = centred, 1 = older neighbour, null = hidden.
  // the timeline only loops forward (oldest -> newest), so the newest rocket
  // deliberately has no newer neighbour to show or scroll back to
  const relativePosition = (index) => {
    if (index === slideIndex) return 0;
    if (index === slideIndex - 1) return -1;
    if (index === normalizeIndex(slideIndex + 1)) return 1;
    return null;
  };

  const atNewestRocket = slideIndex === 0;

  const activeRocket = rocketTimelineData[slideIndex];
  // subsystems are per-rocket; older rockets have none written up yet, and the
  // whole section (heading included) stays out of the page for those
  const subsystems = activeRocket.subsystems ?? [];
  const hasSubsystems = subsystems.length > 0;

  // rockets without artwork yet (e.g. an upcoming vehicle) get the placeholder
  const rocketImageSrc = (name) =>
    `${ROCKETS_IMAGE_DIR}/${
      rocketImageNames.includes(name) ? name : 'coming soon'
    }.png`;

  return (
    <div className={classes.root}>
      <Head title='Rockets | Cornell Rocketry Team' />
      <Header />
      <Stars height={600} />

      <Container maxWidth='lg' className={classes.content}>
        <div className={classes.mainRocketContainer}>
          <Typography variant='h2' className={classes.title}>
            Our Rockets
          </Typography>
          <Grid container spacing={5} alignItems='flex-start'>
            <Grid item xs={12} md={7} sx={{ order: { xs: 2, md: 1 } }}>
              <RocketTable
                name={activeRocket.name}
                year={activeRocket.year}
                data={activeRocket.data}
              />
              <div className={classes.descriptionStack}>
                {rocketTimelineData.map((data, index) => (
                  <Typography
                    key={index}
                    variant='body1'
                    className={classes.description}
                    data-active={(slideIndex === index).toString()}
                    aria-hidden={slideIndex !== index}
                  >
                    {renderWithLinks(data.description, classes.inlineLink)}
                  </Typography>
                ))}
              </div>
              {activeRocket.accolades?.length > 0 && (
                <div className={classes.accolades}>
                  {activeRocket.accolades.map((accolade, index) => (
                    <div className={classes.accoladeRow} key={index}>
                      <img
                        src={`${ACCOLADES_IMAGE_DIR}/${accolade.image}`}
                        alt=''
                        className={classes.accoladeImage}
                      />
                      <Typography
                        variant='body1'
                        className={classes.accoladeText}
                      >
                        {accolade.text}
                      </Typography>
                    </div>
                  ))}
                </div>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              md={5}
              sx={{ order: { xs: 1, md: 2 } }}
              className={classes.carouselColumn}
            >
              <div className={classes.carousel}>
                <div className={classes.rocketStage}>
                  <img
                    src={`${ROCKETS_IMAGE_DIR}/spotlight.png`}
                    className={classes.timelineSpotlight}
                    alt=''
                  />
                  <Slider
                    asNavFor={timelineNav}
                    ref={rocketSlider}
                    centerMode={true}
                    slidesToShow={3}
                    centerPadding='0px'
                    focusOnSelect={true}
                    arrows={false}
                    // react-slick either wraps in both directions or neither,
                    // and beforeChange cannot cancel a move it has already
                    // scheduled — so the one-way rule is enforced by taking
                    // gesture/keyboard input away on the newest rocket, the
                    // only slide you could otherwise travel backwards from.
                    // Clicks (arrows, years, adjacent rocket) still work.
                    swipe={!atNewestRocket}
                    draggable={!atNewestRocket}
                    accessibility={!atNewestRocket}
                    beforeChange={(_, next) =>
                      setSlideIndex(normalizeIndex(next))
                    }
                  >
                    {rocketTimelineData.map((data, index) => (
                      <div key={index}>
                        <img
                          className={classes.timelineRocket}
                          src={rocketImageSrc(data.name)}
                          alt={data.name}
                          active={(relativePosition(index) === 0).toString()}
                          adjacent={(
                            Math.abs(relativePosition(index)) === 1
                          ).toString()}
                        />
                      </div>
                    ))}
                  </Slider>
                  <ChevronLeftIcon
                    className={[
                      classes.timelineControl,
                      classes.timelineControlPrev,
                    ].join(' ')}
                    data-disabled={atNewestRocket.toString()}
                    onClick={() => {
                      if (!atNewestRocket) rocketSlider.current?.slickPrev();
                    }}
                  />
                  <ChevronRightIcon
                    className={[
                      classes.timelineControl,
                      classes.timelineControlNext,
                    ].join(' ')}
                    onClick={() => rocketSlider.current?.slickNext()}
                  />
                </div>
                <Typography
                  align='center'
                  variant='h5'
                  className={classes.rocketName}
                >
                  {activeRocket.name.toUpperCase()}
                </Typography>
                <Slider
                  asNavFor={rocketNav}
                  ref={timelineSlider}
                  centerMode={true}
                  slidesToShow={3}
                  centerPadding='0px'
                  focusOnSelect={true}
                  className={classes.timeline}
                  arrows={false}
                  swipe={!atNewestRocket}
                  draggable={!atNewestRocket}
                  accessibility={!atNewestRocket}
                >
                  {rocketTimelineData.map((data, index) => (
                    <Typography
                      align='center'
                      variant='h6'
                      key={index}
                      className={classes.timelineYear}
                      active={(relativePosition(index) === 0).toString()}
                      adjacent={(relativePosition(index) !== null).toString()}
                    >
                      {data.year}
                    </Typography>
                  ))}
                </Slider>
              </div>
            </Grid>
          </Grid>
          <div
            className={classes.scrollIndicator}
            data-hidden={(scrollIndicatorHidden || !hasSubsystems).toString()}
            onClick={() =>
              subsystemsRef.current?.scrollIntoView({ behavior: 'smooth' })
            }
            role='button'
            aria-label='Scroll to subsystems'
          >
            <KeyboardArrowDownIcon className={classes.scrollIndicatorChevron} />
            <KeyboardArrowDownIcon className={classes.scrollIndicatorChevron} />
          </div>
        </div>

      </Container>

      {hasSubsystems && (
        <Container
          maxWidth='lg'
          className={[classes.content, classes.subsystemsSection].join(' ')}
          ref={subsystemsRef}
        >
          {activeRocket.subsystemsBackdrop && (
            <div className={classes.subsystemsBackdropClip} aria-hidden='true'>
              <div
                className={classes.subsystemsBackdrop}
                style={{
                  backgroundImage: `url('${ROCKETS_PAGE_IMAGE_DIR}/${activeRocket.subsystemsBackdrop}')`,
                }}
              />
            </div>
          )}
          <Typography variant='h2' className={classes.subsystemsTitle}>
            Subsystems
          </Typography>
          {subsystems.map((subsystem, index) => {
            const textOnRight = index % 2 === 1;
            return (
              <Grid
                container
                spacing={5}
                alignItems='center'
                className={classes.subsystemRow}
                key={subsystem.name}
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ order: { xs: 1, md: textOnRight ? 2 : 1 } }}
                >
                  <Typography
                    variant='h4'
                    color='secondary'
                    className={classes.subsystemHeader}
                    align={textOnRight ? 'right' : 'left'}
                  >
                    {subsystem.name.toUpperCase()}
                  </Typography>
                  <Typography
                    variant='body1'
                    align={textOnRight ? 'right' : 'left'}
                  >
                    {renderWithLinks(subsystem.description, classes.inlineLink)}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ order: { xs: 2, md: textOnRight ? 1 : 2 } }}
                >
                  {subsystem.image ? (
                    <img
                      src={`${SUBSYSTEMS_IMAGE_DIR}/${subsystem.image}`}
                      alt={subsystem.name}
                      className={classes.subsystemImage}
                    />
                  ) : (
                    <div className={classes.subsystemImagePlaceholder}>
                      <Typography variant='body1'>
                        {subsystem.name} image coming soon
                      </Typography>
                    </div>
                  )}
                </Grid>
              </Grid>
            );
          })}
        </Container>
      )}

      <Box className={classes.patchesContainer}>
        {patchesFileNames.map((fileName) => (
          <Box key={fileName} className={classes.patchItem}>
            <img
              src={`${patchesDirectory}/${fileName}`}
              alt={`${fileName}`}
              className={classes.patch}
            />
          </Box>
        ))}
      </Box>

      <Container maxWidth='lg' className={classes.content}>
          <Typography
            variant='h4'
            color='secondary'
            className={classes.competitionHeading}
          >
            THE COMPETITION
          </Typography>

          <Typography variant='h6'>
            Every year, over 1,700 students and faculty gather in West Texas to compete in the International Rocket Engineering Competition (IREC) &mdash;
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
                src='/static/images/rockets-page/ireclogo.png'
                alt='IREC'
                height={150}
              />
              <Typography
                className={classes.spaceportText}
                variant='h4'
                color='secondary'
                align='center'
              >
                IREC
              </Typography>
            </Grid>
          </Grid>
          <Box py={5}></Box>
      </Container>
      <Footer />
    </div>
  );

  function RocketTable({ name, year, data, size }) {
    // title-block layout: height/diameter/launch mass share a line, motor
    // diameter/motor share a line, everything else falls back to one stat
    // per row as before
    const compactGroups = [
      ['height', 'diameter', 'launch mass'],
      ['motor diameter', 'motor'],
    ];
    const grouped = new Set(compactGroups.flat());
    const rowsByProperty = new Map(data.map((row) => [row.property, row]));
    const leftoverRows = data.filter((row) => !grouped.has(row.property));

    return (
      <>
        {name && <RocketHeader name={name} year={year} />}
        <hr className={classes.bigLine} />
        {compactGroups.map((properties) => {
          const items = properties
            .map((property) => rowsByProperty.get(property))
            .filter(Boolean);
          return items.length > 0 ? (
            <CompactRow key={properties.join('-')} items={items} size={size} />
          ) : null;
        })}
        {leftoverRows.map((row) => (
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

  function CompactRow({ items, size }) {
    const variant = size == 'small' ? 'body1' : 'h5';
    return (
      <Grid container className={classes.compactRow}>
        {items.map((row, index) => (
          <Grid
            item
            xs={12 / items.length}
            key={row.property}
            className={[
              classes.compactCell,
              index > 0 ? classes.compactCellDivider : '',
            ].join(' ')}
          >
            <Typography variant='caption' className={classes.compactLabel}>
              {row.property.toUpperCase()}
            </Typography>
            <Typography variant={variant} className={classes.compactValue}>
              {row.value}
            </Typography>
          </Grid>
        ))}
        <Grid item xs={12}>
          <hr className={classes.smallLine} />
        </Grid>
      </Grid>
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

}

export async function getStaticProps() {
  const subteams = [
    'business',
    'electrical',
    'embedded software',
    'propulsion',
    'recovery & payload',
    'structures',
  ];

  const patchesDirectory = path.join(
    process.cwd(),
    'public/static/images/rockets-page/patches'
  );

  const patchesFileNames = await fs.readdir(patchesDirectory);

  patchesFileNames.sort((a, b) => {
    return b.localeCompare(a);
  });

  const rocketImageNames = (
    await fs.readdir(path.join(process.cwd(), 'public', ROCKETS_IMAGE_DIR))
  )
    .filter((fileName) => fileName.endsWith('.png'))
    .map((fileName) => fileName.replace(/\.png$/, ''));

  return {
    props: {
      patchesDirectory: patchesDirectory.split('public')[1],
      patchesFileNames: patchesFileNames,
      rocketImageNames: rocketImageNames,
    },
  };
}
