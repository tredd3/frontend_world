/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import { HorizontalScrollableIcons } from '../../../services/dashboard2';
import HorizontalSlider from '../../uiControls/HorizontalSlider';
import { trackLink, setPurchaseJourney } from '../../../helpers/analytics';
import Image from '../../uiControls/Image';
import linkStyles from '../linkStyles';
import { categoryUrl } from '../../../helpers/urls';

const styles = {
  wrapper: css`
    width: 76px;
    margin: 10px 5px;
    text-align: center;
  `,
  titleContainer: css`
    width: 76px;
    font-size: 11px;
    color: #000;
    font-weight: 600;
  `,
  title: css`
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow-y: hidden;
  `,
  imageContainer: css`
    width: 46px;
    height: 46px;
    border-radius: 50%;
    margin: 0px auto 5px;
  `
};

type Props = {
  widgetData: HorizontalScrollableIcons;
};

const HorizontalScrollableIconsWidget = ({ widgetData: { banners } }: Props) => {
  if (banners.length) {
    return (
      <HorizontalSlider>
        {banners.map((banner, index) => (
          <Link
            data-testid={`banner-link-${index}`}
            css={[linkStyles, styles.wrapper]}
            key={banner.id}
            to={categoryUrl(banner.id)}
            onClick={() => {
              trackLink(`Shop By Category | ${banner.title}`, 'HomeScreenClicks', 'Top');
              setPurchaseJourney('Shop By Category');
            }}
          >
            <div css={styles.imageContainer} data-testid={`category${index}`}>
              <Image width={46} alt={banner.title} src={banner.imageUrl} />
            </div>
            <div css={styles.titleContainer}>
              <div css={styles.title}>
                {banner.title}
              </div>
            </div>
          </Link>
        ))}
      </HorizontalSlider>
    );
  }

  return null;
};

export default HorizontalScrollableIconsWidget;
