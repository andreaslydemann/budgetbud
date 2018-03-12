import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignIn from '../src/screens/SignIn';

Enzyme.configure({adapter: new Adapter()});

const middlewares = [];
const mockStore = configureStore(middlewares);

const initialState = {
    auth: {
        cprNumber: '',
        code: '',
        error: '',
        loading: false
    }
};

describe('Testing SignIn', () => {
    it('renders as expected', () => {
        const wrapper = shallow(
            <SignIn/>,
            {context: {store: mockStore(initialState)}},
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });
});
