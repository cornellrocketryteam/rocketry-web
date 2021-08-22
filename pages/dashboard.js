import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import LeftDrawer from '../components/LeftDrawer';
import { DashboardContext } from '../lib/context';

import AllTeam from '../components/screens/AllTeam';
import Applications from '../components/screens/Applications';
import Dashboard from '../components/screens/Dashboard';
import Hours from '../components/screens/Hours';
import Subteam from '../components/screens/Subteam';

import { ThemeProvider } from '@material-ui/core/styles';
import { adminTheme } from '../components/Theme';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(5),
    ...theme.mixins.toolbar,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

export default function AdminHome() {
  const [screen, setScreen] = useState(0);
  const value = { screen, setScreen };
  const classes = useStyles();

  const screens = [
    <Dashboard />,
    <Hours />,
    <Subteam />,
    <AllTeam />,
    <Applications />,
  ];

  return (
    <DashboardContext.Provider value={value}>
      <ThemeProvider theme={adminTheme}>
        <div className={classes.root}>
          <LeftDrawer />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {screens[screen]}
          </main>
        </div>
      </ThemeProvider>
    </DashboardContext.Provider>
  );
}
