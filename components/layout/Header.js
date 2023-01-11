import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from '@material-ui/core';

import Link from 'next/link';

import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
// import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';
import MenuIcon from '@material-ui/icons/Menu';

const transitionTime = 0.5;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  leftButtons: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: 'transparent',
    borderBottom: '1px solid #00000000',
    color: 'white',
    transition: `all ${transitionTime}s`,
    boxShadow: 'none',
    paddingTop: 5,
    paddingBottom: 5,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: '1.5vw',
      paddingRight: '1.5vw',
    },
    [theme.breakpoints.up('xl')]: {
      paddingLeft: 150,
      paddingRight: 150,
    },
    '&[data-active="true"]': {
      backgroundColor: '#0C0C0Cdd',
      backdropFilter: 'blur(5px)',
      webkitBackdropFilter: 'blur(5px)',
      borderBottom: '1px solid #646464',
      transition: `all ${transitionTime}s`,
    },
  },
  logoButton: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  logo: {
    height: 55,
    width: 55,
  },
  appBarButtons: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    color: 'lightgrey',
    transition: `all ${transitionTime}s`,
  },
  collapseAppBarButtons: {
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  appBarIconButton: {
    marginRight: -2,
    marginLeft: -2,
    [theme.breakpoints.down('sm')]: {
      marginRight: -4,
      marginLeft: -4,
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  },
  appBarIcon: {
    color: 'lightgrey',
    transition: `all ${transitionTime}s`,
  },
  appBarButton: {
    marginLeft: 15,
    marginRight: 15,
    textTransform: 'none',
    fontSize: '1.1rem',
  },
  homeButton: {
    color: 'white',
    transition: `all ${transitionTime}s`,
  },
}));

export default function Header({ active, hideMenu }) {
  const classes = useStyles();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        console.log(!scrolled);
        setScrolled(!scrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [active, scrolled]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar
        className={classes.appBar}
        data-active={active ? 'true' : scrolled.toString()}
        //position={active ? "static" : "fixed"}
      >
        <Toolbar>
          <div className={classes.collapseAppBarButtons}>
            <Box ml={3}>
              <IconButton
                edge='start'
                className={classes.menuButton}
                color='inherit'
                aria-label='menu'
                onClick={handleClick}
              >
                <MenuIcon />
              </IconButton>
            </Box>
            {!hideMenu && (
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <Link href='/' passHref>
                  <MenuItem to={'/'}>Home</MenuItem>
                </Link>

                {['Team', 'Rockets', 'Sponsors'].map((text) => (
                  <Link key={text} href={`/${text.toLowerCase()}`} passHref>
                    <MenuItem>{text}</MenuItem>
                  </Link>
                ))}
                <Link href='mailto:cornellrocketry@gmail.com' passHref>
                  <MenuItem>Contact</MenuItem>
                </Link>
                <Link href={'/apply'} passHref>
                  <MenuItem>Apply</MenuItem>
                </Link>
              </Menu>
            )}
          </div>

          <div
            className={`${classes.leftButtons} ${classes.appBarButtons}`}
            data-active={active ? 'true' : scrolled.toString()}
          >
            <Link href='/' passHref>
              <IconButton className={classes.logoButton}>
                <img
                  src='/static/crt.png'
                  alt='logo'
                  className={classes.logo}
                />
              </IconButton>
            </Link>

            {!hideMenu && (
              <>
                <Link href='/' passHref>
                  <Button
                    className={`${classes.homeButton} ${classes.appBarButton}`}
                    data-active={active ? 'true' : scrolled.toString()}
                  >
                    Home
                  </Button>
                </Link>
                {['Team', 'Rockets', 'Sponsors'].map((text) => (
                  <Link href={`/${text.toLowerCase()}`} key={text} passHref>
                    <Button color='inherit' className={classes.appBarButton}>
                      {text}
                    </Button>
                  </Link>
                ))}
              </>
            )}
          </div>

          {!hideMenu && (
            <>
              <div>
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

              <div
                className={classes.appBarButtons}
                data-active={active ? 'true' : scrolled.toString()}
              >
                <Button
                  color='inherit'
                  className={classes.appBarButton}
                  href='mailto:cornellrocketry@gmail.com'
                >
                  Contact
                </Button>
                <Link href='/apply' passHref>
                  <Button
                    variant='contained'
                    color='secondary'
                    className={classes.appBarButton}
                  >
                    Apply
                  </Button>
                </Link>
              </div>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );

  function SocialMediaButton({ link, icon }) {
    return (
      <Link href={link} passHref>
        <IconButton className={classes.appBarIconButton} target='_blank'>
          <icon.type
            className={classes.appBarIcon}
            data-active={active ? 'true' : scrolled.toString()}
          />
        </IconButton>
      </Link>
    );
  }
}
