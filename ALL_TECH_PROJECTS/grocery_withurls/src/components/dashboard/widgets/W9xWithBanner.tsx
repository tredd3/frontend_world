
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import Image from '../../uiControls/Image';
import { W9xWithBanner } from '../../../services/dashboard2';
import { track } from '../../../helpers/analytics';
import linkStyles from '../linkStyles';
import { collectionUrl } from '../../../helpers/urls';

const styles = {
  wrapper: css`
    padding: 12px 16px;
    border-top: 5px solid #F2F2F2;
  `,
  grid: css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin-top: 15px;
    grid-gap: 15px 8px;
    background-color: #F2F2F2;
  `,
  gridCell: css`
    text-align: center;
  `
};

type Props = {
  widgetData: W9xWithBanner;
}

const W9xWithBannerWidget = ({
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
                <Image width={100} alt="img" src={imageUrl} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return null;
};

export default W9xWithBannerWidget;
