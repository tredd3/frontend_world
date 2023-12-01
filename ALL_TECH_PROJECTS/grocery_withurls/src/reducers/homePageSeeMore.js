// We return the previous state in the default case.
// It's important to return the previous state for any unknown action.

const homePageSeeMore = (state = {}, action) => {
  switch (action.type) {
    case 'HOMEPAGE_SEEMORE':
      if (action.pagination) {
        return { ...state, Data: { products: [...state.Data.products, ...action.data.Data.products] } };
      }
      return action.data;

    default:
      return state;
  }
};

export default homePageSeeMore;
