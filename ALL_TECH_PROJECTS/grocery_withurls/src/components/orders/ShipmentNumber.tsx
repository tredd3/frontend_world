/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { memo } from 'react';

const shipmentDetailWrapper = css`
 display: flex;
 justify-content: space-between;
 font-size: 14px;
`;

const shipment = css`
 display: flex;
 justify-content: space-between;
 font-size : 14px;
`;

const currentShipmentNumber = css`
  font-weight: bold;
  font-size: 14px;
`;

const totalItemsCss = css`
  font-size: 12px;
`;

const orderTotalCss = css`
  font-weight: bold;
`;

const shipmentTotalCss = css`
  font-weight: 800;
  font-size: 14px;
`;

const currentStatusWithDate = css`
  font-size: 12px;
`;

type Props = {
  shipmentId: string;
  currentShipment: string;
  totalItems: number;
  orderTotal: number;
  shipmentTotal: string;
  shipmentStatus: string;
  deliveryDate: string;
}

const ShipmentNumber: React.FC<Props> = ({
  shipmentId, currentShipment, totalItems, orderTotal,
  shipmentTotal, shipmentStatus = '', deliveryDate = ''
}) => (
  <div>
    <div css={shipmentDetailWrapper}>
      <div>
        <div css={shipment}>
          <div>
            <span css={currentShipmentNumber}>
              {' '}
              Shipment
              {' '}
              {currentShipment}
              {' '}
            </span>
            <span css={totalItemsCss}>
              {totalItems}
              {' '}
              {totalItems === 1 ? 'item' : 'items'}
            </span>
          </div>
          {orderTotal
            ? (
              <span css={orderTotalCss}>
                  &#8377;
                {' '}
                {orderTotal.toFixed(2)}
              </span>
            )
            : null}
        </div>

        {shipmentId ? (
          <span>
              ID :
            {' '}
            {shipmentId}
          </span>
        ) : null}
      </div>
      {shipmentTotal ? (
        <div css={shipmentTotalCss}>
            &#8377;
          {' '}
          {shipmentTotal}
        </div>
      ) : null}
    </div>
    {shipmentStatus !== 'cancelled' && shipmentStatus !== 'delivered' && shipmentStatus !== 'rejected' ? (
      <span css={currentStatusWithDate}>
        {`Arriving, ${deliveryDate}`}
      </span>
    ) : null}
  </div>
);

export default memo(ShipmentNumber);
