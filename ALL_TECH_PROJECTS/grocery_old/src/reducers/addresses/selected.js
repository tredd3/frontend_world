import { SELECT_ADDRESS } from '../../actions/constants';

const selectAddress = (state = {}, action) => {
  switch (action.type) {
    case SELECT_ADDRESS:
      return action.payload;
    default:
      return state;
  }
};

export default selectAddress;
