import * as Expo from 'expo';
import React, {Component} from 'react';
import {StyleProvider} from 'native-base';
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";
import App from "../App";

class Setup extends Component {
    state = {isReady: false};

    componentWillMount() {
        this.loadFonts();
    }

    async loadFonts() {
        await Expo.Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            'Ionicons': require('native-base/Fonts/Ionicons.ttf')
        });

        this.setState({isReady: true});
    }

    render() {
        if (!this.state.isReady)
            return <Expo.AppLoading/>;

        return (
            <StyleProvider style={getTheme(variables)}>
                <App/>
            </StyleProvider>
        );
    }
}

export default Setup;
