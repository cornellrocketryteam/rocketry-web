import { Container, Grid, Typography, makeStyles } from '@material-ui/core';

import Footer from '../components/layout/Footer';
import Head from '../components/layout/Head';
import Header from '../components/layout/Header';
import Stars from '../components/Stars';
import SubteamBLock from '../components/members/SubteamBlock';
import TeamLeads from '../components/members/TeamLeads';
import { TeamMembers } from '../public/static/members/members';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  content: {
    // matches rockets page
    padding: '120px 50px 50px 50px',
    [theme.breakpoints.only('xs')]: {
      padding: '80px 20px 30px 20px',
    },
  },
  description: {
    // matches rockets page
    marginTop: 30,
    paddingLeft: 10,
    paddingRight: 10,
    color: theme.typography.h5.color,
    // doesnt match rockets page
    fontSize: 18,
  },
  teamPic: {
    display: 'flex',
    width: '100%',
    margin: 'auto',
    border: '2px solid #8D8D8D',
  },
}));

export default function Members() {
  // const xs = useMediaQuery('(max-width:600px)'); //true for extra small screen sizes
  const classes = useStyles();

  const imageDir = TeamMembers.imageDir;
  const categorizedMembers = categorizeMembers(TeamMembers.members);

  return (
    <div className={classes.root}>
      <Head title='Members | Cornell Rocketry Team' />
      <Header />
      <Stars height={600} />

      <Container maxWidth='lg' className={classes.content}>
        <Grid container spacing={5}>
          <Grid item xs={9} md={8} lg={6} xl={6}>
            <Typography variant='h2' className={classes.title}>
              Our Team
            </Typography>
            <Typography className={classes.description}>
              Cornell Rocketry Team (CRT) is an engineering student project team
              dedicated to designing, assembling, and launching high-powered
              rockets. Since 2012, we have been working to provide hands-on
              experience in aerospace engineering. CRT has six sub teams:
              business, electrical, software, propulsion, recovery and payload,
              and structures.
              <br />
              <br />
              Click on any of our members below to learn more about them!
            </Typography>
          </Grid>
          <Grid item xs={9} md={8} lg={6} xl={6}>
            <img
              src='/static/images/apply-page/team pic.jpg'
              alt='CRT Team Picture'
              className={classes.teamPic}
            />
          </Grid>
        </Grid>
      </Container>

      <TeamLeads
        imageDir={imageDir}
        teamLeads={categorizedMembers['teamLeads']}
      />

      <SubteamBLock
        imageDir={imageDir}
        subteamLeads={categorizedMembers['subteamLeads']}
        subteamMembers={categorizedMembers['subteamMembers']}
      />
      <Footer />
    </div>
  );

  function categorizeMembers(members) {
    const subteams = [
      'business',
      'electrical',
      'software',
      'propulsion',
      'recovery and payload',
      'structures',
    ];

    const categorizedMembers = {};

    categorizedMembers['teamLeads'] = members.filter(
      (member) => member.position.toLowerCase() == 'team lead'
    );

    categorizedMembers['subteamLeads'] = {};

    categorizedMembers['subteamMembers'] = {};

    subteams.forEach((subteam) => {
      const subteamFiltered = members.filter(
        (member) => member.subteam.toLowerCase() == subteam
      );

      categorizedMembers['subteamLeads'][subteam] = subteamFiltered.filter(
        (member) => member.position.toLowerCase() == 'subteam lead'
      );

      categorizedMembers['subteamMembers'][subteam] = subteamFiltered.filter(
        (member) => member.position.toLowerCase() == 'member'
      );
    });

    return categorizedMembers;
  }
}
