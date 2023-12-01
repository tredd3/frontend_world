/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import { Check } from '@material-ui/icons';
import { KiranaPivot } from '../../types';
import Image from '../uiControls/Image';

const styles = {
  container: css`
    background-color: hsla(0, 0%, 96%, 1);
    padding: 10px;
  `,
  headingWrapper: css`
    display: flex;
    align-items: center;
  `,
  heading: css`
    font-size: 14px;
    font-weight: 300;
  `,
  removeButton: css`
    color: hsla(208, 100%, 37%, 1);
    margin-left: auto;
    font-size: 14px;
    background: none;
    border: none;
  `,
  kiranaWrapper: css`
    min-height: 70px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 10px;
    box-shadow: 0px 3px 4px 0px hsla(0, 0%, 0%, 0.16);
    background: #fff;
  `,
  image: css`
    width: 70px;
    height: 70px;
    margin-right: 10px;
    min-width: 70px;
  `,
  altImage: css`
    line-height: 70px;
    height: 70px;
    width: 70px;
    text-align: center;
    color: hsla(0, 0%, 100%, 1);
    font-size: 40px;
    background-color: hsla(12, 87%, 53%, 1);
    border-radius: 3px;
    margin-top: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
  `,
  storeDetails: css`
    margin-top: 10px;
    margin-bottom: 10px;
    position: relative;
    min-height: 70px;
  `,
  storeAddress: css`
    margin-bottom: 30px;
    color: hsla(0, 0%, 60%, 1);
    font-size: 12px;
  `,
  storeStatus: css`
    margin-top: auto;
    color: hsla(0, 0%, 40%, 1);
    font-size: 12px;
  `,
  storeClosed: css`
    color: hsla(0, 69%, 53%, 1);
    font-weight: 400;
  `,
  storeOpened: css`
    color: hsla(126, 91%, 31%, 1);
    font-weight: 400;
  `,
  storeDistance: css`
    color: hsla(0, 0%, 40%, 1);
  `,
  check: css`
    margin-left: auto;
    color: hsla(126, 91%, 31%, 1);
  `
};

const SelectedKirana: React.FC<{store: KiranaPivot; onRemoveClick: () => void}> = ({ store, onRemoveClick }) => (
  <div css={styles.container}>
    <div css={styles.headingWrapper}>
      <h3 css={styles.heading}>
      Your Current Kirana Partner
      </h3>
      <button css={styles.removeButton} onClick={onRemoveClick}>
        Remove
      </button>
    </div>
    <div css={styles.kiranaWrapper}>
      {store.image ? (
        <div css={styles.image}>
          <Image
            src={store.image}
            height={70}
            alt={`${store.name}`}
          />
        </div>
      ) : (
        <div css={styles.altImage}>
          {store.name.charAt(0)}
        </div>
      )}
      <div css={styles.storeDetails}>
        <div>{store.name}</div>
        <div css={styles.storeAddress}>
          {store.location.address}
        </div>
        <div css={styles.storeStatus}>
          {store.isClosed ? (
            <span css={styles.storeClosed}>
            Closed
            </span>
          ) : (
            <span css={styles.storeOpened}>
            Open &#8226;
            </span>
          )}
          {` ${store.nextDelivery} • `}
          <span css={styles.storeDistance}>
            {`${Math.round(store.distance.amount)} ${store.distance.unit}`}
          </span>
        </div>
      </div>
      <div css={styles.check}>
        <Check />
      </div>
    </div>
  </div>
);

export default SelectedKirana;
