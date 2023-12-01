import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import {
  StarBorder, SwipeableDrawer, Typography
} from '../Material-UI';
import style from './style';
import { ConfigPivot } from '../../types';
import { getConfig } from '../../services/config';
import { rateOrder as rateOrderService } from '../../services/order';
import useBoolean from '../../hooks/use-boolean';
import useSnackbar from '../../hooks/use-snackbar';

const OrderRating: React.FC<{classes: any}> = ({ classes }) => {
  const [isRatingDialogOpen, openRatingDialog, closeRatingDialog] = useBoolean(false);
  const [lastOrderDetails, setLastOrderDetails] = useState<ConfigPivot['lastOrderDetails'] | null>(null);

  const showSnackbar = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        const { lastOrderDetails } = await getConfig();
        setLastOrderDetails(lastOrderDetails);
        openRatingDialog();
      } catch (e) {
        // do nothing
      }
    })();
  }, [openRatingDialog, setLastOrderDetails, showSnackbar]);

  const rateOrder = async (value: number) => {
    closeRatingDialog();
    try {
      await rateOrderService(value + 1);
    } catch (e) {
      showSnackbar(e);
    }
  };

  const skipRating = async () => {
    closeRatingDialog();
    try {
      await rateOrderService(0);
    } catch (e) {
      showSnackbar(e);
    }
  };

  if (!lastOrderDetails) return null;

  const {
    totalShipment, totalItems, storeName,
    deliveredDate, deliveredTime, orderAmount
  } = lastOrderDetails;

  return (
    <SwipeableDrawer
      open={isRatingDialogOpen}
      anchor="bottom"
      disableSwipeToOpen
      onClose={() => ({})}
      onOpen={() => ({})}
      data-testid="order-rating-dialog"
    >
      <section
        className={classes.orderRating}
      >
        <div className={classes.orderRatingheader}>
          <Typography className={classes.skip}><span onClick={skipRating}>Skip</span></Typography>
          <div className={classes.shoppingExperience}>
            <span className="text">RATE YOUR SHOPPING EXPERIENCE</span>
            <span>
              {[...Array(5).keys()].map(rating => (
                <StarBorder
                  key={rating}
                  className="star"
                  data-testid={`rating${rating}`}
                  onClick={() => rateOrder(rating)}
                />
              ))}

            </span>
          </div>
        </div>
        <div className={classes.orderWrapper}>
          <div className={classes.orderContainer}>
            <div className={`${classes.orderBlock} delivered`}>
              <span className="title">DELIVERED ON</span>
              <div className="details">
                <span>{deliveredDate}</span>
                <span>{`at ${deliveredTime}`}</span>
              </div>
            </div>
            <div className={classes.line}><span /></div>
            <div className={`${classes.orderBlock} soldby`}>
              <span className="title">SOLD BY</span>
              <div className="details">
                <span>{storeName}</span>
              </div>
            </div>
            <div className={classes.line}><span /></div>
            <div className={`${classes.orderBlock} orderdetails`}>
              <span className="title">ORDER DETAILS</span>
              <div className="details">
                <span>{`₹${orderAmount}`}</span>
                <span>{`${totalShipment} | ${totalItems}`}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SwipeableDrawer>
  );
};

export default withStyles(style as any)(OrderRating);
