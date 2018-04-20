import {Font, AppLoading} from 'expo';
import React, {Component} from 'react';
import firebase from 'firebase';
import firebaseConfig from "../config/firebase_config";
import {StyleProvider} from 'native-base';
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";
import {connect} from 'react-redux';
import {getBudgetID} from "../actions/";
import * as conn from '../helpers/connectivity';
import App from "../App";

class Setup extends Component {
    state = {isReady: false, isAuthorized: false, isOffline: false};

    componentWillMount() {
        this.loadFonts();
    }

    componentWillUnmount() {
        conn.removeConnectionChangeEventListener(this.handleConnectivityChange);
    }

    componentDidMount() {
        conn.addConnectionChangeEventListener(this.handleConnectivityChange);
        firebase.initializeApp(firebaseConfig);

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.getBudgetID(user, () => {
                    this.setState({...this.state, isReady: true, isAuthorized: true});
                });
            } else {
                this.setState({...this.state, isReady: true, isAuthorized: false});
            }
        });
    }

    handleConnectivityChange = (connectionInfo) => {
        if (connectionInfo.type === 'none') {
            this.setState({...this.state, isReady: true, isOffline: true});
            conn.removeConnectionChangeEventListener(this.handleConnectivityChange);
        }
    };

    loadFonts() {
        Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            'Ionicons': require('native-base/Fonts/Ionicons.ttf')
        });
    }

    render() {
        if (!this.state.isReady)
            return <AppLoading/>;

        return (
            <StyleProvider style={getTheme(variables)}>
                <App isOffline={this.state.isOffline}
                     isAuthorized={this.state.isAuthorized}
                     initialBudgetRoute={this.props.initialBudgetRoute}/>
            </StyleProvider>
        );
    }
}

const mapDispatchToProps = {
    getBudgetID
};

export default connect(null, mapDispatchToProps)(Setup);
