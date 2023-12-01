import React from 'react';
import Typography from '@material-ui/core/Typography';
import IconRight from '@material-ui/icons/ChevronRight';
import { withStyles } from '@material-ui/core';
import style from './style';
import Image from '../uiControls/Image';

export default withStyles(style)(({ classes, categoryTypeImage, categoryTypeTitle }) => (
  <div className={classes.categoryType}>
    <div className={classes.categoryTypeImageTitle}>
      <div className={classes.categoryTypeImageWrapper}>
        <Image
          width={38}
          src={categoryTypeImage}
          alt={categoryTypeTitle}
        />
      </div>

      <Typography className={classes.textStyle1}>
        {categoryTypeTitle}
      </Typography>
    </div>
    <IconRight />
  </div>
));
