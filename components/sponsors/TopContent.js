import {
  Button,
  Grid,
  Hidden,
  Typography,
  makeStyles,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  rocket: {
    margin: '100px auto 20px auto',
    display: 'block',
    height: 850,
    [theme.breakpoints.down('sm')]: {
      height: 500,
      margin: '30px auto 0 auto',
    },
    [theme.breakpoints.down('xs')]: {
      height: 400,
    },
  },
  heading: {
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
}));

export default function TopContent() {
  const classes = useStyles();

  return (
    <Grid container spacing={3} justifyContent='center' alignItems='center'>
      <Grid item xs={12} md={5}>
        <Hidden smDown>
          <Typography
            variant='h2'
            align='center'
            color='secondary'
            className={classes.heading}
          >
            Help Us
          </Typography>
          <TopLeftContent />
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
          className={classes.heading}
        >
          <Hidden mdUp>Help Us </Hidden>
          Blast Off
        </Typography>
        <TopRightContent />
      </Grid>
    </Grid>
  );

  function TopLeftContent() {
    const classes = useStyles();

    return (
      <>
        <Typography variant='body1' className={classes.topText} align='justify'>
          Cornell Rocketry would like to express our gratitude to all of our
          sponsors for supporting our various endeavors and goals. Our progress
          as a team has been attributed to your generosity and belief in the
          team's ability to achieve great things. None of our accomplishments
          would have been possible without your donations.
        </Typography>
        <Hidden smDown>
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
    const classes = useStyles();

    return (
      <>
        <Hidden mdUp>
          <TopLeftContent />
        </Hidden>
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
}
