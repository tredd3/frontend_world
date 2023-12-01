import React from 'react';
import { connect } from 'react-redux';
import { CardContent } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { saveNotification } from '../../actions/notifications';
import { Card } from '../Material-UI';
import style from '../../constants/style';
import { track } from '../../helpers/analytics';
import { getOrderDetails } from '../../services/order';
import { pipe } from '../../helpers/functional';
import { orderDetailsUrl, ordersUrl } from '../../helpers/urls';

export default pipe(
  withRouter,
  connect(
    state => ({ notifications: state.notifications }),
    dispatch => ({
      saveNotification: notification => dispatch(saveNotification(notification))
    })
  )
)(
  class NotificationCard extends React.Component {
    returnDays = date => {
      const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      const firstDate = new Date(date);
      const secondDate = new Date();

      const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

      return diffDays === 0 ? 'Today' : `${diffDays} days ago`;
    };

    handleOnClick = async notification => {
      track('notificationViewed', {
        link: {
          notificationHeader: notification.title
        }
      });
      // Not making api call if its already unread
      if (notification.status === 'UNREAD') {
        this.props.saveNotification(notification);
      }

      if (notification && notification.data && notification.data.orderId) {
        const orderDetails = await getOrderDetails(notification.data.orderId);
        if (orderDetails && orderDetails.storeId) {
          this.props.history.push(orderDetailsUrl(notification.data.orderId));
        }
      } else {
        this.props.history.push(ordersUrl);
      }
    };

    render() {
      const { notification } = this.props;
      return (
        <div
          key={notification.notificationId}
          style={{ padding: 10, paddingBottom: 0 }}
        >
          <Card
            style={{ boxShadow: 'none' }}
            onClick={() => this.handleOnClick(notification)}
          >
            <CardContent>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span
                  style={{
                    textTransform: 'capitalize',
                    color: '#000000',
                    fontSize: 14
                  }}
                >
                  {notification.title}
                </span>
                <span style={{ fontSize: 11, color: '#bab8b8' }}>
                  {this.returnDays(notification.createdTime)}
                </span>
              </div>
              <div style={{ fontSize: 12, marginTop: 6, color: '#666666' }}>
                {notification.body}
              </div>
              <span
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: '50%',
                  background:
                    notification.status === 'READ'
                      ? style.black.silver
                      : '#f04e23',
                  position: 'absolute',
                  right: 25
                }}
              />
            </CardContent>
          </Card>
        </div>
      );
    }
  }
);
