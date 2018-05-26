import React from 'react';
import configureStore from 'redux-mock-store';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import EditDisposable from "../../src/app/disposable/EditDisposable";
import DisposablePreview from "../../src/app/disposable/DisposablePreview";
import {INITIAL_BUDGET_STATE, INITIAL_CATEGORY_STATE, INITIAL_DISPOSABLE_STATE} from "../test_helper/initial_state";

Enzyme.configure({adapter: new Adapter()});

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Disposable', () => {
    it('renders EditDisposable as expected', () => {
        const wrapper = shallow(
            <EditDisposable/>,
            {
                context: {
                    store: mockStore({
                        disposable: INITIAL_DISPOSABLE_STATE,
                        budget: INITIAL_BUDGET_STATE,
                        category: INITIAL_CATEGORY_STATE
                    })
                }
            },
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });

    it('renders DisposablePreview as expected', () => {
        const wrapper = shallow(
            <DisposablePreview/>,
            {
                context: {
                    store: mockStore({
                        disposable: INITIAL_DISPOSABLE_STATE,
                        budget: INITIAL_BUDGET_STATE,
                        category: INITIAL_CATEGORY_STATE
                    })
                }
            },
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });
});
