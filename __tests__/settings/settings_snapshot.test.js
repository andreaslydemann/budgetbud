import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ChangeCode from "../../src/app/settings/ChangeCode";
import ChangePhoneNumber from "../../src/app/settings/ChangePhoneNumber";
import Settings from "../../src/app/settings/Settings";
import UserDetails from "../../src/app/settings/UserDetails";
import thunk from 'redux-thunk';
import {
    INITIAL_ACCOUNT_STATE,
    INITIAL_ALARM_STATE,
    INITIAL_AUTH_STATE,
    INITIAL_BUDGET_STATE
} from "../test_helper/initial_state";

Enzyme.configure({adapter: new Adapter()});

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Settings', () => {
    it('renders ChangeCode as expected', () => {
        const wrapper = shallow(
            <ChangeCode/>,
            {context: {store: mockStore({auth: INITIAL_AUTH_STATE})}},
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it('renders ChangeCode as expected', () => {
        const wrapper = shallow(
            <ChangePhoneNumber/>,
            {context: {store: mockStore({auth: INITIAL_AUTH_STATE})}},
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it('renders Settings as expected', () => {
        const wrapper = shallow(
            <Settings/>,
            {
                context: {
                    store: mockStore({
                        account: INITIAL_ACCOUNT_STATE,
                        alarm: INITIAL_ALARM_STATE,
                        budget: INITIAL_BUDGET_STATE
                    })
                }
            },
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it('renders UserDetails as expected', () => {
        const wrapper = shallow(
            <UserDetails/>,
            {context: {store: mockStore({auth: INITIAL_AUTH_STATE})}},
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });
});