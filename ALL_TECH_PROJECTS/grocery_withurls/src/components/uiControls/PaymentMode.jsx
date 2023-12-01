import React from 'react';
import Typography from '@material-ui/core/Typography';
import PaymentIcon from '@material-ui/icons/CreditCard';

export default ({ paymentMode }) => (
  <div style={{
    backgroundColor: 'white',
    padding: '10px 10px 15px 10px'
  }}
  >
    <Typography>
      Payment Method
    </Typography>
    <div style={{
      display: 'flex',
      backgroundColor: 'grey',
      paddingLeft: '10px',
      paddingTop: '10px',
      paddingBottom: '10px',
      marginTop: '10px'
    }}
    >
      <PaymentIcon />
      <Typography>
        {paymentMode}
      </Typography>
    </div>
  </div>
);
