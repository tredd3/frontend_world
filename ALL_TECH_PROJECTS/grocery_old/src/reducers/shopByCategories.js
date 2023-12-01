//We return the previous state in the default case. 
//It's important to return the previous state for any unknown action.
import { SET_LAT_LNG, SELECT_ADDRESS, CLEAR_DEFAULT, CHANGE_KIRANA } from '../actions/constants';

const shopByCategories = (state = {}, action) => {
    switch (action.type) {
        case 'SHOPBY_CATEGORIES':
            return action.data
        case 'MORE_SHOPBY_CATEGORIES':
            return { ...state, ...action.data }
        case CHANGE_KIRANA:
            return {}
        case SET_LAT_LNG:
            return {}
        case SELECT_ADDRESS:
            return {}
        case CLEAR_DEFAULT:
            return {}
        default:
            return state
    }
}

export default shopByCategories