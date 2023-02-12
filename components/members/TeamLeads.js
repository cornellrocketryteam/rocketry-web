import { Container, Grid, Typography, makeStyles } from '@material-ui/core';

import MemberPic from './MemberPic';

const useStyles = makeStyles((theme) => ({
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
  name: {
    marginTop: 8,
    marginBottom: 8,
  },
}));

export default function TeamLeads({ imageDir, teamLeads }) {
  const classes = useStyles();
  return (
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
        {teamLeads.map((member) => (
          <Grid item sm={4} md={4} key={member.name}>
            <MemberPic imageDir={imageDir} member={member} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
