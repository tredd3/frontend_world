import { combineReducers } from 'redux'
import changeKirana from './changeKirana';
import addKiranas from './addKiranas'
import invites from './invites.js'

export default combineReducers({
    selectedKirana : changeKirana,
    all: addKiranas,
    invites: invites
})
