import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import style from './style';
import Order from './Order';
import PageTemplate from '../uiControls/PageTemplate/PageTemplate';
import SearchBar from '../uiControls/SearchBar';
import IntersectionObserver from '../IntersectionObserver';
import { debounce } from '../../helpers/utilities';
import { APIOrder, APIShipmentItem } from '../../types';
import { searchOrders } from '../../services/order';
import Loader from '../uiControls/Loader';
import useBoolean from '../../hooks/use-boolean';
import usePrevious from '../../hooks/use-previous';
// import PaginationWrapper from '../PaginationWrapper';

const MINIMUM_SEARCH_INPUT_LENGTH = 3;
const INITIAL_PAGE_NUMBER = 1;
const PAGE_SIZE = 10;

type Props = {
  classes: any;
};

const OrderSearchPage: React.FC<Props> = ({
  classes
}) => {
  const history = useHistory();
  const [searchText, setSearchText] = useState('');
  const [orders, setOrders] = useState<APIOrder[]>([]);
  const [pageNumber, setPageNumber] = useState(INITIAL_PAGE_NUMBER);
  const [fetchingOrders, setFetchingOrdersTrue, setFetchingOrdersFalse] = useBoolean(false);
  const [isPaginating, markAsPaginating, markPaginationDone] = useBoolean(false);
  const [isInitialState, setIsInitialStateTrue, setIsInitialStateFalse] = useBoolean(true);
  const prevPageNumber = usePrevious<number>(pageNumber);
  const numOrders = orders.length;

  const loadOrders = debounce(async (isPaginatedRequest: boolean) => {
    isPaginatedRequest ? markAsPaginating() : setFetchingOrdersTrue();
    setIsInitialStateFalse();
    try {
      const ordersData = await searchOrders({
        searchText,
        pageNumber,
        pageSize: PAGE_SIZE
      });
      isPaginatedRequest ? setOrders([...orders, ...ordersData]) : setOrders(ordersData);
      isPaginatedRequest ? markPaginationDone() : setFetchingOrdersFalse();
    } catch (err) {
      isPaginatedRequest ? markPaginationDone() : setFetchingOrdersFalse();
    }
  }, 250);

  useEffect(() => {
    if (!searchText) {
      setIsInitialStateTrue();

      if (pageNumber !== INITIAL_PAGE_NUMBER) {
        setPageNumber(INITIAL_PAGE_NUMBER);
      }

      if (numOrders > 0) {
        setOrders([]);
      }

      return;
    }

    if (searchText.length < MINIMUM_SEARCH_INPUT_LENGTH) {
      return;
    }

    loadOrders(prevPageNumber !== pageNumber);
  }, [searchText, pageNumber, loadOrders, numOrders, prevPageNumber, setIsInitialStateTrue]);

  const renderSearchResults = () => {
    if (isInitialState) { return null; }

    const shipmentItems: APIShipmentItem[] = [];

    if (!numOrders) {
      return (
        <div className={classes.noresults}>
          <span>Found no results</span>
          <span>check your spelling and search again</span>
        </div>
      );
    }

    orders.forEach(order => {
      order.shipments.forEach(shipment => {
        shipment.items.forEach(item => {
          shipmentItems.push(item);
        });
      });
    });

    return shipmentItems.map((item, index) => {
      const shouldPaginate = numOrders % PAGE_SIZE === 0 && ((shipmentItems.length - index) < 2);

      if (shouldPaginate) {
        return (
          <IntersectionObserver
            key={index}
            onVisible={() => setPageNumber(pageNumber + 1)}
          >
            <Order itemData={item} history={history} searchVersion />
          </IntersectionObserver>
        );
      }

      return (
        <Order key={index} itemData={item} history={history} searchVersion />
      );
    });
  };

  return (
    <PageTemplate
      history={history}
      subSection={false}
    >
      <div className={classes.title}>My Orders</div>
      <SearchBar
        hintText="What are you looking for ?"
        searchWrapperStyle={{
          margin: '0 16px',
          backgroundColor: 'white',
          border: '1px solid white'
        }}
        handleSearchUpdate={(input: string) => setSearchText(input)}
        disableKeypress
        inputText={searchText}
      />
      <div
        style={{ margin: '10px 16px' }}
      >
        {numOrders > 0 ? `${numOrders} Orders matching "${searchText}"` : null}
      </div>
      {
        fetchingOrders ? <Loader /> : (
          <section className={classes.items}>
            {isPaginating ? <Loader /> : null}
            {renderSearchResults()}
          </section>
        )
      }
    </PageTemplate>
  );
};

export default withStyles(style as any)(OrderSearchPage);
