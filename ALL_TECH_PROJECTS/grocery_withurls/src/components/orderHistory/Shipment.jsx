import React from 'react';
import { withStyles } from '@material-ui/core';
import style from './style';
import { Typography } from '../Material-UI';
import { trimLowerCase } from '../../helpers/utilities';

export default withStyles(style)(
  class Shipment extends React.Component {
    constructor(props) {
      super(props);
      this.deliverStatus = {
        outfordelivery: 'Arriving',
        ordered: 'Arriving',
        shipped: 'Arriving',
        rejected: 'Rejected',
        cancelled: 'Cancelled',
        delivered: 'Delivered',
        refund: 'Refund Initiated'
      };
      this.shipmentView = {
        outfordelivery: 'Track',
        ordered: 'Track',
        shipped: 'Track',
        rejected: 'Track',
        cancelled: 'View',
        delivered: 'View',
        refund: 'View'
      };
    }

    render() {
      const {
        classes, shipmentData, shipmentNumber, totalShipments
      } = this.props;
      const {
        shipmentId, shipmentStatus, deliveryDate, shipmentTotal, shipmentItemCount
      } = shipmentData;

      return (
        <div className={classes.shipment}>
          <div className={classes.shipmentHeader}>
            <div>
              <span className="shipmentNumber">{`Shipment ${shipmentNumber} of ${totalShipments}`}</span>
              <span className="totalShipments">{`(${shipmentItemCount} items)`}</span>
            </div>
            <span className={`shipmentStatus ${this.deliverStatus[trimLowerCase(shipmentStatus)] || ''}`}>{shipmentStatus}</span>
          </div>
          <Typography className={classes.shipmentId}>{shipmentId}</Typography>
          <div className={classes.shipmentFooter}>
            <div className="shipmentDetails">
              <span>{`₹ ${shipmentTotal}`}</span>
              <span className={classes.shipDot}>&#183;</span>
              <span>{this.deliverStatus[trimLowerCase(shipmentStatus)] || ''}</span>
              <span>
                ,
                {' '}
                {deliveryDate}
              </span>
            </div>
          </div>
        </div>
      );
    }
  }
);
