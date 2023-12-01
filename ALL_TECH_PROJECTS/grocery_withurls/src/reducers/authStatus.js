export default (state = '', action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return 'SUCCESS';
    default:
      return state;
  }
};
