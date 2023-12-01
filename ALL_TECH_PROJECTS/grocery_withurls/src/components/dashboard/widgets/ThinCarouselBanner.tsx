/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import { ThinCarouselBanner } from '../../../services/dashboard2';
import HorizontalSlider from '../../uiControls/HorizontalSlider';
import { track } from '../../../helpers/analytics';
import { notifyBannerClick } from '../../../intents';
import Image from '../../uiControls/Image';
import linkStyles from '../linkStyles';
import { collectionUrl } from '../../../helpers/urls';

const styles = {
  wrapper: css`
    background-color: #F2F2F2; 
  `,
  imageWrapper: css`
    min-width: 80%;
    padding: 16px;
  `
};

type Props = {
  widgetData: ThinCarouselBanner;
};

const ThinCarouselBannerWidget = ({
  widgetData: {
    banners,
    type,
    subType
  }
}: Props) => {
  if (banners.length) {
    return (
      <HorizontalSlider css={styles.wrapper}>
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
            <Image width={344} src={imageUrl} />
          </Link>
        ))}
      </HorizontalSlider>
    );
  }

  return null;
};

export default ThinCarouselBannerWidget;
