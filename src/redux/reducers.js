import {combineReducers} from 'redux';
import initial_reducer from '../app/navigation/initial_reducer';
import navigation_reducer from '../app/navigation/navigation_reducer';
import auth_reducer from '../app/auth/auth_reducer';
import budget_reducer from '../app/budgets/budget_reducer';
import category_reducer from '../app/categories/category_reducer';
import debt_reducer from '../app/debts/debt_reducer';
import disposable_reducer from '../app/disposable/disposable_reducer';
import account_reducer from '../app/accounts/account_reducer';
import expense_reducer from '../app/expenses/expense_reducer';
import alarm_reducer from '../app/alarms/alarm_reducer';

export default combineReducers({
    init: initial_reducer,
    nav: navigation_reducer,
    auth: auth_reducer,
    budget: budget_reducer,
    category: category_reducer,
    debt: debt_reducer,
    disposable: disposable_reducer,
    account: account_reducer,
    expense: expense_reducer,
    alarm: alarm_reducer,
});
