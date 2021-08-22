import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  summaryCard: {
    height: 200,
    width: '100%',
    backgroundColor: '#212b36',
    padding: 40,
    borderRadius: 16,
    boxShadow: 'rgb(0 0 0 / 24%) 0px 0px 2px 0px, rgb(0 0 0 / 24%) 0px 16px 32px -4px',
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} lg={8}>
          <Paper className={classes.summaryCard}>Ape</Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={2}>
          <Paper className={classes.summaryCard}>Ape</Paper>
        </Grid>
        <Grid item xs={12} sm={6} lg={2}>
          <Paper className={classes.summaryCard}>Ape</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
