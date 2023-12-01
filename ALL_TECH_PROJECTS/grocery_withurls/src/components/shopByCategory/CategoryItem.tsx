/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useHistory } from 'react-router-dom';
import { subCategoryUrl } from 'src/helpers/urls';
import { trackLink } from '../../helpers/analytics';
import Image from '../uiControls/Image';

const categoryItem = css`
  width: 49%;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid #00000029;
  margin-bottom: 6px;
  padding: 8px;
  cursor: pointer;

  & .lazy-load-image-loaded {
    width: 63px;
    height: 56px !important;
  }
  & img {
    min-width: 100%;
    height: 56px;
    position: relative;
  };
`;

const categoryName = css`
  margin-left: 15px;
  font-size: 12px;
`;

const catImgWrapper = css`
  width: 63px;
  height: 56px;
`;

type Props = {
  data: APICategory;
  parentCatId: number;
  parentCategoryName: string;
};

type APICategory = {
  CategoryName: string;
  CategoryId: number;
  CategoryIcon: string;
  CategoryImage: string;
};

export default (
  ({
    data, parentCatId, parentCategoryName
  }: Props) => {
    const history = useHistory();
    const { CategoryImage, CategoryName, CategoryId } = data;

    const goToProductListPage = () => {
      trackLink(`Shop By Category | ${parentCategoryName} | ${CategoryName}`, 'HomeScreenClicks', 'Top');
      history.push(subCategoryUrl(parentCatId, CategoryId));
    };

    return (
      <div data-testid="category-item" css={categoryItem} onClick={goToProductListPage}>
        <div css={catImgWrapper}>
          <Image
            width={63}
            alt={CategoryName}
            src={CategoryImage}
          />
        </div>
        <div css={categoryName}>{CategoryName}</div>
      </div>
    );
  }
);
