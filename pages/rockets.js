import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { Box, Container, Grid, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
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
  subsystemsTitle: {
    textAlign: 'center',
    marginBottom: 60,
  },
  subsystemRow: {
    marginBottom: 80,
    '&:last-child': {
      marginBottom: 0,
    },
  },
  subsystemHeader: {
    marginBottom: 20,
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

const ROCKETS_IMAGE_DIR = '/static/images/rockets-page/rockets';
const ACCOLADES_IMAGE_DIR = '/static/images/rockets-page';

// placeholder copy — swap in real subsystem writeups later
const SUBSYSTEMS = [
  {
    name: 'Payload',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam. Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
  },
  {
    name: 'BLiMS',
    description:
      'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident. Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.',
  },
  {
    name: 'AV Bay',
    description:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  {
    name: 'Propulsion',
    description:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio, nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
];

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
                    {data.description}
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
        </div>

      </Container>

      <Container maxWidth='lg' className={classes.content}>
        <Typography variant='h2' className={classes.subsystemsTitle}>
          Subsystems
        </Typography>
        {SUBSYSTEMS.map((subsystem, index) => {
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
                  {subsystem.description}
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                sx={{ order: { xs: 2, md: textOnRight ? 1 : 2 } }}
              >
                <div className={classes.subsystemImagePlaceholder}>
                  <Typography variant='body1'>
                    {subsystem.name} image coming soon
                  </Typography>
                </div>
              </Grid>
            </Grid>
          );
        })}
      </Container>

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
