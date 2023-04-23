import { Grid } from '@material-ui/core';
import MemberPic from './MemberPic';

export default function SubteamMembers({ imageDir, subteamMembers, subteam }) {
  return (
    <>
      {subteamMembers[subteam].map((member) => (
        <Grid item sm={4} md={4} lg={2} key={member.name}>
          <MemberPic imageDir={imageDir} member={member} />
        </Grid>
      ))}
    </>
  );
}
