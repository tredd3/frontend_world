
const invites = (all = [], action) => {
  // console.log("kiranas before ? ",all)
  switch (action.type) {
    case 'ADD_INVITES':
      return [...action.invites];
    default:
      return all;
  }
};

export default invites;
