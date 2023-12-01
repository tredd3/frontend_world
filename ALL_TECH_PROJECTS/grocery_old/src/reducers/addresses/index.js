import { combineReducers } from 'redux'
import selected from './selected';
import all from './all';

export default combineReducers({
    selected,
    all
})
