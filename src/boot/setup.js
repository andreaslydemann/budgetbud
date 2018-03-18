import * as Expo from 'expo';
import React, {Component} from 'react';
import {StyleProvider} from 'native-base';
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";
import App from "../App";
import {AsyncStorage} from "react-native";

class Setup extends Component {
    state = {isReady: false, signedIn: false};

    componentWillMount() {
        this.loadInitialFiles();
    }

    async loadInitialFiles() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            'Ionicons': require('native-base/Fonts/Ionicons.ttf')
        });

        let token = await AsyncStorage.getItem('jwt');

        if (token)
            this.setState({signedIn: true});
        else
            this.setState({signedIn: false});

        this.setState({isReady: true});
    }

    render() {
        if (!this.state.isReady)
            return <Expo.AppLoading/>;

        return (
            <StyleProvider style={getTheme(variables)}>
                <App signedIn={this.state.signedIn}/>
            </StyleProvider>
        );
    }
}

export default Setup;
