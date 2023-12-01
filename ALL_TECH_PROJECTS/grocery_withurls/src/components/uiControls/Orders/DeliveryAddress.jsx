import React from 'react';
import Typography from '@material-ui/core/Typography';
import Home from '@material-ui/icons/Home';
import { withStyles } from '@material-ui/core';
import style from './style';

export default withStyles(style)(
  ({
    deliveryAddressName, deliveryAddressAddressLine1,
    deliveryAddressAddressLine2, deliveryAddressPin,
    deliveryAddressMobileNumber, classes
  }) => (
    <div className={classes.dlv}>
      <Typography>Delivery Address</Typography>

      <div className={classes.dlvIconTextWrapper}>
        <Home />
        <Typography className={classes.addressName}>
          {deliveryAddressName}
        </Typography>
      </div>
      <Typography className={classes.addressText}>
        {deliveryAddressAddressLine1}
        ,
        {' '}
        {deliveryAddressAddressLine2}
        ,
        {' '}
        {deliveryAddressPin}
      </Typography>
      <Typography className={classes.addressText}>
        {deliveryAddressMobileNumber}
      </Typography>
    </div>
  )
);
