import React, {Component} from 'react';
import {StackNavigator} from "react-navigation";
import {Provider} from 'react-redux';
import firebase from 'firebase';
import firebaseConfig from './config/firebase_config';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import store from './store';

export default class App extends Component {
    componentDidMount() {
        firebase.initializeApp(firebaseConfig);
    };

    render() {
        const AppNavigator = StackNavigator(
            {
                SignIn: {screen: SignIn},
                SignUp: {screen: SignUp},
            },
            {
                initialRouteName: "SignIn",
                headerMode: "none"
            }
        );

        return (
            <Provider store={store}>
                <AppNavigator/>
            </Provider>
        );
    }
}

Expo.registerRootComponent(App);
