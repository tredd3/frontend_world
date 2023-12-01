/** @jsx jsx */
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import { css, jsx } from '@emotion/core';
import PageTemplate from '../uiControls/PageTemplate/PageTemplate';
import OrderSummary from './OrderSummary';
import ShipmentNumber from './ShipmentNumber';
import Tracker from './Tracker';
import SimilarItemsWidget from '../uiControls/Widgets/SimilarItemsWidget/index';
import Button from '../uiControls/button/index';
import PaymentMode from '../uiControls/Orders/PaymentMode';
import DeliveryAddress from '../uiControls/Orders/DeliveryAddress';
import OrderDetailsData from '../uiControls/Orders/OrderDetailsData';
import AlertBox from '../uiControls/AlertBox';
import { makeCall } from '../../intents';
import { trackLink, trackPage } from '../../helpers/analytics';
import { getOrderDetails, cancelShipment as cancelShipmentService } from '../../services/order';
import useBoolean from '../../hooks/use-boolean';
import { APIOrder, APIOrderShipment } from '../../types';
import useSnackbar from '../../hooks/use-snackbar';
import RefundMessage from './RefundMessage';
import Error from '../uiControls/Error';

const shipmentNumber = css` 
  padding-right: 15px;
  padding-top: 25px;
  padding-bottom: 10px;
`;

const shipmentProducts = css`
  background-color: white;
  padding-left: 5px;
`;

// order is cancelled if all the shipments inside the order have status cancelled
// eslint-disable-next-line max-len
const isOrderCancelled = (shipments: APIOrderShipment[]) => (
  Boolean(shipments.find(
    shipment => shipment.shipmentStatus.toLowerCase() === 'cancelled'
  ))
);

