/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import PageTemplate from '../uiControls/PageTemplate/PageTemplate';
import Loader from '../uiControls/Loader';
import { getWishList, removeFromWishList } from '../../services/wish-list';
import { addToCart } from '../../services/cart';
import { ProductPivot } from '../../types';
import { NoWishList as EmptyWishListIcon } from '../../assets/images/svg';
import NoResults from '../uiControls/NoResults';
import WishListItem from './WishListItem';
import Error from '../uiControls/Error';
import useBoolean from '../../hooks/use-boolean';
import useSnackbar from '../../hooks/use-snackbar';
import { trackPage } from '../../helpers/analytics';
import { productUrl } from '../../helpers/urls';

const styles = {
  title: css`
    background-image: linear-gradient(rgb(249, 250, 252), rgb(232, 231, 236));
    padding: 10px 5px;
    font-weight: 600;
  `,
  itemContainer: css`
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    margin: 0 15px;
  `
};

const WishListPage: React.FC = () => {
  const history = useHistory();
  const [isLoading, markAsLoading, markAsLoadingDone] = useBoolean(true);
  const [wishListItems, setWishListItems] = useState<ProductPivot[]>([]);
  const [loadingError, setLoadingErrorTrue, setLoadingErrorFalse] = useBoolean(false);
  const showSnackbar = useSnackbar();

  const loadWishListItems = async () => {
    setWishListItems(await getWishList());
  };

  useEffect(() => {
    trackPage('WishList Page');

    (async () => {
      try {
        await loadWishListItems();
      } catch (e) {
        setLoadingErrorTrue();
      }

      markAsLoadingDone();
    })();
  }, [markAsLoadingDone, setLoadingErrorTrue]);

  const handleItemClick = useCallback((skuId: number) => {
    history.push(productUrl(skuId));
  }, [history]);

  const handleItemAdd = useCallback(async (product: ProductPivot) => {
    // ToDo: Need to figure out creating a wrapper for common cart add functionalities like showing a toast for success/error
    // and to update cart/cart count on context which is a WIP.

    try {
      await addToCart(product);
      showSnackbar({ type: 'success', message: 'Item added to cart' });
    } catch {
      showSnackbar({ type: 'error', message: 'Error adding to cart' });
    }
  }, [showSnackbar]);

  const handleItemDelete = useCallback(async (skuId: number) => {
    try {
      await removeFromWishList(skuId);
      showSnackbar({ type: 'success', message: 'Item deleted from wishlist' });
      loadWishListItems();
    } catch {
      showSnackbar({ type: 'error', message: 'Error while deleting' });
    }
  }, [showSnackbar]);

  const renderWishListItems = useCallback(() => {
    if (loadingError) {
      return (
        <Error
          ctaEnabled
          onClickCta={() => {
            markAsLoading();
            setLoadingErrorFalse();
            loadWishListItems();
          }}
        />
      );
    }

    if (!wishListItems.length) {
      return (
        <NoResults
          text="No Wish List"
          icon={<EmptyWishListIcon />}
        />
      );
    }

    return wishListItems.map(product => (
      <div css={styles.itemContainer} key={product.id}>
        <WishListItem
          product={product}
          onClickItem={handleItemClick}
          onClickDelete={handleItemDelete}
          onClickAdd={handleItemAdd}
        />
      </div>
    ));
  }, [
    wishListItems, loadingError, handleItemClick,
    handleItemDelete, handleItemAdd, markAsLoading, setLoadingErrorFalse
  ]);

  return (
    <PageTemplate history={history} subSection={false} deliverySection={false} title="JioMart">
      <div css={styles.title}>My WishList</div>
      {isLoading ? <Loader /> : renderWishListItems()}
    </PageTemplate>
  );
};

export default WishListPage;
