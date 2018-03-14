import {combineReducers} from 'redux';
import auth_reducer from './auth_reducer';
import budget_reducer from './budget_reducer';
import debt_reducer from './debt_reducer';

export default combineReducers({
    auth: auth_reducer,
    budget: budget_reducer,
    debt: debt_reducer
});