const OrderDetails: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<APIOrder | null>(null);
  const [isLoading, markAsLoading, markAsLoadingDone] = useBoolean(true);
  // ToDo: Sahil: Leaving this setter so that you don't have to re-add this code after gathering context with QA
  // about when shipment id is not present.
  const [, markAllShipmentsCancelled] = useState(false);
  const [alertBox, showAlertBox, hideAlertBox] = useBoolean(false);
  const [selectedShipmentIndex, setSelectedShipmentIndex] = useState(0);
  const [isError, markError, markErrorResolved] = useBoolean(false);
  const showSnackbar = useSnackbar();

  const { orderId } = useParams();
  const history = useHistory();

  const fetchOrderDetails = async () => {
    markAsLoading();
    try {
      const orderDetails = await getOrderDetails(orderId!);
      setOrderDetails(orderDetails);
      if (orderDetails && orderDetails.shipments) {
        markAllShipmentsCancelled(isOrderCancelled(orderDetails.shipments));
      }
    } catch {
      markError();
    }
    markAsLoadingDone();
    trackPage('Order Details Page');
  };

  useEffect(() => {
    fetchOrderDetails();
    // TODO: FIXME
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isError) {
    return (
      <PageTemplate
        history={history}
        subSection={false}
        deliverySection={false}
        righticon1={false}
        righticon2={false}
        customRighticon1={<MoreVertIcon />}
        title="Order Details"
      >
        <Error
          ctaEnabled
          onClickCta={() => {
            fetchOrderDetails();
            markErrorResolved();
          }}
        />
      </PageTemplate>
    );
  }

  if (!orderDetails) return null;

  const {
    orderValue, totalItems, productDiscount, couponValue, delCharges, finalAmount,
    netOrderAmount: youPaid = 0, totalSavings, deliveryAddressName, deliveryAddressAddressLine1,
    deliveryAddressAddressLine2, deliveryAddressPin, deliveryAddressMobileNumber, merchantContactNo,
    shipments, refunds
  } = orderDetails;
  const paymentMode = (shipments.length && shipments[0].paymentMode) || '';

  const cancelShipment = async () => {
    try {
      await cancelShipmentService(Number(orderId!), shipments[selectedShipmentIndex]);
    } catch (e) {
      showSnackbar({
        message: 'Unable to cancel order',
        type: 'error'
      });
    }
  };

  const handleConfirmButton = () => {
    hideAlertBox();
    cancelShipment();
  };

  return (
    <PageTemplate
      history={history}
      subSection={false}
      deliverySection={false}
      righticon1={false}
      righticon2={false}
      customRighticon1={<MoreVertIcon />}
      title="Order Details"
    >
      {isLoading ? null : (
        <section>
          <AlertBox
            open={alertBox}
            title="Shipment Cancellation"
            message={`Are you sure you want to cancel shipment ${selectedShipmentIndex + 1}?`}
            handleClose={hideAlertBox}
          >
            <Button onClick={handleConfirmButton} text="YES" style={{ background: 'white', color: 'green' }}>
              YES
            </Button>
            <Button onClick={hideAlertBox} text="NO" style={{ background: 'white', color: 'green' }}>
              NO
            </Button>
          </AlertBox>
          {orderDetails ? (
            <OrderSummary
              orderId={orderDetails.orderId}
              amount={orderDetails.netOrderAmount}
              totalItems={orderDetails.totalItems}
              totalShipments={orderDetails.totalShipments}
              orderedBy={orderDetails.orderedBy}
              orderDate={orderDetails.orderDate}
            />
          ) : null}
          <Divider />
          <RefundMessage
            paymentMode={paymentMode}
            finalAmount={finalAmount || 0}
            netOrderAmount={youPaid}
            refunds={refunds}
          />
          {shipments && shipments.map((shipment, index) => {
            const { canBeCancelled } = shipment;
            return (
              <section
                key={shipment.shipmentId}
                style={{ marginLeft: '10px', marginBottom: '20px' }}
              >
                <div css={shipmentNumber}>
                  <ShipmentNumber
                    shipmentId={shipment.shipmentId}
                    currentShipment={`${index + 1}`}
                    totalItems={shipment.items.length}
                    shipmentTotal={`${shipment.shipmentTotal}`}
                    shipmentStatus={shipment.shipmentStatus.toLowerCase()}
                    deliveryDate={shipment.deliveryDate}
                    orderTotal={10}
                  />
                </div>
                <section>
                  <Tracker status={shipment.shipmentStatus} statusHistory={shipment.statusHistory} />
                  <Divider />
                  <div css={shipmentProducts}>
                    <SimilarItemsWidget widgetData={shipment.items} status={shipment.shipmentStatus} />
                  </div>
                </section>
                <Divider />
                <div
                  style={{
                    backgroundColor: 'white',
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    marginBottom: '10px',
                    display: 'flex',
                    justifyContent: 'space-around',
                    marginTop: '2px'
                  }}
                >
                  {canBeCancelled ? (
                    <Button
                      onClick={() => {
                        showAlertBox();
                        setSelectedShipmentIndex(index);
                      }}
                      text="Cancel Shipment"
                      name="useLocation"
                      style={{ padding: '7px' }}
                      wrapperStyle={{ width: '41%', marginRight: '5px' }}
                      variant="subtitle2"
                      type="solidGray"
                    />
                  ) : null}
                  {merchantContactNo ? (
                    <Button
                      onClick={() => {
                        trackLink('Call Your Kirana', 'Customer Services', 'Middle');
                        makeCall(Number(merchantContactNo));
                      }}
                      text="Call Kirana"
                      name="useLocation"
                      style={{ padding: '7px' }}
                      wrapperStyle={{ width: '41%' }}
                      type="solidGray"
                    />
                  ) : null}
                </div>
              </section>
            );
          })}

          <OrderDetailsData
            orderValue={orderValue}
            totalItems={totalItems}
            productDiscount={productDiscount}
            couponValue={couponValue}
            delCharges={delCharges}
            youPaid={youPaid}
            totalSavings={totalSavings}
          />
          <PaymentMode paymentMode={paymentMode} />
          <DeliveryAddress
            deliveryAddressName={deliveryAddressName}
            deliveryAddressAddressLine1={deliveryAddressAddressLine1}
            deliveryAddressAddressLine2={deliveryAddressAddressLine2}
            deliveryAddressPin={deliveryAddressPin}
            deliveryAddressMobileNumber={deliveryAddressMobileNumber}
          />
        </section>
      )}
    </PageTemplate>
  );
};

export default OrderDetails;
