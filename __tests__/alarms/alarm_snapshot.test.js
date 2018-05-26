import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Alarms from "../../src/app/alarms/Alarms";
import {INITIAL_ALARM_STATE, INITIAL_BUDGET_STATE} from "../test_helper/initial_state";

Enzyme.configure({adapter: new Adapter()});

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Alarms', () => {
    it('renders initially as expected', () => {
        const wrapper = shallow(
            <Alarms/>,
            {context: {store: mockStore({
                alarm: INITIAL_ALARM_STATE,
                budget: INITIAL_BUDGET_STATE
            })}},
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it('renders budgetExceeded = true as expected', () => {
        let newState = INITIAL_ALARM_STATE;
        newState.budgetExceeded = true;
        const wrapper = shallow(
            <Alarms/>,
            {context: {store: mockStore({
                alarm: INITIAL_ALARM_STATE,
                budget: INITIAL_BUDGET_STATE
            })}},
            );
        expect(wrapper.dive()).toMatchSnapshot();
    });
});
