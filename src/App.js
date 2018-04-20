import React, {Component} from 'react';
import {StackNavigator, DrawerNavigator} from "react-navigation";
import {Root} from 'native-base';

import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import SideBar from "./screens/SideBar";
import CreateBudget from "./screens/CreateBudget";
import MyBudget from "./screens/MyBudget";
import ExpenseOverview from "./screens/ExpenseOverview";
import Settings from "./screens/Settings";
import UserDetails from "./screens/UserDetails";
import Intro from "./screens/Intro";
import EditBudget from "./screens/EditBudget";
import DebtOverview from "./screens/DebtOverview";
import CreateDebt from './screens/CreateDebt';
import EditDebt from './screens/EditDebt';
import DebtPreview from './screens/DebtPreview';
import EditDisposable from "./screens/EditDisposable";
import ChangePhoneNumber from "./screens/ChangePhoneNumber";
import ChangeCode from "./screens/ChangeCode";
import Accounts from "./screens/Accounts";
import Alarms from "./screens/Alarms";
import DisposablePreview from "./screens/DisposablePreview";
import Offline from "./screens/Offline";
import RequestActivationCode from "./screens/RequestActivationCode";
import VerifyActivationCode from "./screens/VerifyActivationCode";
import ChangeForgottenCode from "./screens/ChangeForgottenCode";

import {connect} from "react-redux";

class App extends Component {
    render() {
        const AuthStack = StackNavigator(
            {
                SignIn: {screen: SignIn},
                SignUp: {screen: SignUp},
                RequestActivationCode: {screen: RequestActivationCode},
                VerifyActivationCode: {screen: VerifyActivationCode},
                ChangeForgottenCode: {screen: ChangeForgottenCode},
            },
            {
                navigationOptions: {gesturesEnabled: false},
                headerMode: "none"
            }
        );

        const IntroStack = StackNavigator(
            {
                Intro: {screen: Intro},
                CreateBudget: {screen: CreateBudget},
                Accounts: {screen: Accounts}
            },
            {
                navigationOptions: {gesturesEnabled: false},
                headerMode: "none"
            }
        );

        const BudgetStack = StackNavigator(
            {
                MyBudget: {screen: MyBudget},
                CreateBudget: {screen: CreateBudget},
                EditBudget: {screen: EditBudget},
                EditDisposable: {screen: EditDisposable},
                DebtOverview: {screen: DebtOverview},
                DisposablePreview: {screen: DisposablePreview},
                CreateDebt: {screen: CreateDebt},
                EditDebt: {screen: EditDebt},
                DebtPreview: {screen: DebtPreview}
            },
            {
                navigationOptions: {gesturesEnabled: false},
                headerMode: "none"
            }
        );

        const SettingsStack = StackNavigator(
            {
                Settings: {screen: Settings},
                Accounts: {screen: Accounts},
                Alarms: {screen: Alarms},
                UserDetails: {screen: UserDetails},
                ChangePhoneNumber: {screen: ChangePhoneNumber},
                ChangeCode: {screen: ChangeCode}
            },
            {
                navigationOptions: {gesturesEnabled: false},
                headerMode: "none"
            }
        );

        const Drawer = DrawerNavigator(
            {
                IntroStack: {screen: IntroStack},
                BudgetStack: {screen: BudgetStack},
                ExpenseOverview: {screen: ExpenseOverview},
                Settings: {screen: SettingsStack}
            },
            {
                initialRouteName: this.props.initialRoute,
                contentComponent: props => <SideBar {...props} />,
                contentOptions: {activeTintColor: "#e91e63"},
                navigationOptions: {drawerLockMode: 'locked-closed'}
            }
        );

        const AppNavigator = StackNavigator(
            {
                Drawer: {screen: Drawer},
                AuthStack: {screen: AuthStack},
                Offline: {screen: Offline},
            },
            {
                initialRouteName:
                    (this.props.isOffline ? 'Offline' :
                        (this.props.isAuthorized ? 'Drawer' : 'AuthStack')),
                navigationOptions: {gesturesEnabled: false},
                headerMode: "none"
            }
        );

        return (
            <Root>
                <AppNavigator/>
            </Root>
        );
    }
}

const mapStateToProps = ({init}) => {
    return {initialRoute} = init;
};

export default connect(mapStateToProps, null)(App);

Expo.registerRootComponent(App);
