
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import Image from '../../uiControls/Image';
import { W4xWithBanner } from '../../../services/dashboard2';
import { track } from '../../../helpers/analytics';
import linkStyles from '../linkStyles';
import { collectionUrl } from '../../../helpers/urls';

const CONTAINER_PADDING = 10;
const CELL_PADDING = 15;
const IMAGE_WIDTH = (window.outerWidth / 2) - (2 * CONTAINER_PADDING) - (2 * CELL_PADDING);

const styles = {
  wrapper: css`
    padding: ${CONTAINER_PADDING}px;
    border-bottom: 5px solid #F2F2F2;
  `,
  grid: css`
    border: 1px solid #00000029;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 10px;
    grid-gap: 1px 1px;
    background-color: #F2F2F2;
  `,
  gridCell: css`
    text-align: center;
    background-color: #fff;
    padding: ${CELL_PADDING}px;
    display: flex;
    flex-direction: column;
  `
};

type Props = {
  widgetData: W4xWithBanner;
}

const W4xWithBannerWidget = ({
  widgetData: {
    title,
    banners,
    type,
    subType
  }
}: Props) => {
  if (banners.length) {
    return (
      <section css={styles.wrapper}>
        <div css={css`font-size: 16px;`}>{title}</div>
        <div css={styles.grid}>
          {banners.map(({
            id: bannerId,
            imageUrl
          }, index) => (
            <Link
              data-testid={`banner-link-${index}`}
              key={bannerId}
              css={[linkStyles, styles.gridCell]}
              to={collectionUrl(bannerId, type, subType)}
              onClick={() => {
                track('bannerClicks', {
                  interPromotion: {
                    widgetName: title,
                    widgetType: type,
                    widgetSubType: subType,
                    bannerId
                  }
                });
              }}
            >
              <div css={css`border-radius: 3px;`}>
                <Image width={IMAGE_WIDTH} alt="img" src={imageUrl} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return null;
};

export default W4xWithBannerWidget;
