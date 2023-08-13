import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  sponsorLevel: {
    margin: '50px 0 20px 0',
  },
  sponsorLogo: {
    padding: '10px 30px 10px 30px',
    maxWidth: 300,
    width: '100%',
    filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.7))',
  },
  bigLine: {
    color: '#bbbbbb',
    backgroundColor: '#bbbbbb',
    height: 3,
    border: 'none',
    marginBottom: 12,
  },
}));

export default function SponsorLevelBlock({ imageDir, levelName, sponsors }) {
  const classes = useStyles();

  sponsors.sort((a, b) => a['name'].localeCompare(b['name']));

  return (
    <>
      <Typography variant='h5' className={classes.sponsorLevel}>
        {levelName.toUpperCase() + ' SPONSORS'}
      </Typography>
      <Grid container spacing={3} justifyContent='center' alignItems='center'>
        {sponsors.map(({ name, link }) => (
          <Grid item key={name} xs={12} sm={4} md={3}>
            <a href={link} target='_blank' rel='noopener noreferrer'>
              <img
                src={`${imageDir}${name}.png`}
                alt={name}
                className={classes.sponsorLogo}
              />
            </a>
          </Grid>
        ))}
      </Grid>
      <hr className={classes.bigLine} />
    </>
  );
}
