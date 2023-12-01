import React, { memo } from 'react';
import Typography from '@material-ui/core/Typography';
import Home from '@material-ui/icons/Home';

export default memo(({
  deliveryAddressName, deliveryAddressAddressLine1,
  deliveryAddressAddressLine2, deliveryAddressMobileNumber
}) => (
  <div style={{ backgroundColor: 'white' }}>
    <Typography>
      Delivery Address
    </Typography>
    <div style={{ display: 'flex' }}>
      <Home />
      <Typography style={{ alignSelf: 'flex-end' }}>
        {deliveryAddressName}
      </Typography>
    </div>
    <Typography>
      {deliveryAddressAddressLine1}
,
      {deliveryAddressAddressLine2}
    </Typography>
    <Typography>
      {deliveryAddressMobileNumber}
    </Typography>
  </div>
));
