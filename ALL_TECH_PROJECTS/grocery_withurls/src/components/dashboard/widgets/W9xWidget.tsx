/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import Image from '../../uiControls/Image';
import { W9x } from '../../../services/dashboard2';
import { trackLink } from '../../../helpers/analytics';
import linkStyles from '../linkStyles';
import { categoryUrl } from '../../../helpers/urls';

const CONTAINER_PADDING_HORIZONTAL = 16;
const GRID_GAP_HORIZONTAL = 8;
const IMAGE_WIDTH = Math.floor((window.outerWidth - (2 * CONTAINER_PADDING_HORIZONTAL) - (2 * GRID_GAP_HORIZONTAL)) / 3);

const styles = {
  wrapper: css`
    padding: 12px ${CONTAINER_PADDING_HORIZONTAL}px;
    border-top: 5px solid #F2F2F2;
  `,
  grid: css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 15px ${GRID_GAP_HORIZONTAL}px;
    margin-top: 15px;
  `,
  imageWrapper: css`
    border-radius: 3px;
  `,
  title: css`
    color: #333;
    font-size: 13px;
    height: calc(1.46429em * 2);
    overflow: hidden;
    margin-top: 5px;
  `
};

type Props = {
  widgetData: W9x;
};

const W9xWidget = ({
  widgetData: {
    banners,
    title
  }
}: Props) => {
  if (banners.length) {
    return (
      <section css={styles.wrapper} data-testid="Widget12">
        <div css={css`font-weight: 600;`}>{title}</div>
        <div css={styles.grid}>
          {banners.map(({ imageUrl, title, id }, index) => (
            <Link
              data-testid={`banner-link-${index}`}
              key={id}
              css={[linkStyles, css`text-align: center;`]}
              to={categoryUrl(id)}
              onClick={() => {
                trackLink(`Shop By Category | ${title}`, 'HomeScreenClicks', 'Middle');
              }}
            >
              <div css={styles.imageWrapper}>
                <Image width={IMAGE_WIDTH} css={css`border-radius: 3px;`} alt="img" src={imageUrl} />
              </div>
              <div css={styles.title}>{title}</div>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return null;
};

export default W9xWidget;
