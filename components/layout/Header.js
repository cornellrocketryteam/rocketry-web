import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';
import SocialMediaButton from '../SocialMediaButton';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { makeStyles } from '@mui/styles';
import { EmailOutlined, EmailRounded } from '@mui/icons-material';

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
    backgroundImage: 'none',
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
    [theme.breakpoints.down('md')]: {
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
    [theme.breakpoints.down('md')]: {
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
  const pages = ['Members', 'Subteams', 'Rockets', 'Sponsors', 'FAQ'];

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
                size='large'
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

                {pages.map((text) => (
                  <Link key={text} href={`/${text.toLowerCase()}`} passHref>
                    <MenuItem>{text}</MenuItem>
                  </Link>
                ))}
                <Link href='mailto:rocketry@cornell.edu' passHref>
                  <MenuItem>Contact</MenuItem>
                </Link>
                <Link href={'https://g.cornellrocketryteam.com/give'} passHref>
                  <MenuItem>Give</MenuItem>
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
              <IconButton className={classes.logoButton} size='large'>
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
                {pages.map((text) => (
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
                <SocialMediaButton
                  link='mailto:rocketry@cornell.edu'
                  icon={<EmailRounded />}
                />

              </div>

              <div
                className={classes.appBarButtons}
                data-active={active ? 'true' : scrolled.toString()}
              >
                <Link href='https://g.cornellrocketryteam.com/give' passHref>
                  <Button
                    variant='contained'
                    color='primary'
                    className={classes.appBarButton}
                  >
                    Give
                  </Button>
                </Link>
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
}
