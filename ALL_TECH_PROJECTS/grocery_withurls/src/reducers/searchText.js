export const SEARCH_TEXT_ACTION = 'SEARCH_TEXT_ACTION';
const searchText = (state = '', action) => {
  switch (action.type) {
    case SEARCH_TEXT_ACTION:
      return action.data;
    default:
      return state;
  }
};

export default searchText;
