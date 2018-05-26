import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignIn from '../../src/app/auth/SignIn';
import {INITIAL_AUTH_STATE} from "../test_helper/initial_state";
import SignUp from "../../src/app/auth/SignUp";
import RequestActivationCode from "../../src/app/auth/RequestActivationCode";
import VerifyActivationCode from "../../src/app/auth/VerifyActivationCode";
import ChangeForgottenCode from "../../src/app/auth/ChangeForgottenCode";
import {AuthForm} from "../../src/components/forms/AuthForm";

Enzyme.configure({adapter: new Adapter()});

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Auth', () => {
    it('renders SignIn as expected', () => {
        const wrapper = shallow(
            <SignIn/>,
            {context: {store: mockStore({auth: INITIAL_AUTH_STATE})}},
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it('renders SignUp as expected', () => {
        const wrapper = shallow(
            <SignUp/>,
            {context: {store: mockStore({auth: INITIAL_AUTH_STATE})}},
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it('renders ChangeForgottenCode as expected', () => {
        const wrapper = shallow(
            <ChangeForgottenCode/>,
            {context: {store: mockStore({auth: INITIAL_AUTH_STATE})}},
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it('renders RequestActivationCode as expected', () => {
        const wrapper = shallow(
            <RequestActivationCode/>,
            {context: {store: mockStore({auth: INITIAL_AUTH_STATE})}},
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it('renders VerifyActivationCode as expected', () => {
        const wrapper = shallow(
            <VerifyActivationCode/>,
            {context: {store: mockStore({auth: INITIAL_AUTH_STATE})}},
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it('renders Authform in loading state as expected', () => {
        let newState = INITIAL_AUTH_STATE;
        newState.authLoading = true;
        newState.cprNumber = "abc";
        const wrapper = shallow(
            <AuthForm cprNumber="abc"/>,
            {context: {store: mockStore({auth: newState})}},
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });
});
