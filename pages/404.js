import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Header from '../components/layout/Header';
import Head from '../components/layout/Head';
import Footer from '../components/layout/Footer';

const useStyles = makeStyles((theme) => ({
  background: {
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage:
      "linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url('/static/images/404-page/large.png')",
    [theme.breakpoints.down('lg')]: {
      backgroundImage:
        "linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url('/static/images/404-page/medium.png')",
    },
    [theme.breakpoints.only('xs')]: {
      backgroundImage:
        "linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url('/static/images/404-page/small.png')",
    },
  },
  text: {
    width: '90%',
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  error: {
    fontSize: 120,
    [theme.breakpoints.up('lg')]: {
      fontSize: 200,
    },
  },
}));

export default function Custom404() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.background}>
        <Head title='404 | Cornell Rocketry Team' />
        <Header />
        <div className={classes.text}>
          <Typography variant='h1' align='center' className={classes.error}>
            404
          </Typography>
          <Typography variant='h3' align='center'>
            Oops! Looks like you're lost in space!
          </Typography>
        </div>
      </div>
      <Footer />
    </div>
  );
}
