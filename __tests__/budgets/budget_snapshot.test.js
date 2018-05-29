import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateBudget from "../../src/app/budgets/CreateBudget";
import EditBudget from "../../src/app/budgets/EditBudget";
import MyBudget from "../../src/app/budgets/MyBudget";
import thunk from 'redux-thunk';
import {
    INITIAL_ACCOUNT_STATE,
    INITIAL_BUDGET_STATE,
    INITIAL_CATEGORY_STATE,
    INITIAL_DEBT_STATE,
    INITIAL_DISPOSABLE_STATE
} from '../test_helper/initial_state'
import {BudgetForm} from "../../src/components/forms/BudgetForm";
import Intro from "../../src/app/budgets/Intro";

Enzyme.configure({adapter: new Adapter()});

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Budget', () => {
    it('renders CreateBudget as expected', () => {
        const wrapper = shallow(
            <CreateBudget/>,
            {
                context: {
                    store: mockStore({
                        budget: INITIAL_BUDGET_STATE,
                        disposable: INITIAL_DISPOSABLE_STATE,
                        account: INITIAL_ACCOUNT_STATE,
                        category: INITIAL_CATEGORY_STATE
                    })
                }
            },
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it('renders EditBudget as expected', () => {
        const wrapper = shallow(
            <EditBudget/>,
            {
                context: {
                    store: mockStore({
                        budget: INITIAL_BUDGET_STATE,
                        disposable: INITIAL_DISPOSABLE_STATE,
                        account: INITIAL_ACCOUNT_STATE,
                        category: INITIAL_CATEGORY_STATE
                    })
                }
            },
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it('renders MyBudget as expected', () => {
        const wrapper = shallow(
            <MyBudget/>,
            {
                context: {
                    store: mockStore({
                        budget: INITIAL_BUDGET_STATE,
                        category: INITIAL_CATEGORY_STATE,
                        debt: INITIAL_DEBT_STATE,
                        disposable: INITIAL_DISPOSABLE_STATE
                    })
                }
            },
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it('renders Intro as expected', () => {
        const wrapper = shallow(
            <Intro/>,
            {
                context: {
                    store: mockStore({
                        budget: INITIAL_BUDGET_STATE,
                        category: INITIAL_CATEGORY_STATE,
                        debt: INITIAL_DEBT_STATE,
                        disposable: INITIAL_DISPOSABLE_STATE,
                        account: INITIAL_ACCOUNT_STATE
                    })
                }
            },
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it('renders Budgetform in loading state as expected', () => {
        const wrapper = shallow(
            <BudgetForm tmpTotalGoalsAmount={12} categoriesLoading={true}/>
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });
});