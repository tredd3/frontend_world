import React, { useState, useEffect, useCallback } from 'react';
import Divider from '@material-ui/core/Divider';
import { useHistory } from 'react-router-dom';
import { getAllDashboardData } from '../services/dashboard';
import IntersectionObserver from './IntersectionObserver';
import SingleProduct from './products/SingleProduct';
import { queryStringToObject } from '../helpers/functional';
import PageTemplate from './uiControls/PageTemplate/PageTemplate';
import UserLocation from './uiControls/UserLocation';
import FilterBar from './products/FilterBar';
import NoResults from './uiControls/NoResults';
import Loader from './uiControls/Loader';
import useBoolean from '../hooks/use-boolean';
import Error from './uiControls/Error';
import { searchUrl } from '../helpers/urls';

const Collections = ({ match }) => {
  const [pageNum, setPageNum] = useState(0);
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loader, showLoader, hideLoader] = useBoolean(false);
  const [hasError, setHasError, setHasNoError] = useBoolean(false);
  const history = useHistory();

  const { type, subtype } = queryStringToObject(history.location.search.split('?')[1]);

  const fetchProducts = async () => {
    showLoader();

    try {
      const responseObj = await getAllDashboardData({
        bannerId: (match.params.collectionId || -1), type: type[0], subType: subtype[0], pageNum
      });
      hideLoader();
      setTotalCount(responseObj.totalCount);
      setProducts(products => [...products, ...responseObj.products]);
      setPageNum(pageNum + 1);
    } catch (e) {
      hideLoader();
      if (e.message !== 'No Results found') {
        setHasError();
      }
      throw e;
    }
  };

  // TODO: Fixme
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchProducts(); }, []);

  const handleFocus = useCallback(() => history.push(searchUrl), [history]);

  const renderProductsList = () => {
    if (!products.length && !loader) {
      return <NoResults />;
    }

    if (loader) { return <Loader />; }
    return (
      <>
        {products.length ? <FilterBar resultsCount={totalCount} /> : null}
        <Divider style={{ marginBottom: 15 }} />
        <section style={{ padding: '0 10px', marginLeft: '10px' }}>
          {
            products.map((product, index) => (((products.length % 20) === 0 && index === (products.length - 2))
              ? (
                <IntersectionObserver key={index} onVisible={fetchProducts} index={index}>
                  <SingleProduct product={product} />
                </IntersectionObserver>
              )
              : <SingleProduct key={index} product={product} />))
          }
        </section>
      </>
    );
  };

  return (
    <PageTemplate
      history={history}
      showCategories={false}
      showSearchedText
      inputText=""
      whiteBackground
      handleFocus={handleFocus}
    >
      <UserLocation />
      {
        hasError
          ? (
            <Error
              ctaEnabled
              onClickCta={() => {
                setHasNoError();
                fetchProducts();
              }}
            />
          )
          : renderProductsList()
      }

    </PageTemplate>
  );
};

export default Collections;
