/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import { SmallSquareCarouselBanner } from '../../../services/dashboard2';
import HorizontalSlider from '../../uiControls/HorizontalSlider';
import Image from '../../uiControls/Image';
import { track } from '../../../helpers/analytics';
import { notifyBannerClick } from '../../../intents';
import linkStyles from '../linkStyles';
import { collectionUrl } from '../../../helpers/urls';

const styles = {
  wrapper: css`
    padding: 16px 16px 8px;
    border-bottom: 8px solid #F2F2F2;
  `,
  title: css`
    color: #333;
    font-weight: 600;
    margin-bottom: 10px;
  `,
  imageWrapper: css`
    min-width: 33%;
    text-align: center;
    margin-right: 10px;
  `
};

type Props = {
  widgetData: SmallSquareCarouselBanner;
};

const SmallSquareCarouselBannerWidget = ({
  widgetData: {
    banners,
    title,
    type,
    subType
  }
}: Props) => {
  if (banners.length) {
    return (
      <div css={styles.wrapper}>
        <div css={styles.title}>{title}</div>
        <HorizontalSlider>
          {banners.map(({ id: bannerId, imageUrl }, index) => (
            <Link
              data-testid={`banner-link-${index}`}
              css={[linkStyles, styles.imageWrapper]}
              key={bannerId}
              to={collectionUrl(bannerId, type, subType)}
              onClick={e => {
                track('bannerClicks', {
                  interPromotion: {
                    widgetType: type,
                    widgetSubType: subType,
                    bannerId
                  }
                });

                if (notifyBannerClick(bannerId, type, subType)) {
                  e.preventDefault();
                }
              }}
            >
              <Image height={150} src={imageUrl} />
            </Link>
          ))}
        </HorizontalSlider>
      </div>
    );
  }
  return null;
};

export default SmallSquareCarouselBannerWidget;
