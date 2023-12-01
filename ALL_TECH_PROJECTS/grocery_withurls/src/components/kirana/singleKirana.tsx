/** @jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { KiranaPivot } from '../../types';
import Image from '../uiControls/Image';

const SingleKirana: React.FC<{store: KiranaPivot }> = ({ store }) => (
  <div
    style={{
      minHeight: 70,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    }}
  >
    {store.image ? (
      <div style={{
        minWidth: 70,
        height: 70,
        marginRight: '10px',
        borderRadius: '3px'
      }}
      >
        <Image
          src={store.image}
          height={70}
          alt={`${store.name}`}
        />
      </div>
    ) : (
      <div
        style={{
          lineHeight: '70px',
          height: 70,
          minWidth: 70,
          textAlign: 'center',
          color: 'hsla(0, 0%, 100%, 1)',
          fontSize: '40px',
          backgroundColor: 'hsla(12, 87%, 53%, 1)',
          borderRadius: '3px',
          marginTop: '10px',
          marginRight: '10px',
          marginBottom: '10px'
        }}
      >
        {store.name.charAt(0)}
      </div>
    )}
    <div
      style={{
        marginTop: '10px',
        marginBottom: '10px',
        position: 'relative',
        minHeight: '70px'
      }}
    >
      <div>{store.name}</div>
      <div
        style={{
          marginBottom: '30px',
          color: 'hsla(0, 0%, 60%, 1)',
          fontSize: '12px'
        }}
      >
        {store.location.address}
      </div>
      <div
        style={{
          marginTop: 'auto',
          color: 'hsla(0, 0%, 40%, 1)',
          fontSize: '12px'
        }}
      >
        {store.isClosed ? (
          <span style={{ color: 'hsla(0, 69%, 53%, 1)', fontWeight: 400 }}>
              Closed
          </span>
        ) : (
          <span style={{ color: 'hsla(126, 91%, 31%, 1)', fontWeight: 400 }}>
                Open &#8226;
          </span>
        )}
        {' '}
        {store.nextDelivery}
        {' '}
        {' '}
          &#8226;
        {' '}
        <span style={{ color: 'hsla(0, 0%, 40%, 1)' }}>
          {Math.round(store.distance.amount)}
            &nbsp;
          {store.distance.unit}
        </span>
      </div>
    </div>
  </div>
);
export default SingleKirana;
