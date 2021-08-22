import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Box,
  Avatar,
} from '@material-ui/core';

import SpeedRoundedIcon from '@material-ui/icons/SpeedRounded';
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';

import { useContext } from 'react';
import { DashboardContext } from '../lib/context';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: 'rgba(22, 28, 36, 0.8)',
    backdropFilter: 'blur(8px)',
    paddingTop: 15,
    paddingBottom: 15,
  },
  drawerHeader: {
    padding: 20,
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    backgroundColor: theme.palette.background.default,
    width: drawerWidth,
  },
  listIcon: {
    padding: '8px 24px 8px 24px',
  },
  namePanel: {
    display: 'flex',
    backgroundColor: '#212b36',
    margin: '0 20px 0 20px',
    padding: '18px 20px 18px 20px',
    borderRadius: 12,
  },
  listItem: {
    color: 'white',
    transition: '100ms ease',
    '&.Mui-selected': {
      backgroundColor: 'rgba(255, 30, 30, 0.2)',
      borderRight: '#b22025 3px solid',
    },
    '&.Mui-selected:hover': {
      backgroundColor: '#242c35',
    },
    '&:hover': {
      backgroundColor: '#242c35',
    },
  },
  listItemText: {
    marginBottom: 2,
    '&.Mui-selected': {
      color: 'white',
    },
  },
  listItemTextChild: {
    '&.Mui-selected': {
      color: 'white',
    },
  },
}));

export default function LeftDrawer() {
  const { screen, setScreen } = useContext(DashboardContext);

  const classes = useStyles();

  const menu = ['Dashboard', 'Hours', 'Subteam', 'All Team', 'Applications'];
  const menuIcons = [
    <SpeedRoundedIcon />,
    <ScheduleRoundedIcon />,
    <PersonRoundedIcon />,
    <PeopleAltRoundedIcon />,
    <DescriptionRoundedIcon />,
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar} elevation={0}>
        <Toolbar>
          <Typography variant='h6' noWrap>
            <Box pl={1.5}>Cornell Rocketry</Box>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor='left'
      >
        <div className={classes.drawerHeader}>
          <img src='./static/crt.png' alt='CRT' width='50' height='50' />
        </div>
        <Box my={1}></Box>
        <Paper className={classes.namePanel} elevation={0}>
          <Avatar alt='Anchey Peng' src='./static/headshot.jpg' />
          <Box fontWeight='fontWeightBold' fontSize={14} mx={2}>
            Anchey Peng
            <br />
            <Typography variant='body2' color='textSecondary'>
              Admin
            </Typography>
          </Box>
        </Paper>
        <Box my={3}></Box>
        <List>
          {menu.map((text, index) => (
            <ListItem
              className={classes.listItem}
              button
              key={text}
              selected={index === screen}
              onClick={() => {
                setScreen(index);
              }}
            >
              <ListItemIcon className={classes.listIcon}>
                {menuIcons[index]}
              </ListItemIcon>
              <ListItemText
                className={classes.listItemText}
                classes={{
                  secondary: clsx(classes.listItemTextChild, {
                    'Mui-selected': index === screen,
                  }),
                }}
                secondary={text}
              />
            </ListItem>
          ))}
        </List>
        <Divider />
        <ListItem className={classes.listItem} button>
          <ListItemIcon className={classes.listIcon}>
            <ExitToAppRoundedIcon />
          </ListItemIcon>
          <ListItemText className={classes.listItemText} secondary='Sign Out' />
        </ListItem>
      </Drawer>
    </div>
  );
}
