import { IconButton } from '@mui/material';
import Link from 'next/link';
import { makeStyles } from '@mui/styles';

const transitionTime = 0.5;

const useStyles = makeStyles((theme) => ({
  appBarIconButton: {
    marginRight: -2,
    marginLeft: -2,
    [theme.breakpoints.down('md')]: {
      marginRight: -4,
      marginLeft: -4,
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  },
  appBarIcon: {
    color: 'lightgrey',
    transition: `all ${transitionTime}s`,
  },
}));

export default function SocialMediaButton({ link, icon }) {
  const classes = useStyles();

  return (
    <Link href={link} passHref>
      <IconButton className={classes.appBarIconButton} target='_blank' size="large">
        <icon.type className={classes.appBarIcon} />
      </IconButton>
    </Link>
  );
}
