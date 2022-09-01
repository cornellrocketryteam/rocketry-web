import React from 'react';
import { makeStyles, withStyles, Tooltip, Fade, Zoom } from '@material-ui/core';

const StyledTooltip = withStyles({
  tooltip: {
    padding: 10,
    fontSize: '16px',
    maxWidth: 400,
  },
})(Tooltip);

export default function SubteamTooltip({ title, children }) {
  return (
    <StyledTooltip
      TransitionComponent={Zoom}
      title={title}
      arrow
      enterDelay={200}
    >
      {children}
    </StyledTooltip>
  );
}
