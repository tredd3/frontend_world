const similarItems = (state = '', action) => {
  switch (action.type) {
    case 'SIMILAR_ITEMS':
      return action.data;
    default:
      return state;
  }
};

export default similarItems;
