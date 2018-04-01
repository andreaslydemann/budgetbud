import * as Expo from 'expo';
import React, {Component} from 'react';
import firebase from 'firebase';
import firebaseConfig from "../config/firebase_config";
import {StyleProvider} from 'native-base';
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";
import {connect} from 'react-redux';
import App from "../App";
import {getBudgetID} from "../actions/budget_actions";

class Setup extends Component {
    state = {isReady: false, isAuthorized: false};

    async componentWillMount() {
        this.loadFonts();
    }

    componentDidMount() {
        firebase.initializeApp(firebaseConfig);

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({isReady: true, isAuthorized: true});
                this.getBudgetID(user);
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

    getBudgetID(user) {
        this.props.getBudgetID(user);
    }

    render() {
        console.log("Ready? " + this.props.isBudgetReady);
        if (!this.state.isReady || !this.props.isBudgetReady)
            return <Expo.AppLoading/>;

        return (
            <StyleProvider style={getTheme(variables)}>
                <App isAuthorized={this.state.isAuthorized}/>
            </StyleProvider>
        );
    }
}

const mapStateToProps = ({budget}) => {
    return {budgetID, isBudgetReady} = budget;
};

const mapDispatchToProps = {
    getBudgetID
};

export default connect(mapStateToProps, mapDispatchToProps)(Setup);
