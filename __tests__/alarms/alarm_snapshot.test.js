import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignIn from '../../src/app/auth/SignIn';
import Alarms from "../../src/app/alarms/Alarms";

Enzyme.configure({adapter: new Adapter()});

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Testing Accounts', () => {
    it('renders initially as expected', () => {
        const state = {
            categoryAlarms: [],
            budgetExceeded: false,
            weeklyStatus: false,
            alarmsLoading: false,
            toggleLoading: false,
            alarmsError: '',
            budgetAlarmsInitialized: false,
            categoryAlarmsInitialized: false
        };

        const wrapper = shallow(
            <Alarms/>,
            {context: {store: mockStore({alarm: state})}},
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });
});
