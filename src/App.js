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
import Offline from "./screens/Offline";
import {connect} from "react-redux";

class App extends Component {
    render() {
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
                EditDisposable: {screen: EditDisposable},
                DisposablePreview: {screen: DisposablePreview},
                EditBudget: {screen: EditBudget},
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
                SignIn: {screen: SignIn},
                SignUp: {screen: SignUp},
                Offline: {screen: Offline},
            },
            {
                initialRouteName:
                    (this.props.isOffline ? 'Offline' :
                        (this.props.isAuthorized ? 'Drawer' : 'SignIn')),
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
