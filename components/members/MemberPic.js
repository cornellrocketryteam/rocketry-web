import { Typography, makeStyles } from '@material-ui/core';

import MemberDialog from './MemberDialog';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  clickable: {
    all: 'unset',
    display: 'block',
    margin: 'auto',
    cursor: 'pointer',
  },
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

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <button className={classes.clickable} onClick={handleClickOpen}>
        <img
          src={`${imageDir}${member.name}.jpg`}
          alt={member.name}
          className={classes.memberPic}
        />
        <Typography variant='body1' align='center' className={classes.name}>
          {member.name}
        </Typography>
      </button>

      <MemberDialog
        imageDir={imageDir}
        member={member}
        handleClose={handleClose}
        open={open}
      />
    </>
  );
}
