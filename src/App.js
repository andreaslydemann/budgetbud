import React, {Component} from 'react';
import {StackNavigator, DrawerNavigator} from "react-navigation";
import {Root} from 'native-base';

import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import SideBar from "./screens/SideBar";
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
import Accounts from "./screens/Accounts";
import DisposablePreview from "./screens/DisposablePreview";

export default class App extends Component {
    render() {
        const MyBudgetStack = StackNavigator(
            {
                CreateBudget: {screen: CreateBudget},
                MyBudget: {screen: MyBudget},
                EditDisposable: {screen: EditDisposable},
                DisposablePreview: {screen: DisposablePreview},
                EditBudget: {screen: EditBudget},
                Intro: {screen: Intro},
                BudgetPreview: {screen: BudgetPreview},
                DebtOverview: {screen: DebtOverview},
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
                UserDetails: {screen: UserDetails}
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
            <Root>
                <AppNavigator/>
            </Root>
        );
    }
}

Expo.registerRootComponent(App);
