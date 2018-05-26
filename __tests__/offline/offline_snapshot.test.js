import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Offline from "../../src/app/offline/Offline";

Enzyme.configure({adapter: new Adapter()});

describe('Offline', () => {
    it('renders Offline as expected', () => {
        const wrapper = shallow(
            <Offline/>
        );
        expect(wrapper.dive()).toMatchSnapshot();
    });
});
