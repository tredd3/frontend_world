import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import style from './style';

export default withStyles(style)(({ classes, onClickSingleSearchSuggestion, displayText }) => (
  <div>
    <div className={classes.suggestionDiv1}>
      <div className={classes.suggestionDiv2} onClick={onClickSingleSearchSuggestion}>
        <Typography className={classes.textStyle1}>
          {displayText}
        </Typography>
      </div>
      <Divider className={classes.suggestionDivider} />
    </div>
  </div>
));
