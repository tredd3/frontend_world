import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import style from './style';
import { formatDate } from '../../helpers/utilities';

export default withStyles(style)(
  ({
    orderId, amount, totalItems, totalShipments, classes, orderedBy, orderDate
  }) => (
    <div className={classes.orderSummary}>
      <div className={classes.orderSummary1}>
        <Typography className={classes.typoOrderId}>
            Order Id :
          {' '}
          {orderId}
        </Typography>
        <Typography className={classes.typoPrice}>
            &#8377;
          {' '}
          {amount}
        </Typography>
      </div>

      <Typography className={classes.typoItemsShipments}>
          By
        {' '}
        {orderedBy}
      </Typography>

      <div className={classes.orderSummary1}>
        <Typography className={classes.typoItemsShipments}>
          <span style={{ fontWeight: '600' }}>
            {' '}
            {totalItems}
            Items  &#183;
            {' '}
            {totalShipments}
            {' '}
            Shipments
          </span>
        </Typography>
        <Typography style={{ fontSize: '12px' }}>
            On
          {' '}
          {formatDate(orderDate)}
        </Typography>
      </div>
    </div>
  )
);
