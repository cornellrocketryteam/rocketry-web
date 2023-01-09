import { Button, Container, Grid, Hidden, Typography } from '@mui/material';

import Footer from '../components/layout/Footer';
import Head from '../components/layout/Head';
import Header from '../components/layout/Header';
import { SponsorsInfo } from '../public/static/sponsors/sponsors';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: 'hidden',
    backgroundImage: 'url("/static/images/sponsors-page/cornell sunset.png")',
    backgroundPosition: 'center bottom',
    backgroundSize: 'cover',
    width: '100%',
  },
  stars: {
    objectFit: 'cover',
    height: 500,
    width: '100%',
    position: 'absolute',
    [theme.breakpoints.only('xs')]: {
      height: 700,
    },
  },
  content: {
    textAlign: 'center',
    padding: '0 20px 20px 20px',
  },
  rocket: {
    margin: '100px auto 20px auto',
    display: 'block',
    height: 850,
    [theme.breakpoints.down('md')]: {
      height: 500,
      margin: '30px auto 0 auto',
    },
    [theme.breakpoints.down('sm')]: {
      height: 400,
    },
  },
  helpUs: {
    fontWeight: 600,
  },
  topText: {
    marginTop: 30,
  },
  topButton: {
    margin: 25,
    fontSize: '1.1rem',
    textTransform: 'none',
  },
  thankYou: {
    [theme.breakpoints.down('md')]: {
      marginTop: 50,
    },
  },
  sponsorLevel: {
    margin: '50px 0 20px 0',
  },
  sponsorLogo: {
    padding: '10px 30px 10px 30px',
    maxWidth: 300,
    width: '100%',
    filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.7))',
  },
  bigLine: {
    color: '#bbbbbb',
    backgroundColor: '#bbbbbb',
    height: 3,
    border: 'none',
    marginBottom: 12,
  },
  contributer: {
    margin: 10,
    color: 'black',
  },
  skyline: {
    position: 'relative',
    top: 7,
    width: '100%',
    zIndex: 0,
  },
}));

export default function Sponsors() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Head title='Sponsors | Cornell Rocketry Team' />
      <Header />
      <Container maxWidth='lg' className={classes.content}>
        <Grid container spacing={3} justifyContent='center' alignItems='center'>
          <Grid item xs={12} md={5}>
            <Hidden mdDown>
              <Typography
                variant='h2'
                align='center'
                color='secondary'
                className={classes.helpUs}
              >
                Help Us
              </Typography>
              {TopLeftContent()}
            </Hidden>
          </Grid>
          <Grid item xs={12} md={1}>
            <img
              src='/static/images/sponsors-page/rocket launch.png'
              alt='rocket'
              className={classes.rocket}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography
              variant='h2'
              align='center'
              color='secondary'
              className={classes.helpUs}
            >
              <Hidden mdUp>Help Us </Hidden>
              Blast Off
            </Typography>
            {TopRightContent()}
          </Grid>
        </Grid>
        <Typography variant='h3' className={classes.thankYou}>
          Thank You to Our Sponsors!
        </Typography>

        <SponsorLogos {...SponsorsInfo} />
      </Container>
      <img
        src='/static/images/sponsors-page/cornell skyline dark.png'
        alt='Cornell Skyline'
        className={classes.skyline}
      />
      <Footer />
    </div>
  );

  function TopLeftContent() {
    return (
      <>
        <Typography variant='body1' className={classes.topText} align='justify'>
          Cornell Rocketry would like to express our gratitude to all of our
          sponsors for supporting our various endeavors and goals. Our progress
          as a team has been attributed to your generosity and belief in the
          team's ability to achieve great things. None of our accomplishments
          would have been possible without your donations.
        </Typography>
        <Hidden mdDown>
          <br />
        </Hidden>
        <Button
          href='https://securelb.imodules.com/s/1717/giving/interior.aspx?sid=1717&gid=2&pgid=403&cid=1031&dids=145&bledit=1'
          target='_blank'
          variant='contained'
          color='secondary'
          className={classes.topButton}
        >
          Donate
        </Button>
      </>
    );
  }

  function TopRightContent() {
    return (
      <>
        <Hidden mdUp>{TopLeftContent()}</Hidden>
        <Typography variant='body1' className={classes.topText} align='justify'>
          If you are interested in becoming a sponsor for Cornell Rocketry, we
          would love to hear from you. To learn more about sponsorship, feel
          free to review our sponsorship packet. We have provided a link to
          donate to our team below. Please specify that the donation is for the
          Cornell Rocketry Team! We are a 501(c)(3) organization and all
          donations are tax deductible.
        </Typography>
        <Button
          href='/static/CRT Sponsorship Packet.pdf'
          target='_blank'
          variant='contained'
          color='secondary'
          className={classes.topButton}
        >
          Sponsorship Packet
        </Button>
      </>
    );
  }

  function SponsorLogos({ imageDir, levels, contributers }) {
    return (
      <>
        {Object.keys(levels).map((levelName) => (
          <SponsorLevelBlock
            key={levelName}
            imageDir={imageDir}
            levelName={levelName}
            sponsors={levels[levelName]}
          />
        ))}
        <Contributers contributers={contributers} />
      </>
    );
  }

  function SponsorLevelBlock({ imageDir, levelName, sponsors }) {
    return (
      <>
        <Typography variant='h5' className={classes.sponsorLevel}>
          {levelName.toUpperCase() + ' SPONSORS'}
        </Typography>
        <Grid container spacing={3} justifyContent='center' alignItems='center'>
          {sponsors.map(({ name, link }) => (
            <Grid item key={name} xs={12} sm={4} md={3}>
              <a href={link} target='_blank' rel='noopener noreferrer'>
                <img
                  src={`${imageDir}${name}.png`}
                  alt={name}
                  className={classes.sponsorLogo}
                />
              </a>
            </Grid>
          ))}
        </Grid>
        <hr className={classes.bigLine} />
      </>
    );
  }

  function Contributers({ contributers }) {
    return (
      <>
        <Typography variant='h5' className={classes.sponsorLevel}>
          CONTRIBUTERS
        </Typography>
        <Grid container spacing={3} justifyContent='center' alignItems='center'>
          {contributers.sort().map((name) => (
            <Grid item key={name} xs={12} sm={4} md={3}>
              <Typography variant='h4' className={classes.contributer}>
                The {name} Family
              </Typography>
            </Grid>
          ))}
        </Grid>
      </>
    );
  }
}
