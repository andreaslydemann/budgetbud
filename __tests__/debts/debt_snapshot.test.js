import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CreateDebt from "../../src/app/debts/CreateDebt";
import {INITIAL_BUDGET_STATE, INITIAL_CATEGORY_STATE, INITIAL_DEBT_STATE} from "../test_helper/initial_state";
import thunk from 'redux-thunk';
import EditDebt from "../../src/app/debts/EditDebt";
import DebtOverview from "../../src/app/debts/DebtOverview";
import DebtPreview from "../../src/app/debts/DebtPreview";
import {DebtForm} from "../../src/components/forms/DebtForm";

Enzyme.configure({adapter: new Adapter()});

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Debt', () => {
    it('renders CreateDebt as expected', () => {
        const wrapper = shallow(
            <CreateDebt/>,
            {
                context: {
                    store: mockStore({
                        debt: INITIAL_DEBT_STATE,
                        category: INITIAL_CATEGORY_STATE,
                        budget: INITIAL_BUDGET_STATE
                    })
                }
            },
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it('renders EditDebt as expected', () => {
        const wrapper = shallow(
            <EditDebt/>,
            {
                context: {
                    store: mockStore({
                        debt: INITIAL_DEBT_STATE,
                        category: INITIAL_CATEGORY_STATE,
                        budget: INITIAL_BUDGET_STATE
                    })
                }
            },
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it('renders DebtOverview as expected', () => {
        const wrapper = shallow(
            <DebtOverview/>,
            {
                context: {
                    store: mockStore({
                        debt: INITIAL_DEBT_STATE,
                        category: INITIAL_CATEGORY_STATE,
                        budget: INITIAL_BUDGET_STATE
                    })
                }
            },
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it('renders DebtPreview as expected', () => {
        const wrapper = shallow(
            <DebtPreview/>,
            {
                context: {
                    store: mockStore({
                        debt: INITIAL_DEBT_STATE,
                        category: INITIAL_CATEGORY_STATE,
                        budget: INITIAL_BUDGET_STATE
                    })
                }
            },
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it('renders DebtForm in loading state as expected', () => {
        const wrapper = shallow(
            <DebtForm debtLoading={true}/>
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });
});