/** @jsx jsx */
import React, { useEffect, useState } from 'react';
import { jsx, css } from '@emotion/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { useHistory, useParams } from 'react-router-dom';
import { ReactComponent as SuccessIcon } from '../../assets/images/svg/success_icon.svg';
import PageTemplate from '../uiControls/PageTemplate/PageTemplate';
import Button from '../uiControls/button';
import ShipmentNumber from './ShipmentNumber';
import Tracker from './Tracker';
import { getOrderDetails } from '../../services/order';
import { clearGetCartMemoization } from '../../services/cart';
import { getSimilarItems } from '../../services/similar-items';
import { APIOrder, ProductPivot } from '../../types';
import ProductRecommendationList from '../uiControls/ProductRecommendationList';

const styles = {
  placedDiv: css`
    background-color: white;
    padding-bottom: 15px;
  `,
  checkCircleDiv: css`
    text-align: center;
    padding-top: 20px;
    padding-bottom: 10px;
    color: #079A18;
  `,
  thankYouTextDiv: css`
    text-align: center;
    padding-bottom: 4px;
    color: #079A18;
  `,
  thankYouText: css`
    color: #079A18;
    font-size: 16px;
    font-weight: 600;
  `,
  shipmentNumber: css`
    padding: 25px 15px 25px 15px;
  `,
  shipmentSummaryTracker: css`
    padding: 20px 15px 10px 15px;
    background: white;
  `,
  shipmentProducts: css`
    background-color: white;
    padding-left: 5px;
  `,
  tracker: css`
    margin-left: 10px;
    margin-right: 10px;
  `,
  divider1: css`
    margin-top: 10px;
  `,
  orderTextWrapper: css`
    text-align: center;
  `,
  orderText: css`
    font-size: 12px;
  `
};

// ToDo: This was already there, someone figure out the reason for this value and add some context here.
const DEFAULT_SKU_ID = '10005599';

const getProductSkuId = (orderDetails: APIOrder | null): string => {
  let productSkuId = DEFAULT_SKU_ID;

  if (orderDetails) {
    const { shipments: [shipment] } = orderDetails;
    const [item] = shipment.items || [];
    productSkuId = item ? item.skuId : DEFAULT_SKU_ID;
  }

  return productSkuId;
};

const OrderSuccessPage: React.FC = () => {
  const history = useHistory();
  const { cartId: orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState<APIOrder | null>(null);
  const [similarItems, setSimilarItems] = useState<ProductPivot[]>([]);
  const productSkuId = Number(getProductSkuId(orderDetails));

  useEffect(() => {
    (async () => {
      const orderDetailsData = await getOrderDetails(orderId as string);
      setOrderDetails(orderDetailsData);

      clearGetCartMemoization();

      const { products } = await getSimilarItems({
        pageNum: 0,
        queryTerm: '',
        sort: {},
        productSkuId
      });
      setSimilarItems(products);
    })();
  }, [orderId, productSkuId]);

  const footer = (
    <div style={{ display: 'grid', padding: 10 }}>
      <Button
        text="Continue Shopping"
        type="solidTulip"
        onClick={() => history.push('/')}
      />
    </div>
  );

  let shipmentsData: APIOrder['shipments'] = [];
  let totalShipments = 0;

  if (orderDetails) {
    shipmentsData = orderDetails.shipments;
    totalShipments = orderDetails.totalShipments;
  }

  return (
    <PageTemplate
      history={history}
      subSection={false}
      deliverySection={false}
      lefticon2={false}
      title="JioMart"
      footerNode={footer}
      backIconCallback={() => {
        history.push('/');
      }}
    >
      <section css={styles.placedDiv}>
        <div css={styles.checkCircleDiv}>
          <SuccessIcon />
        </div>
        <div css={styles.thankYouTextDiv}>
          <Typography css={styles.thankYouText}>Thank you for shopping with us</Typography>
        </div>
        <div css={styles.orderTextWrapper}>
          <Typography css={styles.orderText}>
            {`Order Id : ${orderId}`}
          </Typography>
        </div>
      </section>
      {shipmentsData.map((data, index) => (
        <section key={index}>
          <div css={styles.shipmentNumber}>
            <ShipmentNumber
              orderTotal={0}
              shipmentId={data.shipmentId}
              currentShipment={`${index + 1}`}
              totalItems={data.items.length}
              shipmentTotal={`${data.shipmentTotal}`}
              shipmentStatus={data.shipmentStatus}
              deliveryDate={data.deliveryDate}
            />
          </div>
          <div css={styles.tracker}>
            <Tracker status={data.shipmentStatus} statusHistory={data.statusHistory} />
          </div>
          {index < totalShipments - 1 ? <Divider style={{ marginTop: '15px' }} /> : null}
        </section>
      ))}
      <ProductRecommendationList
        products={similarItems}
        productSkuId={productSkuId}
        title="Recommended Products"
      />
    </PageTemplate>
  );
};

export default OrderSuccessPage;
