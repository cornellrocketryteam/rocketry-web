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
}));

export default function TeamLeads({ imageDir, teamLeads }) {
  const classes = useStyles();
  return (
    <Container maxWidth='lg' className={classes.teamLeadContainer}>
      <Typography variant='h4' align='center' className={classes.teamHeading}>
        TEAM LEADS
      </Typography>
      <Grid container justifyContent='center' alignItems='center' spacing={3}>
        {teamLeads.map((member) => (
          <Grid sm={4} md={4} lg={2} item key={member.name}>
            <MemberPic imageDir={imageDir} member={member} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
