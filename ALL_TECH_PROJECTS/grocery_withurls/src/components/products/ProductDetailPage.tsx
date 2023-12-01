import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PageTemplate from '../uiControls/PageTemplate/PageTemplate';
import Loader from '../uiControls/Loader';
import UserLocation from '../uiControls/UserLocation';
import { getProductDetail } from '../../services/product';
import ReturnPolicyDrawer from './ReturnPolicyDrawer';
import ProductPrimarySection from './ProductPrimarySection';
import ProductDetailSection from './ProductDetailSection';
import { getSimilarItems } from '../../services/similar-items';
import Error from '../uiControls/Error';
import NoResults from '../uiControls/NoResults';
import useBoolean from '../../hooks/use-boolean';
import { ProductPivot } from '../../types';
import ProductRecommendationList from '../uiControls/ProductRecommendationList';
import { searchUrl } from '../../helpers/urls';

const ProductDetailPage: React.FC = () => {
  const history = useHistory();
  const [isFetchingData, setFetchingDataTrue, setFetchingDataFalse] = useBoolean(true);
  const [refetchData, setRefetchDataTrue, setRefetchDataFalse] = useBoolean(false);
  const [product, setProduct] = useState<ProductPivot | null>(null);
  const [similarItems, setSimilarItems] = useState<ProductPivot[]>([]);
  const [returnPolicyDrawerOpen, openReturnPolicy, closeReturnPolicy] = useBoolean(false);
  const { skuId } = useParams<{ skuId: string }>();
  const [hasError, setHasError, setHasNoError] = useBoolean(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFocus = useCallback(() => history.push(searchUrl), [history]);

  useEffect(() => {
    setFetchingDataTrue();
    setRefetchDataFalse();

    (async () => {
      let product;
      try {
        product = await getProductDetail(Number(skuId));
        setProduct(product);
      } catch (e) {
        if (e.message !== 'No Results found') {
          setHasError();
        }
      }

      try {
        const { products } = await getSimilarItems({
          filter: { categoryId: Number(product?.category.id) },
          pageNum: 0,
          queryTerm: '',
          sort: {},
          productSkuId: Number(skuId)
        });

        setSimilarItems(products);
      } catch (e) {
        if (e.message === 'No Results found') {
          setSimilarItems([]);
        } else {
          throw e;
        }
      }

      setFetchingDataFalse();
    })();
  }, [
    skuId, refetchData, setFetchingDataFalse, setFetchingDataTrue,
    setHasError, setRefetchDataFalse
  ]);

  if (isFetchingData) return <Loader />;

  const renderProductDetails = () => {
    if (!product) return <NoResults text="No Results found" />;

    return (
      <section id="target">
        <ProductPrimarySection product={product} />

        <ProductDetailSection
          product={product}
          showReturnPolicy={openReturnPolicy}
        />
        <section>
          <ProductRecommendationList
            products={similarItems}
            productSkuId={product.skuId}
            title="Similar Items"
          />
        </section>
      </section>
    );
  };

  return (
    <div id="fullDiv">
      <PageTemplate
        history={history}
        whiteBackground
        showCategories={false}
        handleFocus={handleFocus}
      >
        <UserLocation />
        <ReturnPolicyDrawer isOpen={returnPolicyDrawerOpen} onClose={closeReturnPolicy} />

        {
          hasError
            ? (
              <Error
                ctaEnabled
                onClickCta={() => {
                  setHasNoError();
                  setRefetchDataTrue();
                }}
              />
            )
            : renderProductDetails()
        }

      </PageTemplate>
    </div>
  );
};

export default ProductDetailPage;
