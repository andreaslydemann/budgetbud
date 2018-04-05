import {combineReducers} from 'redux';
import initial_reducer from './initial_reducer';
import navigation_reducer from './navigation_reducer';
import auth_reducer from './auth_reducer';
import budget_reducer from './budget_reducer';
import category_reducer from './category_reducer';
import debt_reducer from './debt_reducer';
import disposable_reducer from './disposable_reducer';
import account_reducer from './account_reducer';

export default combineReducers({
    init: initial_reducer,
    nav: navigation_reducer,
    auth: auth_reducer,
    budget: budget_reducer,
    category: category_reducer,
    debt: debt_reducer,
    disposable: disposable_reducer,
    account: account_reducer,
});
