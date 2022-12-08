import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import {
  makeStyles,
  Grid,
  Typography,
  Container,
  useMediaQuery,
} from '@material-ui/core';
import Header from '../components/layout/Header';
import Head from '../components/layout/Head';
import Footer from '../components/layout/Footer';

import { promises as fs } from 'fs';
import path from 'path';

const useStyles = makeStyles((theme) => ({
  teamLeadContainer: {
    marginTop: 100,
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

      <Container maxWidth='lg' className={classes.teamLeadContainer}>
        <Typography variant='h2' align='center' className={classes.title}>
          Our Team
        </Typography>
        <Typography variant='h4' align='center' className={classes.teamHeading}>
          TEAM LEADS
        </Typography>
        <Grid container justify='center' alignItems='flex-start' spacing={3}>
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
          justify='space-evenly'
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
                justify='center'
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
