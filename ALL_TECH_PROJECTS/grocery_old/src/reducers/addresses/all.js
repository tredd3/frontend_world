import {SET_LAT_LNG, ADD_ADDRESS, REMOVE_ADDRESS, UPDATE_ADDRESS_LIST} from '../../actions/constants';

const allAddresses = (state = [], action) => {
    switch (action.type) {
    //   case ADD_ADDRESS:
    //     return action.payload;
    //   case REMOVE_ADDRESS:
    //     return action.payload;
      default:
        return state;
    }
  };
  
  export default allAddresses;
  