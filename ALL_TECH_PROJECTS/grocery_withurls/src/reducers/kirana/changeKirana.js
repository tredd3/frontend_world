// const selected = JSON.parse(localStorage.getItem('preferedStore')) || {};

const changeKirana = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_KIRANA':
      return action.kirana;
    default:
      return state;
  }
};

export default changeKirana;
