import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import CheckedCircle from '@material-ui/icons/CheckCircleOutline';
import { withStyles } from '@material-ui/core';
import style from './style';

export default (withStyles(style))(
  ({
    totalRefund, classes
  }) => (
    <div className={classes.refundDueDiv}>
      <div
        className={classes.refundDueDiv2}
      >
        <CheckedCircle className={classes.checkedCircle} />
        <Typography className={classes.refundDueContent}>
          <span className={classes.refundDueContentAmount}>
              &#8377;
            {totalRefund}
          </span>
          <span className={classes.refundDueContentTxt}>
              Refund Due
          </span>
        </Typography>
      </div>

    </div>
  )
);
