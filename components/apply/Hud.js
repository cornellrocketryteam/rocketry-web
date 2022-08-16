import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  splash: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  backgroundOpen: {
    backgroundImage:
      "radial-gradient(closest-side, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 1) ), url('/static/images/apply-page/new mexico.png')",
  },
  backgroundClosed: {
    backgroundImage:
      "radial-gradient(closest-side, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1) ), url('/static/images/apply-page/earth.jpg')",
  },
  hud: {
    position: 'relative',
    width: '100%',
    height: '100vh',
  },
  hudElement: {
    position: 'absolute',
    height: '20vw',
    maxHeight: 280,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  hudTop: {
    top: 80,
  },
  hudRight: {
    right: 40,
  },
  hudBottom: {
    bottom: 35,
  },
  hudLeft: {
    left: 40,
  },
  rocket: {
    maxHeight: 'none',
    height: '30vh',
    top: '50%',
    left: '4vw',
    transform: 'translateY(-50%)',
  },
  centerBar: {
    top: 100,
    height: 50,
    maxWidth: '40vw',
    left: '50%',
    transform: 'translateX(-50%)',
  },
}));

export default function Hud({ applicationOpen, children }) {
  const classes = useStyles();

  return (
    <div
      className={clsx(
        classes.splash,
        applicationOpen ? classes.backgroundOpen : classes.backgroundClosed
      )}
    >
      <div className={classes.hud}>
        {
          // Top left hud element changes based on whether the application is open/closed
          !applicationOpen ? (
            <img
              className={clsx(
                classes.hudElement,
                classes.hudTop,
                classes.hudLeft
              )}
              src='/static/images/apply-page/hud/top left closed.svg'
              alt='Top Left'
            />
          ) : (
            <img
              className={clsx(
                classes.hudElement,
                classes.hudTop,
                classes.hudLeft
              )}
              src='/static/images/apply-page/hud/top left open.svg'
              alt='Top Left'
            />
          )
        }

        <img
          className={clsx(classes.hudElement, classes.hudTop, classes.hudRight)}
          src='/static/images/apply-page/hud/top right.svg'
          alt='Top Right'
        />
        <img
          className={clsx(
            classes.hudElement,
            classes.hudBottom,
            classes.hudLeft
          )}
          src='/static/images/apply-page/hud/bottom left.svg'
          alt='Bottom Left'
        />
        <img
          className={clsx(
            classes.hudElement,
            classes.hudBottom,
            classes.hudRight
          )}
          src='/static/images/apply-page/hud/bottom right.svg'
          alt='Bottom Right'
        />
        <img
          className={clsx(classes.hudElement, classes.rocket)}
          src='/static/images/apply-page/hud/rocket.svg'
          alt='Rocket'
        />
        <img
          className={clsx(classes.hudElement, classes.centerBar)}
          src='/static/images/apply-page/hud/center bar.svg'
          alt='Center Bar'
        />

        {children}
      </div>
    </div>
  );
}
