import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignIn from '../../src/app/auth/SignIn';

Enzyme.configure({adapter: new Adapter()});

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing SignIn', () => {
    it('renders as expected', () => {
        const state = {
            cprNumber: '',
            code: '',
            error: '',
            budgetLoading: false
        };

        const wrapper = shallow(
            <SignIn/>,
            {context: {store: mockStore({auth: state})}},
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });
});

describe('Testing SignInClick', () => {
    it('renders and clicks as expected', () => {
        const state = {
            cprNumber: '',
            code: '',
            error: '',
            budgetLoading: false
        };

        const component = mount(
            <SignIn/>,
            {context: {store: mockStore({auth: state})}},
        );
        // const component = mount(<SignIn/>)
        const button = component.find('Button');
        console.log(button);
        expect(component.state()).toMatchSnapshot();
    });
});
