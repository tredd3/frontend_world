/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import Carousel from '../../uiControls/Carousel';
import Image from '../../uiControls/Image';
import { Pager } from '../../../services/dashboard2';
import { track, setPurchaseJourney } from '../../../helpers/analytics';
import { notifyBannerClick } from '../../../intents';
import linkStyles from '../linkStyles';
import { collectionUrl } from '../../../helpers/urls';

const styles = {
  bannerWrapper: css`
    padding: 0 8px;
    :first-of-type {
      padding-left: 16px;
    }
    :last-of-type {
      padding-right: 16px;
    }
  `,
  banner: css`
    display: block;
    margin-bottom: 16px;
  `,
  imgContainer: css`
    background-color: transparent;
    margin: 16px 0;
  `
};

type Props = {
  widgetData: Pager;
};

const PagerWidget = ({
  widgetData: {
    banners,
    type,
    subType
  }
}: Props) => (
  banners.length
    ? (
      <Carousel itemStyles={styles.bannerWrapper}>
        {banners.map(({ id: bannerId, imageUrl }, index) => (
          <Link
            data-testid={`banner-link-${index}`}
            key={bannerId}
            css={[linkStyles, styles.banner]}
            to={collectionUrl(bannerId, type, subType)}
            onClick={e => {
              track('bannerClicks', {
                interPromotion: {
                  widgetType: type,
                  widgetSubType: subType,
                  bannerId
                }
              });

              setPurchaseJourney('Hero Banner');

              if (notifyBannerClick(bannerId, type, subType)) {
                e.preventDefault();
              }
            }}
          >
            <div css={styles.imgContainer}>
              <Image height={170} src={imageUrl} css={css`border-radius: 3px;`} />
            </div>
          </Link>
        ))}
      </Carousel>
    )
    : null
);

export default PagerWidget;
