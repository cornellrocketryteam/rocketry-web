import { Container, Grid, Typography } from '@mui/material';

import Footer from '../components/layout/Footer';
import Head from '../components/layout/Head';
import Header from '../components/layout/Header';
import SponsorLogos from '../components/sponsors/SponsorLogos';
import SponsorsInfoJSON from '../public/static/sponsors/sponsors';
import TopContent from '../components/sponsors/TopContent';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: 'hidden',
    backgroundImage: 'url("/static/images/sponsors-page/cornell sunset.png")',
    backgroundPosition: 'center bottom',
    backgroundSize: 'cover',
    width: '100%',
  },
  content: {
    textAlign: 'center',
    padding: '0 20px 20px 20px',
  },
  thankYou: {
    [theme.breakpoints.down('md')]: {
      marginTop: 50,
    },
  },
  skyline: {
    position: 'relative',
    top: 5,
    width: '100%',
  },
}));

export default function Sponsors() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Head title='Sponsors | Cornell Rocketry Team' />
      <Header />

      <Container maxWidth='lg' className={classes.content}>
        <TopContent />
        <Typography variant='h3' className={classes.thankYou}>
          Thank You to Our Sponsors!
        </Typography>

        <SponsorLogos {...SponsorsInfoJSON['SponsorsInfo']} />
      </Container>
      <img
        src='/static/images/sponsors-page/cornell skyline dark.png'
        alt='Cornell Skyline'
        className={classes.skyline}
      />
      <Footer />
    </div>
  );
}
