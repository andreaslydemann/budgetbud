import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignIn from '../../src/app/auth/SignIn';


Enzyme.configure({adapter: new Adapter()});

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Integrationtest - Testing SignIn', () => {
    it('renders as expected', async () => {
        const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));
        const state = {
            cprNumber: '1234567890',
            code: '1234',
            error: '',
            budgetLoading: false
        };

        const wrapper = shallow(
            <SignIn/>,
            {context: {store: mockStore({auth: state})}},
        );
        expect(wrapper.dive()).toMatchSnapshot();

        const submitButton = wrapper.findWhere(n => n.prop("id") === "submitButton");
        submitButton.simulate('click');

        // const signInWithCustomToken = jest.fn();
        // jest.spyOn(firebase, 'auth').mockImplementation(() => {
        //     return {
        //         signInWithCustomToken
        //     }
        // })
        //
        // const testToken = '1234';
        //
        // const store = mockStore({});
        // const expectedAction = [
        //     {type: SIGN_IN}
        // ];
        // const resp = {data: {token: testToken}};
        // axios.post.mockResolvedValue(resp);
        //
        // return flushAllPromises().then(() => {
        //     expect(store.getActions()).toEqual(expectedAction)
        //     expect(firebase.auth).toHaveBeenCalledTimes(1);
        //     expect(signInWithCustomToken).toHaveBeenCalledWith(testToken);
        // });
    });
});
