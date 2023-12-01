import React from 'react';
import Typography from '@material-ui/core/Typography';
import PaymentIcon from '@material-ui/icons/CreditCard';
import { withStyles } from '@material-ui/core';
import style from './style';

export default withStyles(style)(
  ({ paymentMode, classes }) => (
    <div className={classes.paymentMode}>
      <Typography>
        Payment Method
      </Typography>
      <div className={classes.paymentModeDiv1}>
        <PaymentIcon />
        <Typography>
          {paymentMode}
        </Typography>
      </div>
    </div>
  )
);
