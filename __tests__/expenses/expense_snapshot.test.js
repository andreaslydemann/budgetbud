import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import thunk from 'redux-thunk';
import ExpenseOverview from "../../src/app/expenses/ExpenseOverview";
import {
    INITIAL_ACCOUNT_STATE,
    INITIAL_ALARM_STATE,
    INITIAL_BUDGET_STATE,
    INITIAL_CATEGORY_STATE,
    INITIAL_DEBT_STATE,
    INITIAL_DISPOSABLE_STATE,
    INITIAL_EXPENSE_STATE
} from "../test_helper/initial_state";

Enzyme.configure({adapter: new Adapter()});

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Expenses', () => {
    it('renders ExpenseOverview as expected', () => {
        const wrapper = shallow(
            <ExpenseOverview/>,
            {
                context: {
                    store: mockStore({
                        expense: INITIAL_EXPENSE_STATE,
                        budget: INITIAL_BUDGET_STATE,
                        debt: INITIAL_DEBT_STATE,
                        disposable: INITIAL_DISPOSABLE_STATE,
                        category: INITIAL_CATEGORY_STATE,
                        alarm: INITIAL_ALARM_STATE,
                        account: INITIAL_ACCOUNT_STATE
                    })
                }
            },
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it('renders ExpenseOverview, filled total expenses, as expected', () => {
        let newExpenseState = INITIAL_EXPENSE_STATE;
        newExpenseState.totalExpenses = 50;
        const wrapper = shallow(
            <ExpenseOverview/>,
            {
                context: {
                    store: mockStore({
                        expense: newExpenseState,
                        budget: INITIAL_BUDGET_STATE,
                        debt: INITIAL_DEBT_STATE,
                        disposable: INITIAL_DISPOSABLE_STATE,
                        category: INITIAL_CATEGORY_STATE,
                        alarm: INITIAL_ALARM_STATE,
                        account: INITIAL_ACCOUNT_STATE
                    })
                }
            },
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });
});
