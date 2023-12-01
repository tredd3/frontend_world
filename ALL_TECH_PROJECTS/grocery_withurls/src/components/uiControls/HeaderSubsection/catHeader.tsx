/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { memo } from 'react';
import { Link } from 'react-router-dom';
import { trackLink } from '../../../helpers/analytics';
import { categoriesUrl, wishlistUrl } from '../../../helpers/urls';

const wrapper = css`
  color: #fff;
  background-color: #004D9C;
  padding: 0 16px 6px;
`;
const title = css`
  padding: 8px 0 5px ;
`;

const titleSpan = css`
  margin: 0px;
  font-size: 10px;
  font-family: inherit;
  display: inline-block;
`;

const shopByCategoryCss = css`
  display: inline-block ;
  width: 50px;
  font-size: 13px;
  color: #fff;
  margin-right : 20px;
  text-decoration : none;
  font-family: inherit;
`;

const wishList = css`
  text-decoration: none;
  font-size: 13px;
  color: #fff;
`;

type CatProps = {
  showCategories: boolean;
}

const CatHeader: React.FC<CatProps> = ({ showCategories = true }) => {
  if (!showCategories) return null;

  return (
    <section css={wrapper}>
      <div css={title}>
        <Link
          css={shopByCategoryCss}
          to={categoriesUrl}
          onClick={() => trackLink('Shop By Category', 'HomeScreenClicks', 'Top')}
        >
          <span css={titleSpan}>Shop By</span>
          Category
        </Link>
        <Link
          to={wishlistUrl}
          css={wishList}
          onClick={() => trackLink('Wish List', 'HomeScreenClicks', 'Top')}
        >
          Wish List
        </Link>
      </div>
    </section>
  );
};

export default memo(CatHeader);
