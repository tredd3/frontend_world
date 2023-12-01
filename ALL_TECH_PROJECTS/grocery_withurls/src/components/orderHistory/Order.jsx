import React from 'react';
import { withStyles } from '@material-ui/core';
import style from './style';
import Shipment from './Shipment';
import { ChevronRight, Typography } from '../Material-UI';
import { formatDate } from '../../helpers/utilities';
import { ReactComponent as OnlineIcon } from '../../assets/images/svg/onlineIcon.svg';
import { ReactComponent as OfflineIcon } from '../../assets/images/svg/offlineIcon.svg';
import Image from '../uiControls/Image';
import { orderDetailsUrl, productUrl } from '../../helpers/urls';

export default withStyles(style)(
  class Order extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showShipments: true
      };
    }

    getOrderDetails = orderId => () => {
      this.props.history.push(orderDetailsUrl(orderId));
    }

    getProductDescriptionPage = skuId => () => {
      this.props.history.push(productUrl(skuId));
    }

    render() {
      const {
        classes, history, orderData = {}, itemData = {}, index, searchVersion = false
      } = this.props;
      const {
        orderId, orderDate, orderSource = '', orderedBy, finalAmount, totalItems, shipments, storeId
      } = orderData;
      const {
        quantity, sellingPrice, productName, productImage, skuId
      } = itemData;
      const { showShipments } = this.state;

      const style = (showShipments || index === 0) ? { borderLeft: '4px solid #62BDFE' } : {};

      if (searchVersion) {
        return (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <section className={classes.item} onClick={this.getProductDescriptionPage(skuId)}>
            <div className={classes.itemWrapper}>
              <Image height={50} alt="img" src={productImage} />
              <div className={classes.itemInfo}>
                <Typography className="itemName">
                  {' '}
                  {productName}
                </Typography>
                <Typography className="itemQuantity">{`${quantity} * ₹ ${sellingPrice}`}</Typography>
              </div>
            </div>
            <ChevronRight className={classes.itemChevron} />
          </section>
        );
      }
      return (
        <section className={classes.order} style={style} onClick={this.getOrderDetails(orderId)}>
          <div className={classes.orderWrapper}>
            <div className={classes.orderInfo}>
              <Typography className={classes.orderHeader}>
                {' '}
                {`Order Placed On ${formatDate(orderDate)}`}
              </Typography>
              <Typography className={classes.orderStore}>{orderedBy}</Typography>
              <Typography className={classes.orderFooter}>
                <span>{`₹ ${finalAmount}`}</span>
                <span className={classes.dot}>&#183;</span>
                <span>{` (${totalItems} items)`}</span>
              </Typography>
            </div>
            <div className={classes.icons}>
              {orderSource === 'ONLINE'
                ? <OnlineIcon className="icon" />
                : orderSource === 'OFFLINE'
                  ? <OfflineIcon className="icon" />
                  : null}
              <ChevronRight className={classes.orderChevron} />
            </div>
          </div>
          {
            (showShipments && shipments.length > 0) ? (
              <section className={classes.shipments}>
                {shipments.map((shipment, index) => (
                  <Shipment
                    key={index}
                    filterData={this.props.filterData}
                    shipmentData={shipment}
                    orderId={orderId}
                    shipmentNumber={index + 1}
                    totalShipments={shipments.length}
                    history={history}
                    storeId={storeId}
                  />
                ))}
              </section>
            )
              : null
          }

        </section>
      );
    }
  }
);
