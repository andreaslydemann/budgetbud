import React, {Component} from 'react';
import {StackNavigator, DrawerNavigator} from "react-navigation";
import {Root} from 'native-base';

import SignIn from './app/auth/SignIn';
import SignUp from './app/auth/SignUp';
import SideBar from "./app/navigation/SideBar";
import CreateBudget from "./app/budgets/CreateBudget";
import MyBudget from "./app/budgets/MyBudget";
import ExpenseOverview from "./app/expenses/ExpenseOverview";
import Settings from "./app/settings/Settings";
import UserDetails from "./app/settings/UserDetails";
import Intro from "./app/budgets/Intro";
import EditBudget from "./app/budgets/EditBudget";
import DebtOverview from "./app/debts/DebtOverview";
import CreateDebt from './app/debts/CreateDebt';
import EditDebt from './app/debts/EditDebt';
import DebtPreview from './app/debts/DebtPreview';
import EditDisposable from "./app/disposable/EditDisposable";
import ChangePhoneNumber from "./app/settings/ChangePhoneNumber";
import ChangeCode from "./app/settings/ChangeCode";
import Accounts from "./app/accounts/Accounts";
import Alarms from "./app/alarms/Alarms";
import DisposablePreview from "./app/disposable/DisposablePreview";
import Offline from "./app/offline/Offline";
import RequestActivationCode from "./app/auth/RequestActivationCode";
import VerifyActivationCode from "./app/auth/VerifyActivationCode";
import ChangeForgottenCode from "./app/auth/ChangeForgottenCode";

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
