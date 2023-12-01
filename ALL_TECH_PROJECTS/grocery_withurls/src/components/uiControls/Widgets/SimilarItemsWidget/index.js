import React from 'react';
import { withStyles } from '@material-ui/core';
import style from './style';
import HorizontalSlider from '../../HorizontalSlider';
import { Typography } from '../../../Material-UI';
import Image from '../../Image';

export default withStyles(style)(
  ({ classes, widgetData, status }) => {
    const widgetData2 = [];
    const len = widgetData ? widgetData.length : 0;
    for (let i = 0; i < len; i += 1) {
      const data = {};
      data.name = widgetData[i].productName;
      data.imageUrl = widgetData[i].productImage;
      data.price = widgetData[i].sellingPrice.toFixed(2);
      data.isReturned = widgetData[i].isReturned ? widgetData[i].isReturned : false;
      data.returnedQuantity = widgetData[i].returnedQuantity ? widgetData[i].returnedQuantity : 0;
      data.originalQuantity = widgetData[i].originalQuantity ? Number(widgetData[i].originalQuantity) : 0;
      data.deliveredQuantity = widgetData[i].deliveredQuantity ? Number(widgetData[i].deliveredQuantity) : 0;
      widgetData2.push(data);
    }

    const getDeliveryStatus = (originalQuantity, deliveredQuantity) => {
      if (deliveredQuantity === 0) {
        return (
          <Typography className="returnedQuantity">
            Undelivered
          </Typography>
        );
      } if (originalQuantity === deliveredQuantity) {
        return null;
      }
      return (
        <Typography className="returnedQuantity">
          {`${deliveredQuantity} out of ${originalQuantity} delivered`}
        </Typography>
      );
    };

    return (
      <HorizontalSlider>
        {widgetData2.map((product, index) => (
          <div className={classes.SimilarItemsWidget} key={index}>
            <section className="section1">
              <div
                style={{
                  width: 90,
                  height: 90,
                  margin: [15, 'auto', 10, 'auto'],
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <div
                  style={{
                    height: 90,
                    position: 'relative'
                  }}
                >
                  <Image height={90} alt="img" src={product.imageUrl} />
                </div>
              </div>
            </section>
            <Typography className="productName">
              {`${product.originalQuantity} X ₹ ${product.price}`}
            </Typography>
            <Typography className="productName">{product.name}</Typography>
            {status.toLowerCase() === 'delivered' ? getDeliveryStatus(product.originalQuantity, product.deliveredQuantity) : null}
          </div>
        ))}
      </HorizontalSlider>
    );
  }
);
