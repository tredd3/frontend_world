/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import { BigSquareCarouselBanner } from '../../../services/dashboard2';
import HorizontalSlider from '../../uiControls/HorizontalSlider';
import Image from '../../uiControls/Image';
import { track } from '../../../helpers/analytics';
import { notifyBannerClick } from '../../../intents';
import linkStyles from '../linkStyles';
import { collectionUrl } from '../../../helpers/urls';

const styles = {
  wrapper: css`
    background-color: #F2F2F2;
  `,
  imageWrapper: css`
    height: 288px;
    min-width: 288px;
    border-radius: 4px;
    padding: 16px 4px 16px 16px;
  `
};

type Props = {
  widgetData: BigSquareCarouselBanner;
};

const BigSquareCarouselBannerWidget = ({
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
            <Image width={288} src={imageUrl} css={css`border-radius: 4px;`} />
          </Link>
        ))}
      </HorizontalSlider>
    );
  }

  return null;
};

export default BigSquareCarouselBannerWidget;
