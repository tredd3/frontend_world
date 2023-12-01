import { combineReducers } from 'redux';
import changeKirana from './changeKirana';
import addKiranas from './addKiranas';
import invites from './invites';

const nextPage = (state = 0, action) => {
  switch (action.type) {
    case 'STORE_NEXT_PAGE':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  selectedKirana: changeKirana,
  all: addKiranas,
  invites,
  nextPage
});
