import * as Expo from 'expo';
import React, {Component} from 'react';
import firebase from 'firebase';
import firebaseConfig from "../config/firebase_config";
import {StyleProvider} from 'native-base';
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";
import App from "../App";

class Setup extends Component {
    state = {isReady: false, isAuthorized: false};

    componentWillMount() {
        this.loadFonts();
    }

    componentDidMount() {
        firebase.initializeApp(firebaseConfig);

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({isReady: true, isAuthorized: true});
            } else {
                this.setState({isReady: true, isAuthorized: false});
            }
        });
    }

    loadFonts() {
        Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            'Ionicons': require('native-base/Fonts/Ionicons.ttf')
        });
    }

    render() {
        if (!this.state.isReady)
            return <Expo.AppLoading/>;

        return (
            <StyleProvider style={getTheme(variables)}>
                <App isAuthorized={this.state.isAuthorized}/>
            </StyleProvider>
        );
    }
}

export default Setup;
