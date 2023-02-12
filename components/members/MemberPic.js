import {
  Container,
  Grid,
  Typography,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  memberPic: {
    display: 'block',
    margin: 'auto',
    width: '100%',
    maxWidth: 200,
  },
  name: {
    marginTop: 8,
    marginBottom: 8,
  },
}));

export default function MemberPic({ imageDir, member }) {
  const classes = useStyles();
  return (
    <>
      <img
        src={`${imageDir}${member.name}.jpg`}
        alt={member.name}
        className={classes.memberPic}
      />
      <Typography variant='body1' align='center' className={classes.name}>
        {member.name}
      </Typography>
    </>
  );
}
