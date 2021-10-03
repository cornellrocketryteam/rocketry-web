import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
  IconButton,
  Container,
  Typography,
} from '@material-ui/core';

import Link from 'next/link';

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import MenuIcon from '@material-ui/icons/Menu';

const transitionTime = 0.5;

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#0C0C0C',
    borderTop: '1px solid #646464',
    height: 300,
  },
  fullHeight: {
    height: '100%',
  },
  logo: {
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
            <Typography variant='h6' className={classes.heading}>
              Site Map
            </Typography>
            <Link href='/' passHref>
              <Typography variant='body' className={classes.link}>
                Home
              </Typography>
            </Link>
            {['Team', 'Rockets', 'Sponsors', 'Apply'].map((text) => (
              <>
                <Link href={`/${text.toLowerCase()}`} key={text} passHref>
                  <Typography variant='body' className={classes.link}>
                    {text}
                  </Typography>
                </Link>
              </>
            ))}
            <a
              href='https://cornellrocketryadmin.com/php/AdminMain.php'
              target='_blank'
            >
              <Typography variant='body' className={classes.link}>
                Login
              </Typography>
            </a>
          </Grid>
          <Grid item xs>
            <Typography variant='h6' className={classes.heading} align='center'>
              Social Media
            </Typography>
            <div className={classes.socialMediaIcons}>
              <SocialMediaButton
                link='https://www.facebook.com/CornellRocketry/'
                icon={<FacebookIcon />}
              />
              <SocialMediaButton
                link='https://www.instagram.com/cornellrocketry/?hl=en/'
                icon={<InstagramIcon />}
              />
              <SocialMediaButton
                link='https://www.youtube.com/channel/UCOIp04IIwcz8YvBcgrMYOhg'
                icon={<YouTubeIcon />}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );

  function SocialMediaButton({ link, icon }) {
    return (
      <Link href={link} passHref>
        <IconButton className={classes.iconButton} target='_blank'>
          <icon.type className={classes.icon} />
        </IconButton>
      </Link>
    );
  }
}
