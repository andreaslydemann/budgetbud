import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Accounts from "../../src/app/accounts/Accounts";
import thunk from 'redux-thunk';
import {INITIAL_ACCOUNT_STATE} from "../test_helper/initial_state";

Enzyme.configure({adapter: new Adapter()});
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing Accounts', () => {
    it('renders initially as expected', () => {
        const wrapper = shallow(
            <Accounts/>,
            {context: {store: mockStore({account: INITIAL_ACCOUNT_STATE})}},
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it('renders enters loading state', () => {
        let loadingState = INITIAL_ACCOUNT_STATE;
        loadingState.linkLoading = true;
        const wrapper = shallow(
            <Accounts/>,
            {context: {store: mockStore({account: loadingState})}},
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });

});
