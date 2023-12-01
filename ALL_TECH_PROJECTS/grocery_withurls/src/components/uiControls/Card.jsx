import React from 'react';
import { withStyles } from '@material-ui/core';
import STYLE_CONST from '../../constants/style';

const style = {
  card: {
    padding: STYLE_CONST.screenPadding,
    backgroundColor: STYLE_CONST.white.white
  }
};

// TODO this needs to be reworked later
export default withStyles(style)(
  ({
    classes, children, clsName = 'defaultCard', style = {}
  }) => (
    <div className={`${classes.card} ${clsName}`} style={style}>
      {children}
    </div>
  )
);
