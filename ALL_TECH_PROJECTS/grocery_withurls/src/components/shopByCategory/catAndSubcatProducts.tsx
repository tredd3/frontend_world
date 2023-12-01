import React, { useState, useEffect, useCallback } from 'react';
import Divider from '@material-ui/core/Divider';
import { withRouter, useHistory, useParams } from 'react-router-dom';
import IntersectionObserver from '../IntersectionObserver';
import SingleProduct from '../products/SingleProduct';
import PageTemplate from '../uiControls/PageTemplate/PageTemplate';
import UserLocation from '../uiControls/UserLocation';
import SubcategoryWidget from '../products/SubcategoryWidget';
import { searchProduct, SearchProductArg } from '../../services/search';
import { getUser } from '../../services/user';
import FilterBar from '../products/FilterBar';
import SortFilter from '../products/SortFilter';
import NoResults from '../uiControls/NoResults';
import { getCategories as getCategoriesService } from '../../services/categories';
import { getDefaultAddress } from '../../services/address';
import { parseQSForFiltersAndSort, parseQSForAppliedFiltersCount } from '../../helpers/utilities';
import { CategoryPivot, ProductPivot } from '../../types/pivot';
import useBoolean from '../../hooks/use-boolean';
import Error from '../uiControls/Error';
import Loader from '../uiControls/Loader';
import { searchUrl } from '../../helpers/urls';

