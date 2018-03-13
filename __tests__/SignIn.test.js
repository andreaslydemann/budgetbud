import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignIn from '../src/screens/SignIn';

Enzyme.configure({adapter: new Adapter()});

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing SignIn', () => {
    it('renders as expected', () => {
        const state = {
            cprNumber: '',
            code: '',
            error: '',
            loading: false
        };

        const wrapper = shallow(
            <SignIn/>,
            {context: {store: mockStore({auth: state})}},
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });
});
