import {
  makeStyles,
  Grid,
  Typography,
  Container,
  useMediaQuery,
} from '@material-ui/core';
import Header from '../components/layout/Header';
import Stars from '../components/Stars';
import Head from '../components/layout/Head';
import Footer from '../components/layout/Footer';

import { promises as fs } from 'fs';
import path from 'path';

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
  teamLeadContainer: {
    marginTop: 60,
  },
  teamHeading: {
    color: theme.palette.secondary.main,
    margin: '40px 0 20px 0',
  },
  teamLeadPic: {
    display: 'block',
    margin: 'auto',
    width: '100%',
    maxWidth: 210,
  },
  subteam: {
    marginBottom: 8,
    color: '#bbbbbb',
  },
  subteamLeadPic: {
    display: 'block',
    margin: 'auto',
    width: '100%',
    maxWidth: 200,
  },
  name: {
    marginTop: 8,
    marginBottom: 8,
    // whiteSpace: 'nowrap',
  },
  subteamLeadLabel: {
    color: '#bbbbbb',
  },

  subteamsContainer: {
    marginBottom: 100,
  },
}));

export default function Members({ members, subteamLeads, teamLeads }) {
  const xs = useMediaQuery('(max-width:600px)'); //true for extra small screen sizes
  const classes = useStyles();

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

      <Container maxWidth='lg' className={classes.teamLeadContainer}>
        <Typography variant='h4' align='center' className={classes.teamHeading}>
          TEAM LEADS
        </Typography>
        <Grid
          container
          justifyContent='center'
          alignItems='flex-start'
          spacing={3}
        >
          {teamLeads.fileNames.map((name) => (
            <Grid item sm={4} md={3} key={name}>
              <img
                src={teamLeads.dir + '\\' + name}
                alt={name}
                className={classes.teamLeadPic}
              />
              <Typography
                variant='body1'
                align='center'
                className={classes.name}
              >
                {name.split('.')[0]}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth='lg' className={classes.subteamLeadContainer}>
        <Typography variant='h4' align='center' className={classes.teamHeading}>
          SUBTEAM LEADS
        </Typography>
        <Grid
          container
          justifyContent='space-evenly'
          alignItems='flex-start'
          spacing={3}
        >
          {subteamLeads.map((subteam) => (
            <Grid item sm={4} md={4} lg={2} key={subteam}>
              <Typography
                variant='body1'
                align='center'
                className={classes.subteam}
              >
                {subteam.subteam.toUpperCase()}
              </Typography>

              {subteam.fileNames.map((fileName) => (
                <div key={fileName}>
                  <img
                    src={subteam.dir + '\\' + fileName}
                    alt={fileName}
                    className={classes.subteamLeadPic}
                  />
                  <Typography
                    variant='body1'
                    align='center'
                    className={classes.name}
                  >
                    {fileName.split('.')[0]}
                  </Typography>
                </div>
              ))}
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container maxWidth='lg' className={classes.subteamsContainer}>
        {members.map((subteam, index) => (
          <div key={subteam}>
            <>
              <Typography
                variant='h4'
                align='center'
                className={classes.teamHeading}
                key={subteam}
              >
                {subteam.subteam.toUpperCase()}
              </Typography>
              <Grid
                container
                justifyContent='center'
                alignItems='flex-start'
                spacing={3}
              >
                {subteamLeads[index].fileNames.map((name) => (
                  <Grid item sm={4} md={4} lg={2} key={name}>
                    <img
                      src={subteamLeads[index].dir + '\\' + name}
                      alt={name}
                      className={classes.subteamLeadPic}
                    />
                    <Typography
                      variant='body1'
                      align='center'
                      className={classes.name}
                    >
                      {name.split('.')[0]}
                    </Typography>
                    <Typography
                      variant='body2'
                      align='center'
                      className={classes.subteamLeadLabel}
                    >
                      <i>Subteam Lead</i>
                    </Typography>
                  </Grid>
                ))}
                {subteam.fileNames.map((name) => (
                  <Grid item sm={4} md={4} lg={2} key={name}>
                    <img
                      src={subteam.dir + '\\' + name}
                      alt={name}
                      className={classes.subteamLeadPic}
                    />
                    <Typography
                      variant='body1'
                      align='center'
                      className={classes.name}
                    >
                      {name.split('.')[0]}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </>
          </div>
        ))}
      </Container>
      <Footer />
    </div>
  );
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

  const teamDirectory = path.join(
    process.cwd(),
    'public/static/images/team-page'
  );

  const membersImages = subteams.map(async (subteam) => {
    var subteamDirectory = path.join(teamDirectory, 'members', subteam);
    var fileNames = await fs.readdir(subteamDirectory);

    return {
      subteam,
      dir: subteamDirectory.split('public')[1],
      fileNames,
    };
  });

  const subteamLeadImages = subteams.map(async (subteam) => {
    var subteamDirectory = path.join(teamDirectory, 'subteam leads', subteam);
    var fileNames = await fs.readdir(subteamDirectory);

    return {
      subteam,
      dir: subteamDirectory.split('public')[1],
      fileNames,
    };
  });

  const teamLeadDirectory = path.join(teamDirectory, 'team leads');
  const fileNames = await fs.readdir(teamLeadDirectory);
  const teamLeadImages = {
    dir: teamLeadDirectory.split('public')[1],
    fileNames,
  };

  return {
    props: {
      members: await Promise.all(membersImages),
      subteamLeads: await Promise.all(subteamLeadImages),
      teamLeads: teamLeadImages,
    },
  };
}
