import { SET_SORT_FILTERS, SET_FILTER_OPTIONS, SET_ORDER_FILTERS } from '../actions/constants';

const initialState = {
  l2CategoryId: '',
  selectedCategories: [], // L3 categories
  selectedBrands: [],
  selectedSortBy: [],
  filterOptions: [],
  // used in orders page
  timeFilter: '',
  orderTypeFilter: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SORT_FILTERS: {
      return { ...state, ...action.data };
    }

    case SET_FILTER_OPTIONS: {
      return { ...state, filterOptions: action.data };
    }

    case SET_ORDER_FILTERS: {
      return { ...state, ...action.data };
    }

    default: return state;
  }
};
