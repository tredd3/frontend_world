/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import { EditButton, DeleteButton } from './AddressButtons';
import { ReactComponent as ShopIcon } from '../../assets/images/svg/shop_icon.svg';

const kiranaBlockWrapper = css`
  border-top: #ccc solid 1px;
  margin: 10px 0px 10px 30px;
  padding: 10px 0px 10px 0px;
  display: flex;
  justify-content: space-between;
`;

const kiranaLink = css`
  color: #0066C0;
  text-decoration: none;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  padding-right : 1px;
`;

const kiranaIconWrapper = css`
  display: inline-block;
  margin-right: 10px;
`;

const actionIconsWrapper = css`
  display: flex; 
  max-height: 27px;
`;

type KiranaBlockProps = {
  storeId?: number;
  storeName?: string;
  onDeleteClick: React.MouseEventHandler<HTMLButtonElement>;
  selectKiranaHref: string;
};

const KiranaBlock: React.FC<KiranaBlockProps> = ({
  storeId, storeName, selectKiranaHref, onDeleteClick
}) => (
    <div css={kiranaBlockWrapper}>
      <Link css={kiranaLink} to={selectKiranaHref} replace>
        <span css={kiranaIconWrapper}>
          <ShopIcon />
        </span>
        {!storeId ? '+ Add kirana partner' : storeName}
      </Link>
      {storeId ? (
        <div css={actionIconsWrapper}>
          <EditButton href={selectKiranaHref} />
          <DeleteButton onClick={onDeleteClick} />
        </div>
      ) : null}
    </div>
  );

export default memo(KiranaBlock);
