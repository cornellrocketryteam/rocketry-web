import { Grid } from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';

import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { LinkedIn, GitHub } from '@mui/icons-material';
import MuiDialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import SocialMediaButton from '../SocialMediaButton';
import Typography from '@mui/material/Typography';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
          size="large">
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    overflowY: 'hidden',
    marginBottom: 30,
  },
  memberPic: {
    display: 'block',
    margin: 'auto',
    width: '100%',
  },
  semiBold: {
    fontWeight: '600',
  },
  socialMedia: {
    marginTop: 5,
    marginLeft: -10,
    marginBottom: -10,
    '& > *': {
      marginRight: 2,
    },
  },
}));

export default function MemberDialog({ imageDir, member, handleClose, open }) {
  const classes = useStyles();

  const { name, major, minor, gradYear, college, bio, linkedin, github } =
    member;

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth='md'
      PaperProps={{
        style: { borderRadius: 0 },
      }}
    >
      <DialogTitle onClose={handleClose}>{name}</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Grid container spacing={4} alignItems='center'>
          <Grid item xs={3}>
            <img
              src={`${imageDir}${name}.jpg`}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = `${imageDir}${name}.JPG`;
              }}
              alt={name}
              className={classes.memberPic}
            />
          </Grid>
          <Grid item xs={9}>
            <Typography variant='h6' className={classes.semiBold}>
              {name}
            </Typography>
            <br />
            <Typography variant='body1'>
              <span className={classes.semiBold}>Major: </span> {major}
              <br />
              {minor && (
                <>
                  <span className={classes.semiBold}>Minor: </span> {minor}
                  <br />
                </>
              )}
              <span className={classes.semiBold}>Graduation Year: </span>
              {gradYear}
              <br />
              <span className={classes.semiBold}>College: </span> {college}
              <br />
              <br />
              {bio}
            </Typography>
            <div className={classes.socialMedia}>
              {linkedin && (
                <SocialMediaButton link={linkedin} icon={<LinkedIn />} />
              )}

              {github && <SocialMediaButton link={github} icon={<GitHub />} />}
            </div>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
