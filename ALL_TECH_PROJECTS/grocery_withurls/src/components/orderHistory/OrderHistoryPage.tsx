import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core';
import style from './style';
import Order from './Order';
import Loader from '../uiControls/Loader';
import OrderFilterDialog, { getTimePeriodFilterParams } from './OrderFilterDialog';
import PageTemplate from '../uiControls/PageTemplate/PageTemplate';
import SearchBar from '../uiControls/SearchBar';
import NoResult from '../uiControls/NoResults';
import IntersectionObserver from '../IntersectionObserver';
import { ReactComponent as FilterIcon } from '../../assets/images/svg/Filter.svg';
import { NoOrder } from '../../assets/images/svg';
import useBoolean from '../../hooks/use-boolean';
import { getOrderHistory } from '../../services/order';
import { APIOrder, OrderFilters } from '../../types';
import { trackPage } from '../../helpers/analytics';
import { queryStringToObject } from '../../helpers/functional';
import usePrevious from '../../hooks/use-previous';
import { orderSearchUrl } from '../../helpers/urls';

type Props = {
  classes: any;
};

const PAGE_SIZE = 10;
const INITIAL_PAGE_NUMBER = 1;

const getFilterCount = (filters: OrderFilters | null): number => {
  let filterCount = 0;

  if (filters) {
    if (filters.orderType) {
      filterCount += 1;
    }

    if (Object.keys(filters.timeFilter).length) {
      filterCount += 1;
    }
  }

  return filterCount;
};

const IntersectionObserverWrapper: React.FC<{ itemIndex: number; totalItems: number; onVisible: () => void }> = ({
  itemIndex,
  totalItems,
  children,
  onVisible
}) => {
  if (totalItems % PAGE_SIZE === 0 && itemIndex === totalItems - 2) {
    return (
      <IntersectionObserver
        onVisible={onVisible}
      >
        {children}
      </IntersectionObserver>
    );
  }

  return <>{children}</>;
};

const OrderHistory: React.FC<Props> = ({
  classes
}) => {
  const [filtersDialogVisible, showFiltersDialog, hideFiltersDialog] = useBoolean(false);
  const history = useHistory();
  const [orders, setOrders] = useState<APIOrder[]>([]);

  // initFilters
  const fromQueryString = queryStringToObject(history.location.search.slice(1));
  const initFilters: OrderFilters | null = {
    orderType: '',
    timeFilter: {}
  };
  if (fromQueryString.orderTypeFilter) {
    const [_orderType] = fromQueryString.orderTypeFilter;
    initFilters.orderType = _orderType;
  }
  if (fromQueryString.timePeriodFilter) {
    const [_timePeriodFilter] = fromQueryString.timePeriodFilter;
    initFilters.timeFilter = getTimePeriodFilterParams(_timePeriodFilter);
  }
  const [fetchParams, setFetchParams] = useState<{ pageNumber: number; filters: OrderFilters | null }>({
    pageNumber: INITIAL_PAGE_NUMBER,
    filters: initFilters
  });
  const { filters, pageNumber } = fetchParams;
  const prevPageNumber = usePrevious<number>(pageNumber);
  const anchorEl = useRef(null);
  const [isLoading, markAsLoading, markAsLoadingDone] = useBoolean(true);
  const [isLoadingMore, markAsLoadingMore, markAsLoadingMoreDone] = useBoolean(false);

  const filterCount = getFilterCount(filters);
  const showFiltersAnchor = !!(filterCount || orders.length || filtersDialogVisible);

  useEffect(() => {
    trackPage('Order History Page');
  }, []);

  useEffect(() => {
    document.body.style.overflow = filtersDialogVisible ? 'hidden' : 'scroll';
  }, [filtersDialogVisible]);

  const loadOrders = async () => {
    markAsLoading();
    const ordersData = await getOrderHistory({
      pageNumber,
      pageSize: PAGE_SIZE,
      filters
    });

    setOrders([...ordersData]);
    markAsLoadingDone();
  };

  const loadMoreOrders = async () => {
    markAsLoadingMore();

    const ordersData = await getOrderHistory({
      pageNumber,
      pageSize: PAGE_SIZE,
      filters
    });

    setOrders([...orders, ...ordersData]);
    markAsLoadingMoreDone();
  };

  useEffect(() => {
    if (pageNumber !== prevPageNumber && pageNumber !== INITIAL_PAGE_NUMBER) {
      loadMoreOrders();
    } else {
      loadOrders();
    }
  // TODO: FIXME
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, prevPageNumber]);

  const clearFilters = () => {
    history.replace({ search: '' });
    setFetchParams({
      filters: null,
      pageNumber: INITIAL_PAGE_NUMBER
    });
  };

  return (
    <PageTemplate history={history} subSection={false}>
      <section className={classes.title}>
        <span>My Orders</span>
        {showFiltersAnchor
          ? (
            <div className={classes.orderFilterDiv} onClick={showFiltersDialog} ref={anchorEl}>
              <FilterIcon />
              <span> Filter</span>
              {filterCount ? <span style={{ color: 'red' }}>{`(${filterCount})`}</span> : null}
            </div>
          ) : null}
      </section>
      <OrderFilterDialog
        anchorEl={anchorEl.current}
        onClose={hideFiltersDialog}
        onChange={(updatedFilters: OrderFilters) => {
          setFetchParams({
            pageNumber: INITIAL_PAGE_NUMBER,
            filters: updatedFilters
          });
        }}
        onClear={clearFilters}
        isVisible={filtersDialogVisible}
      />
      <SearchBar
        hintText="search"
        searchWrapperStyle={{
          margin: '0 16px',
          backgroundColor: 'white',
          border: '1px solid white'
        }}
        history={history}
        handleFocus={() => history.push(orderSearchUrl)}
      />
      {
        isLoading
          ? <Loader />
          : (
            <>
              {isLoadingMore ? <Loader /> : null}
              <section style={{ paddingBottom: 16 }} className={classes.orders}>
                {
                  orders.length > 0 ? orders.map((order, index) => (
                    <IntersectionObserverWrapper
                      key={order.orderId}
                      itemIndex={index}
                      totalItems={orders.length}
                      onVisible={() => {
                        setFetchParams({
                          pageNumber: pageNumber + 1,
                          filters
                        });
                      }}
                    >
                      <Order key={order.orderId} index={index} orderData={order} history={history} />
                    </IntersectionObserverWrapper>
                  ))
                    : <NoResult text="No orders" icon={<NoOrder />} />
                }
              </section>
            </>
          )
      }
    </PageTemplate>
  );
};

export default withStyles(style as any)(OrderHistory);
