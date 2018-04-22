import React, {Component} from 'react';
import {Provider} from 'react-redux';
import Setup from './src/boot/setup';
import store from './src/redux/index';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Setup/>
            </Provider>
        );
    }
}

export default App;
