import { Container, Grid, Typography, makeStyles } from '@material-ui/core';

import SubteamLeads from './SubteamLeads';
import SubteamMembers from './SubteamMembers';

const useStyles = makeStyles((theme) => ({
  subteamsContainer: {
    marginBottom: 100,
  },
  teamHeading: {
    color: theme.palette.secondary.main,
    margin: '40px 0 20px 0',
  },
}));

export default function SubteamBLock({
  imageDir,
  subteamLeads,
  subteamMembers,
}) {
  console.log(subteamMembers);
  const classes = useStyles();
  return (
    <Container maxWidth='lg' className={classes.subteamsContainer}>
      {Object.keys(subteamLeads).map((subteam) => (
        <div key={subteam}>
          <Typography
            variant='h4'
            align='center'
            className={classes.teamHeading}
            key={subteam}
          >
            {subteam.toUpperCase()}
          </Typography>
          <Grid
            container
            justifyContent='center'
            alignItems='flex-start'
            spacing={3}
          >
            <SubteamLeads
              imageDir={imageDir}
              subteamLeads={subteamLeads}
              subteam={subteam}
            />
            <SubteamMembers
              imageDir={imageDir}
              subteamMembers={subteamMembers}
              subteam={subteam}
            />
          </Grid>
        </div>
      ))}
    </Container>
  );
}
