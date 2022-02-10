import { combineReducers } from 'redux';
import contactsReducer from './contactsReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    contactsReducer,
    authReducer,
});

export default rootReducer;
