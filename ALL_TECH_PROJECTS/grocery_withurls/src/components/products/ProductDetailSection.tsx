/** @jsx jsx */
import React from 'react';
import { jsx, css } from '@emotion/core';
import { Divider } from '../Material-UI';
import Icon2 from '../../assets/images/svg/money-2.svg';
import Icon3 from '../../assets/images/svg/return.svg';
import Icon1 from '../../assets/images/svg/shipped.svg';
import InfoIcon from '../../assets/images/svg/info2.svg';
import ExtraInformation from './ExtraInformation';
import VegNonVeg from './VegNonVeg';
import StyleConstants from '../../constants/style';
import { ProductPivot } from '../../types';

const { white, black } = StyleConstants;

const styles = {
  ctr: css`
    border-bottom: 5px solid #f5f5f5;
  `,
  deliveryInfo: css`
    border-bottom: 5px solid #f5f5f5;
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
  `,
  deliveryInfoIconCtr: css`
    display: flex;
    justify-content: center;
  `,
  deliveryInfoIcon: css`
    display: flex;
    justify-content: center;
    height: 50px;
    width: 50px;
    background: ${white.whiteSmoke};
    border-radius: 50%;
  `,
  deliveryInfoText: css`
    display: flex;
    justify-content: center;
    font-size: 12px;
    color: ${black.black};
    font-family: 'OPEN SANS';
    font-weight: 530;
  `,
  divider: css`
    background: #F5F5F5;
    padding: 2px;
  `,
  aboutThisItem: css`
    margin: 15px;
    font-family: 'OPEN SANS';
    font-size: 14px;
    color: ${black.black};
  `,
  aboutThisItemHeader: css`
    font-weight: 900;
    margin-bottom: 10px;
  `
};

type Props = {
  showReturnPolicy: () => unknown;
  product: ProductPivot;
};

const ProductDetailSection: React.FC<Props> = ({
  showReturnPolicy,
  product: {
    description,
    skuId,
    ingredients,
    nutritionalFacts,
    disclaimer,
    isVeg,
    additionalInformation,
    manufacturerAddress,
    deliverySlot = 'Get Tomorrow'
  }
}) => {
  const aboutUiComponent = [];

  if (description) {
    aboutUiComponent.push(<ExtraInformation
      text1="Description"
      text2={description}
      id={skuId}
    />);
  }
  if (ingredients) {
    aboutUiComponent.push(<ExtraInformation
      text1="Ingredient"
      text2={ingredients}
      id={skuId}
    />);
  }
  if (nutritionalFacts) {
    aboutUiComponent.push(<ExtraInformation
      text1="Nutritional Facts"
      text2={nutritionalFacts}
      id={skuId}
    />);
  }
  if (disclaimer) {
    aboutUiComponent.push(<ExtraInformation
      text1="Disclaimer"
      text2={disclaimer}
      id={skuId}
    />);
  }
  if (isVeg !== null) {
    aboutUiComponent.push(<ExtraInformation
      text1="Features & Details"
      child={<VegNonVeg isVeg={isVeg} />}
      id={skuId}
    />);
  }
  if (additionalInformation) {
    aboutUiComponent.push(<ExtraInformation
      text1="Additional Information"
      text2={additionalInformation}
      id={skuId}
    />);
  }
  if (manufacturerAddress) {
    aboutUiComponent.push(<ExtraInformation
      text1="Manufacturer Address"
      text2={manufacturerAddress}
      id={skuId}
    />);
  }

  return (
    <div css={styles.ctr}>
      <div css={styles.deliveryInfo}>
        <div>
          <span css={styles.deliveryInfoIconCtr}>
            <span css={styles.deliveryInfoIcon}>
              <img src={Icon1} alt={deliverySlot} />
            </span>
          </span>
          <div css={styles.deliveryInfoText}>{deliverySlot}</div>
        </div>
        <div>
          <span css={styles.deliveryInfoIconCtr}>
            <span css={styles.deliveryInfoIcon}>
              <img src={Icon2} alt="Pay on delivery" />
            </span>
          </span>
          <div css={styles.deliveryInfoText}>Pay on Delivery</div>
        </div>
        <div>
          <span css={styles.deliveryInfoIconCtr}>
            <span css={styles.deliveryInfoIcon}>
              <img src={Icon3} alt="Return policy" />
            </span>
          </span>
          <div style={{ display: 'flex' }} onClick={showReturnPolicy}>
            <img src={InfoIcon} style={{ marginRight: '2px' }} alt="Info" />
            <div css={[styles.deliveryInfoText, { color: 'rgb(26, 115, 233)' }]}>
              Return policy
            </div>
          </div>
        </div>
      </div>

      <section css={styles.aboutThisItem}>
        <div css={styles.aboutThisItemHeader}>About This Item</div>
        <div>
          {aboutUiComponent.map((data, i) => (
            <div key={`about-ui-component-${i}`}>
              {data}
              {aboutUiComponent.length !== i + 1 ? <Divider style={{ marginTop: '10px', marginBottom: '10px' }} /> : null}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetailSection;
