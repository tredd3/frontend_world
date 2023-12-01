import React from 'react';
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import style from './style';

export default withStyles(style)(
  ({
    classes, orderValue, productDiscount, couponValue,
    delCharges, youPaid, totalSavings
  }) => (
    <div className={classes.orderSummaryDiv}>
      <Typography style={{ paddingBottom: '10px', fontWeight: 600 }}>Order Summary</Typography>
      <section className={classes.orderSummaryCommon}>
        <Typography style={{ fontWeight: 600 }}>Order Value</Typography>
        <Typography style={{ fontWeight: 600 }}>
            &#8377;
          {' '}
          {orderValue.toFixed(2)}
        </Typography>
      </section>

      <section className={classes.orderSummaryCommon}>
        <Typography>Product Discount</Typography>
        <Typography>
            - &#8377;
          {' '}
          {productDiscount.toFixed(2)}
        </Typography>
      </section>

      <section className={classes.orderSummaryCommon}>
        <Typography>Coupon Discount</Typography>
        <Typography>
            - &#8377;
          {' '}
          {couponValue.toFixed(2)}
        </Typography>
      </section>

      <section className={classes.orderSummaryCommon}>
        <Typography>Delivery Charges</Typography>
        <Typography>
            + &#8377;
          {' '}
          {delCharges.toFixed(2)}
        </Typography>
      </section>

      <Divider className={classes.orderDivider} />

      <section className={classes.orderYouPaid}>
        <Typography style={{ fontWeight: 600 }}>Order Total</Typography>
        <Typography style={{ fontWeight: 600 }}>
            &#8377;
          {' '}
          {youPaid.toFixed(2)}
        </Typography>
      </section>

      <section className={classes.orderSummaryCommon}>
        <Typography style={{ color: 'green' }}>Saving</Typography>
        <Typography style={{ color: 'green' }}>
            &#8377;
          {' '}
          {totalSavings.toFixed(2)}
        </Typography>
      </section>
    </div>
  )
);
