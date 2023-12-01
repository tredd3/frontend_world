import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import { searchProduct } from '../../services/search';
import IntersectionObserver from '../IntersectionObserver';
import SingleProduct from '../products/SingleProduct';
import PageTemplate from '../uiControls/PageTemplate/PageTemplate';
import UserLocation from '../uiControls/UserLocation';
import FilterBar from '../products/FilterBar';
import Loader from '../uiControls/Loader';
import SortFilter from '../products/SortFilter';
import useBoolean from '../../hooks/use-boolean';
import { parseQSForFiltersAndSort, parseQSForAppliedFiltersCount } from '../../helpers/utilities';
import Error from '../uiControls/Error';
import NoResults from '../uiControls/NoResults';
import { getUser } from '../../services/user';
import { searchUrl } from '../../helpers/urls';

const SearchProducts = ({ match, history }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedFiltersCount, setSelectedFiltersCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loader, showLoader, hideLoader] = useBoolean(false);
  const [paginationLoader, showPaginationLoader, hidePaginationLoader] = useBoolean(false);
  const [filtersVisible, showFilters, hideFilters] = useBoolean(false);
  const [filters, setFilters] = useState([]);
  const [hasError, setHasError, setHasNoError] = useBoolean(false);

  const onShowFilters = event => {
    showFilters();
    const { currentTarget } = event;
    setAnchorEl(currentTarget);
    document.body.style.overflow = 'hidden';
  };

  const onHideFilters = () => {
    hideFilters();
    setAnchorEl(null);
    document.body.style.overflow = 'scroll';
  };

  const makeAPIRequestForSearch = async (filter, sort) => {
    const {
      preferences: {
        storeId, pincode: storePincode
      }
    } = await getUser();
    const requestParams = {
      pageNumber, queryTerm: match.params.searchText, sort, filter
    };

    if (storeId) {
      requestParams.filter.storePincode = storePincode;
      requestParams.storeId = storeId;
    }

    return searchProduct(requestParams);
  };

  const fetchProducts = async () => {
    showLoader();
    const queryString = history.location.search.split('?')[1];
    const { filter, sort } = parseQSForFiltersAndSort({}, queryString);
    setSelectedFiltersCount(parseQSForAppliedFiltersCount(filters, queryString));

    try {
      const response = await makeAPIRequestForSearch(filter, sort);

      setProducts([...response.products]);

      if (!filters.length) {
        setFilters(response.filters);
      }

      setTotalCount(response.count);
      hideLoader();
    } catch (e) {
      if (e.message !== 'No Results found') {
        setHasError();
      }
      hideLoader();
    }
  };

  const loadMoreProducts = async () => {
    showPaginationLoader();
    const { filter, sort } = parseQSForFiltersAndSort({}, history.location.search.split('?')[1]);

    const response = await makeAPIRequestForSearch(filter, sort);

    setProducts([...products, ...response.products]);
    hidePaginationLoader();
  };

  const onChangeFilters = () => {
    if (pageNumber === 0) {
      fetchProducts();
    } else {
      setPageNumber(0);
    }
  };

  const clearFilters = () => {
    if (pageNumber === 0) {
      fetchProducts();
    } else {
      setPageNumber(0);
    }

    setSelectedFiltersCount(0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pageNumber > 0) {
      loadMoreProducts();
    } else {
      fetchProducts();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  const handleFocus = () => history.push(searchUrl);

  const renderProductsList = () => {
    if (!products.length && !loader) {
      return <NoResults />;
    }

    return (
      <>
        { loader || paginationLoader ? <Loader /> : null }
        {products.length ? <FilterBar resultsCount={totalCount} filterCount={selectedFiltersCount} openFilter={onShowFilters} /> : null}
        {filtersVisible ? (
          <SortFilter
            closeFilter={onHideFilters}
            anchorEl={anchorEl}
            filterOptions={filters}
            onSelectOption={onChangeFilters}
            clearFilters={clearFilters}
          />
        )
          : null}
        <Divider />
        <section style={{ padding: '0 10px' }}>
          {
            products.map((product, index) => (((products.length % 10) === 0 && index === (products.length - 2))
              ? (
                <IntersectionObserver key={index} onVisible={() => setPageNumber(pageNumber + 1)} index={index}>
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
    <>
      <PageTemplate
        history={history}
        showCategories={false}
        showSearchedText
        inputText=""
        handleFocus={handleFocus}
        whiteBackground
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
    </>
  );
};

export default SearchProducts;
