
/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import Image from '../../uiControls/Image';
import { W4x } from '../../../services/dashboard2';
import linkStyles from '../linkStyles';
import { categoryUrl } from '../../../helpers/urls';

const CONTAINER_PADDING = 10;
const CELL_PADDING = 15;
const IMAGE_WIDTH = (window.outerWidth / 2) - (2 * CONTAINER_PADDING) - (2 * CELL_PADDING);

const styles = {
  wrapper: css`
    padding: ${CONTAINER_PADDING}px;
    border-bottom: 5px solid #F2F2F2;
  `,
  header: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
  `,
  grid: css`
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
  widgetData: W4x;
}

const W4xWidget = ({
  widgetData: {
    banners
  }
}: Props) => {
  if (banners.length) {
    return (
      <section css={styles.wrapper}>
        <div css={styles.grid}>
          {banners.map(({ imageUrl, title, id }, index) => (
            <Link
              data-testid={`banner-link-${index}`}
              key={id}
              css={[linkStyles, styles.gridCell]}
              to={categoryUrl(id)}
            >
              <div className="imageContainer">
                <Image width={IMAGE_WIDTH} alt="img" src={imageUrl} />
              </div>
              <div css={css`font-size: 13px;`}>{title}</div>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return null;
};

export default W4xWidget;
