import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  sponsorLevel: {
    margin: '50px 0 20px 0',
  },
  contributor: {
    margin: 10,
    color: 'black',
  },
});

export default function Contributors({ contributors }) {
  const classes = useStyles();

  return (
    <>
      <Typography variant='h5' className={classes.sponsorLevel}>
        CONTRIBUTORS
      </Typography>
      <Grid container spacing={3} justifyContent='center' alignItems='center'>
        {contributors.sort().map((name) => (
          <Grid item key={name} xs={12} sm={4} md={3}>
            <Typography variant='h4' className={classes.contributor}>
              The {name} Family
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