const CatAndSubcatProducts: React.FC = () => {
  const history = useHistory();
  const { categoryId: catId, subCategoryId } = useParams();
  const routeSubcategoryId = Number(subCategoryId);
  const categoryId = Number(catId);

  const [subcategories, setSubcategories] = useState<CategoryPivot[]>([]);
  const [searchedText, setSearchText] = useState('');
  const [products, setProducts] = useState<ProductPivot[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedFiltersCount, setSelectedFiltersCount] = useState(0);
  const [filters, setFilters] = useState([]);
  const [anchorEl, setAnchorEl] = useState('');
  const [isFetching, setIsFetching] = useState(true);
  const [hasError, setHasError, setHasNoError] = useBoolean(false);
  const selectedSubcategory = routeSubcategoryId && subcategories.length
    ? subcategories.find(subCatObj => subCatObj.id === routeSubcategoryId)
    : null;

  useEffect(() => {
    (async () => {
      const subcategoriesData = await getCategoriesService(categoryId);
      setSubcategories(subcategoriesData);
    })();
  }, [categoryId]);

  const setToggleFilterHooks = useCallback(async (currentTarget: any, toggle: boolean) => {
    setAnchorEl(currentTarget);
    setIsFilterOpen(toggle);
  }, []);

  const parseUriAndSetSelectedFiltersCount = useCallback(() => {
    const queryString = parseQSForAppliedFiltersCount(filters, history.location.search.split('?')[1]);
    setSelectedFiltersCount(queryString);
  }, [filters, history.location.search]);

  const createApiFilterSortObj = useCallback(async (categoryId: number) => {
    const { pincode: storePincode = 0 } = (await getDefaultAddress() || {});
    const queryString = history.location.search.split('?')[1];

    return parseQSForFiltersAndSort({
      categoryId,
      ...(storePincode !== 0 ? { storePincode } : null)
    }, queryString, ['catId', 'subcatId']);
  }, [history.location.search]);

  const getSubcategoryProducts = useCallback(async (id = 0, shouldRefreshFilters: boolean) => {
    const {
      preferences: {
        storeId, pincode: storePincode
      }
    } = await getUser();
    const { filter, sort } = await createApiFilterSortObj(routeSubcategoryId || id);
    const requestParams: SearchProductArg = {
      pageNumber, queryTerm: '', sort, filter
    };

    if (storeId) {
      requestParams.filter.storePincode = storePincode;
      requestParams.storeId = storeId;
    }

    const { products, count, filters: searchFilters } = await searchProduct(requestParams);
    setTotalCount(count);

    if (shouldRefreshFilters) {
      setFilters(searchFilters);
    }

    parseUriAndSetSelectedFiltersCount();
    return products;
  }, [createApiFilterSortObj, pageNumber, parseUriAndSetSelectedFiltersCount, routeSubcategoryId]);

  const loadProducts = useCallback(async (shouldRefreshFilters = false) => {
    selectedSubcategory && setSearchText(selectedSubcategory.name);

    try {
      setIsFetching(true);
      const subcategoryProducts = await getSubcategoryProducts(selectedSubcategory
        ? selectedSubcategory.id
        : subcategories[0].id, shouldRefreshFilters);
      setProducts(subcategoryProducts);
      setIsFetching(false);
    } catch (e) {
      setIsFetching(false);

      if (e.message === 'No Results found') {
        setProducts([]);
      } else {
        setHasError();
      }
    }
  }, [getSubcategoryProducts, selectedSubcategory, setHasError, subcategories]);

  useEffect(() => {
    if (subcategories.length) {
      loadProducts(true);
    }
  }, [subcategories.length, loadProducts]);

  const toggleFilter = useCallback(async (event: React.MouseEvent, toggle: boolean) => {
    setIsFilterOpen(!isFilterOpen);
    const { currentTarget } = event;
    const overFlow = toggle ? 'hidden' : 'scroll';
    await setToggleFilterHooks(currentTarget, toggle);
    document.body.style.overflow = overFlow;
  }, [isFilterOpen, setToggleFilterHooks]);

  const onClickSelectFilterOptions = useCallback(() => {
    parseUriAndSetSelectedFiltersCount();
    setPageNumber(0);
    loadProducts();
  }, [loadProducts, parseUriAndSetSelectedFiltersCount]);

  const clearFilters = useCallback(() => {
    setSelectedFiltersCount(0);
    loadProducts();
  }, [loadProducts]);

  const loadMore = async () => {
    setProducts([...products, ...await getSubcategoryProducts(selectedSubcategory!.id, false)]);
    setPageNumber(pageNumber + 1);
  };
  const handleFocus = () => history.push(searchUrl);

  const renderProductsList = () => {
    if (!products.length && !isFetching) {
      return <NoResults text="No results Found" />;
    }

    return (
      <>
        {isFetching ? (<Loader />) : null}
        <section id="target" data-testid="plp-results">

          <FilterBar
            resultsCount={totalCount}
            filterCount={selectedFiltersCount}
            openFilter={toggleFilter}
          />
          {isFilterOpen ? (
            <SortFilter
              closeFilter={toggleFilter}
              anchorEl={anchorEl}
              filterOptions={filters}
              onSelectOption={onClickSelectFilterOptions}
              clearFilters={clearFilters}
            />
          )
            : null}
          <Divider />
          <section style={{ padding: '0 10px' }}>
            {
              products.map((product, index) => (((products.length % 10 === 0) && index === (products.length - 2))
                ? (
                  <IntersectionObserver key={index} onVisible={loadMore} index={index}>
                    <SingleProduct product={product} />
                  </IntersectionObserver>
                )
                : <SingleProduct key={index} product={product} />))
            }
          </section>
        </section>
      </>
    );
  };

  return (
    <PageTemplate
      history={history}
      showCategories={false}
      showSearchedText
      inputText={searchedText}
      handleFocus={handleFocus}
      whiteBackground
    >
      <UserLocation />
      <section>
        {(subcategories.length > 0)
          ? (<SubcategoryWidget subcategories={subcategories} />)
          : null}
      </section>

      {
        hasError
          ? (
            <Error
              ctaEnabled
              onClickCta={() => {
                setHasNoError();
                loadProducts();
              }}
            />
          )
          : renderProductsList()
      }

    </PageTemplate>
  );
};
export default withRouter(CatAndSubcatProducts);
