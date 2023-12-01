import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import CheckedCircle from '@material-ui/icons/CheckCircleOutline';
import { withStyles } from '@material-ui/core';
import style from './style';

export default (withStyles(style))(
  ({
    paymentMode, finalAmount, netOrderAmount, refunds, classes
  }) => {
    const nth = d => {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    const getMonthLetter = monthNumber => {
      const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return month[monthNumber];
    };

    const formatDate = timestamp => {
      if (!timestamp) {
        const date = new Date();
        const theDate = date.getDate();
        const theMonth = date.getMonth();
        const theYear = date.getFullYear();
        return `${theDate}${nth(theDate)} ${getMonthLetter(theMonth)} ${theYear}`;
      }
      const date = timestamp.split(' ')[0];
      const dateParts = date.split('-');
      const theDate = Number(dateParts[0]);
      const theMonth = dateParts[1];
      const theYear = dateParts[2];
      return `${theDate}${nth(theDate)} ${theMonth.toLowerCase().replace(/(^|\s)\S/g, t => t.toUpperCase())} 20${theYear}`;
    };

    const sendLabelComponent = texts => (
      <div className={classes.refundLabelContainer}>
        <div className={classes.refundLabelItemContainer}>
          <CheckedCircle className={classes.refundLabelCheckedCircle} />
          <div>
            {texts.map(text => <Typography className={classes.refundLabelText}>{text}</Typography>)}
          </div>
        </div>
      </div>
    );

    const getComponentForCod = () => {
      if (finalAmount && netOrderAmount && finalAmount !== 0 && netOrderAmount !== finalAmount) {
        return sendLabelComponent(
          [`Order value revised to ₹ ${finalAmount} due to item(s) undelivered worth ₹ ${netOrderAmount - finalAmount}`]
        );
      }
      return null;
    };

    const getComponentForPrepaid = () => {
      if (refunds && refunds.length !== 0) {
        return sendLabelComponent(
          refunds.map(refund => `Refund of ₹ ${refund.refundAmount} initiated on ${formatDate(refund.refundDate)}`)
        );
      }
      return null;
    };

    return (
      <div className={classes.refundLabel}>
        {paymentMode.toLowerCase() === 'cod' ? getComponentForCod() : getComponentForPrepaid()}
      </div>
    );
  }
);
