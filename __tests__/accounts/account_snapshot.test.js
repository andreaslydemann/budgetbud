import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Accounts from "../../src/app/accounts/Accounts";

Enzyme.configure({adapter: new Adapter()});
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Testing Accounts', () => {
    it('renders initially as expected', () => {
        const state = {
            accounts: [],
            linkedAccounts: [],
            accountsLoading: false,
            linkLoading: false,
            accountsError: '',
            accountsInitialized: false,
        };

        const wrapper = shallow(
            <Accounts/>,
            {context: {store: mockStore({account: state})}},
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });
});
