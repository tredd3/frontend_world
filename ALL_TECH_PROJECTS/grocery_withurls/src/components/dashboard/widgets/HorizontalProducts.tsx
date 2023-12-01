/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import { HorizontalProducts } from '../../../services/dashboard2';
import { setPurchaseJourney, trackLink } from '../../../helpers/analytics';
import HorizontalProductsList from '../../uiControls/horizontalProductsList/HorizontalProductsList';
import linkStyles from '../linkStyles';
import { collectionUrl } from '../../../helpers/urls';

const styles = {
  header: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  `,
  title: css`
    color: #000;
    font-weight: 600;
    font-size: 16px;
  `,
  deepLink: css`
    color: #0066C0;
    font-size: 14px;
  `
};

type Props = {
  widgetData: HorizontalProducts;
};

const HorizontalProductsWidget = ({
  widgetData: {
    products,
    type,
    subType,
    title,
    viewAllLabel
  }
}: Props) => ((products.length)
  ? (
    <section css={css`padding: 14px;`}>
      <div css={styles.header}>
        <span css={styles.title}>{title}</span>
        <Link
          css={[linkStyles, styles.deepLink]}
          // TODO: Not sure what -1 is below
          to={collectionUrl(-1, type, subType)}
          onClick={() => {
            setPurchaseJourney('Deals');
            trackLink('See All', 'Todays Deals', 'Middle');
          }}
        >
          {viewAllLabel}
        </Link>
      </div>
      <HorizontalProductsList products={products} />
    </section>
  ) : null);

export default HorizontalProductsWidget;
