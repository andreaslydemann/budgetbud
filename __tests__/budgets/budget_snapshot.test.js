import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateBudget from "../../src/app/budgets/CreateBudget";
import EditBudget from "../../src/app/budgets/EditBudget";
import MyBudget from "../../src/app/budgets/MyBudget";
import thunk from 'redux-thunk';

Enzyme.configure({adapter: new Adapter()});

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Budget', () => {
    const budgetState = {
        budgetID: '',
        income: 0,
        budgetError: '',
        budgetIDError: '',
        budgetLoading: false,
        budgetInitialized: false
    };

    const categoriesState = {
        categories: [],
        categoriesOfDebt: [],
        selectedCategories: [],
        categorySubtractions: [],
        categoriesLoading: false,
        subtractionsLoading: false,
        categoriesError: '',
        totalGoalsAmount: 0,
        categoriesInitialized: false
    };

    const disposableState = {
        disposable: 0,
        disposableLoading: false,
        disposableError: '',
        disposableCalculationLoading: false,
        disposableCategorySubtractions: []
    };

    const accountState = {
        accounts: [],
        linkedAccounts: [],
        accountsLoading: false,
        linkLoading: false,
        accountsError: '',
        accountsInitialized: false,
    };

    const debtState = {
        name: '',
        totalAmount: '',
        amountPerMonth: '',
        expirationDate: '',
        debts: [],
        selectedDebt: '',
        categorySubtractions: [],
        debtLoading: false,
        debtError: '',
        debtsInitialized: false
    };

    it('renders CreateBudget as expected', () => {
        const wrapper = shallow(
            <CreateBudget/>,
            {
                context: {
                    store: mockStore({
                        budget: budgetState,
                        disposable: disposableState,
                        account: accountState,
                        category: categoriesState
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
                        budget: budgetState,
                        disposable: disposableState,
                        account: accountState,
                        category: categoriesState
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
                        budget: budgetState,
                        category: categoriesState,
                        debt: debtState,
                        disposable: disposableState
                    })
                }
            },
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it('renders Intro as expected', () => {
        const wrapper = shallow(
            <MyBudget/>,
            {
                context: {
                    store: mockStore({
                        budget: budgetState,
                        category: categoriesState,
                        debt: debtState,
                        disposable: disposableState
                    })
                }
            },
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });
});