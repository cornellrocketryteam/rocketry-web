import {
  Container,
  Grid,
  Typography,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';

import Footer from '../components/layout/Footer';
import Head from '../components/layout/Head';
import Header from '../components/layout/Header';
import Stars from '../components/Stars';
import SubteamBLock from '../components/members/SubteamBlock';
import TeamLeads from '../components/members/TeamLeads';
import { TeamMembers } from '../public/static/members/members';

const useStyles = makeStyles((theme) => ({
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
              Our team likes rockets Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Exercitationem iste eos odit, quas inventore,
              quo laudantium, modi vel amet hic blanditiis odio et excepturi aut
              velit expedita ad temporibus dolores.
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
      'embedded software',
      'propulsion',
      'recovery & payload',
      'structures',
    ];

    const categorizedMembers = {};

    categorizedMembers['teamLeads'] = members.filter(
      (member) => member.position == 'team lead'
    );

    categorizedMembers['subteamLeads'] = {};

    categorizedMembers['subteamMembers'] = {};

    subteams.forEach((subteam) => {
      const subteamFiltered = members.filter(
        (member) => member.subteam == subteam
      );

      categorizedMembers['subteamLeads'][subteam] = subteamFiltered.filter(
        (member) => member.position == 'subteam lead'
      );

      categorizedMembers['subteamMembers'][subteam] = subteamFiltered.filter(
        (member) => member.position == 'member'
      );
    });

    return categorizedMembers;
  }
}
