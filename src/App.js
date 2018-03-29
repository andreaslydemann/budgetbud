import React, {Component} from 'react';
import {StackNavigator, DrawerNavigator} from "react-navigation";
import {Root} from 'native-base';
import {Provider} from 'react-redux';

import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import SideBar from "./screens/SideBar";
import store from './store';
import CreateBudget from "./screens/CreateBudget";
import MyBudget from "./screens/MyBudget";
import SpendingOverview from "./screens/SpendingOverview";
import MonthlyReports from "./screens/MonthlyReports";
import Settings from "./screens/Settings";
import BudgetPreview from "./screens/BudgetPreview"
import UserDetails from "./screens/UserDetails";
import Intro from "./screens/Intro";
import EditBudget from "./screens/EditBudget";
import DebtOverview from "./screens/DebtOverview";
import CreateDebt from './screens/CreateDebt';
import EditDebt from './screens/EditDebt';
import DebtPreview from './screens/DebtPreview';
import EditDisposable from "./screens/EditDisposable";
import CreateAccount from "./screens/CreateAccount";

export default class App extends Component {
    render() {
        const MyBudgetStack = StackNavigator(
            {
                MyBudget: {screen: MyBudget},
                CreateBudget: {screen: CreateBudget},
                Intro: {screen: Intro},
                EditBudget: {screen: EditBudget},
                BudgetPreview: {screen: BudgetPreview},
                EditDisposable: {screen: EditDisposable},
                DebtOverview: {screen: DebtOverview},
                CreateDebt: {screen: CreateDebt},
                EditDebt: {screen: EditDebt},
                DebtPreview: {screen: DebtPreview}
            },
            {
                initialRouteName: "DebtOverview",
                navigationOptions: {gesturesEnabled: false},
                headerMode: "none"
            }
        );

        const SettingsStack = StackNavigator(
            {
                Settings: {screen: Settings},
                UserDetails: {screen: UserDetails},
                CreateAccount: {screen: CreateAccount}
            },
            {
                navigationOptions: {gesturesEnabled: false},
                headerMode: "none"
            }
        );

        const Drawer = DrawerNavigator(
            {
                BudgetStack: {screen: MyBudgetStack},
                SpendingOverview: {screen: SpendingOverview},
                MonthlyReports: {screen: MonthlyReports},
                Settings: {screen: SettingsStack}
            },
            {
                initialRouteName: "BudgetStack",
                contentComponent: props => <SideBar {...props} />,
                contentOptions: {activeTintColor: "#e91e63"},
                navigationOptions: {drawerLockMode: 'locked-closed'}
            }
        );

        const AppNavigator = StackNavigator(
            {
                Drawer: {screen: Drawer},
                SignIn: {screen: SignIn},
                SignUp: {screen: SignUp},
            },
            {
                navigationOptions: {gesturesEnabled: false},
                initialRouteName: this.props.isAuthorized ? 'Drawer' : 'SignIn',
                headerMode: "none"
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
