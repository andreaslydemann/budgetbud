import React, {Component} from 'react';
import {StackNavigator, DrawerNavigator} from "react-navigation";
import {Root} from 'native-base';
import {Provider} from 'react-redux';
import firebase from 'firebase';
import firebaseConfig from './config/firebase_config';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import SideBar from "./screens/SideBar";
import store from './store';
import {AsyncStorage} from "react-native";

export default class App extends Component {
    state = {signedIn: false};

    async componentWillMount() {
        // await AsyncStorage.removeItem('sign_in_token');
        let token = await AsyncStorage.getItem('sign_in_token');

        if (token)
            this.setState({signedIn: true});
        else
            this.setState({signedIn: false});
    };

    componentDidMount() {
        firebase.initializeApp(firebaseConfig);
    };

    render() {
        const Drawer = DrawerNavigator(
            {
                SignIn: {screen: SignIn}
            },
            {
                initialRouteName: "SignIn",
                contentOptions: {
                    activeTintColor: "#e91e63"
                },
                lazy: "true",
                contentComponent:
                    props => <SideBar {...props} />
            }
        );

        const AppNavigator = StackNavigator(
            {
                Drawer: {screen: Drawer},
                SignIn: {screen: SignIn},
                SignUp: {screen: SignUp},
            },
            {
                navigationOptions: {
                    gesturesEnabled: false
                },
                initialRouteName: this.state.signedIn ? 'Drawer' : 'SignIn',
                headerMode: "none",
                lazy: "true"
            }
        );

        return (
            <Provider store={store}>
                <Root>
                    <AppNavigator/>
                </Root>
            </Provider>
        );
    }
}

Expo.registerRootComponent(App);
