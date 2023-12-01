import { SET_SORT_FILTERS, SET_FILTER_OPTIONS, SET_ORDER_FILTERS } from './constants';

// Product Listing Page
export const setSortFilters = data => ({
  type: SET_SORT_FILTERS,
  data
});

export const setFilterOptions = options => ({
  type: SET_FILTER_OPTIONS,
  data: options
});

// Order Listing Page

export const setOrderListFilters = data => ({
  type: SET_ORDER_FILTERS,
  data
});
