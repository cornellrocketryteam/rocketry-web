import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import MemberPic from './MemberPic';

const useStyles = makeStyles((theme) => ({
  subteamLeadLabel: {
    color: '#bbbbbb',
  },
}));

export default function SubteamLeads({ imageDir, subteamLeads, subteam }) {
  const classes = useStyles();
  return (
    <>
      {subteamLeads[subteam].map((member) => (
        <Grid item sm={4} md={4} lg={2} key={member.name}>
          <MemberPic imageDir={imageDir} member={member} />
          <Typography
            variant='body2'
            align='center'
            className={classes.subteamLeadLabel}
          >
            <i>Subteam Lead</i>
          </Typography>
        </Grid>
      ))}
    </>
  );
}
