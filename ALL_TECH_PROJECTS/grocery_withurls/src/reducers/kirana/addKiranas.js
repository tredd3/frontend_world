
const addKiranas = (all = [], action) => {
  switch (action.type) {
    case 'ADD_KIRANAS':
      return [...action.kiranas];
    default:
      return all;
  }
};

export default addKiranas;
