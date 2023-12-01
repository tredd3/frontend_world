// We return the previous state in the default case.
// It's important to return the previous state for any unknown action.

const homePageData = (state = null, action) => {
  switch (action.type) {
    case 'HOMEPAGE_DATA':
      return action.data;
    default:
      return state;
  }
};

export default homePageData;
