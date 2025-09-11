import { Button, Container, Grid, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Link from 'next/link';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { makeStyles } from '@mui/styles';

const transitionTime = 0.5;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#0C0C0C',
    borderTop: '1px solid #646464',
    height: 320,
    overflow: 'hidden',
  },
  fullHeight: {
    height: '100%',
  },
  logo: {
    display: 'block',
    width: 100,
    margin: 'auto',
  },
  heading: {
    paddingTop: 10,
    marginBottom: 5,
  },
  link: {
    color: 'lightgrey',
    cursor: 'pointer',
    fontSize: 16,
    display: 'block',
    marginTop: 2,
  },
  socialMediaIcons: {
    textAlign: 'center',
  },
  iconButton: {
    margin: 'auto',
  },
  icon: {
    color: 'lightgrey',
    transform: 'scale(1.5)',
  },
  copyright: {
    // padding: 10,
    textAlign: 'center',
    display: 'block',
    color: 'lightgrey',
    fontSize: 12,
  },
  projectteam: {
    textAlign: 'center',
    display: 'block',
    color: 'lightgrey',
    fontSize: 12,
  },
  equalOpportunityEmployer: {
    textAlign: 'center',
    display: 'block',
    color: 'lightgrey',
    fontSize: 12,
  },
  underlineLink: {
    textDecoration: 'underline',
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container maxWidth='md' disableGutters className={classes.fullHeight}>
        <Grid
          container
          spacing={5}
          className={classes.fullHeight}
          justifyContent='space-evenly'
          alignItems='center'
        >
          <Grid item xs>
            <img src='/static/crt.png' alt='logo' className={classes.logo} />
          </Grid>
          <Grid item xs>
            <CenterLeftAlign>
              <Typography variant='h6' className={classes.heading}>
                Site Map
              </Typography>
              <Link href='/' passHref>
                <Typography variant='body1' className={classes.link}>
                  Home
                </Typography>
              </Link>
              {[
                'Members',
                'Subteams',
                'Rockets',
                'Sponsors',
                'FAQ',
                'Apply',
              ].map((text) => (
                <Link href={`/${text.toLowerCase()}`} key={text} passHref>
                  <Typography variant='body1' className={classes.link}>
                    {text}
                  </Typography>
                </Link>
              ))}
            </CenterLeftAlign>
          </Grid>
          <Grid item xs>
            <CenterLeftAlign>
              <Typography
                variant='h6'
                className={classes.heading}
                align='center'
              >
                Social Media
              </Typography>
              <div className={classes.socialMediaIcons}>
                <SocialMediaButton
                  link='https://www.instagram.com/cornellrocketry/?hl=en/'
                  icon={<InstagramIcon />}
                />
              </div>
            </CenterLeftAlign>
          </Grid>
        </Grid>
        <Typography variant='body1' className={classes.projectteam}>
          Registered Project Team of Cornell University
        </Typography>
        <Typography variant='body1' className={classes.equalOpportunityEmployer}>
          Rocketry is an <a className={classes.underlineLink} href="https://hr.cornell.edu/about/workplace-rights/equal-education-and-employment" target="_blank" rel="noopener noreferrer">equal opportunity employer</a>
        </Typography>
        <Typography variant='body1' className={classes.copyright}>
          &copy; {new Date().getFullYear()} Cornell Rocketry Project Team
        </Typography>
      </Container>
    </div>
  );

  function CenterLeftAlign(children) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div
          style={{ display: 'inline-block', textAlign: 'left' }}
          {...children}
        ></div>
      </div>
    );
  }

  function SocialMediaButton({ link, icon }) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        <IconButton className={classes.iconButton} target='_blank' size='large'>
          <icon.type className={classes.icon} />
        </IconButton>
      </a>
    );
  }
}
