import React, {Component} from 'react';
import {StackNavigator, DrawerNavigator} from "react-navigation";
import {Root} from 'native-base';
import {Provider} from 'react-redux';
import firebase from 'firebase';
import firebaseConfig from './config/firebase_config';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import SideBar from "./screens/SideBar";
import store from './store';
import CreateBudget from "./screens/CreateBudget";
import MyBudget from "./screens/MyBudget";
import SpendingOverview from "./screens/SpendingOverview";
import MonthlyReports from "./screens/MonthlyReports";
import CategorizeTransactions from "./screens/CategorizeTransactions";
import Settings from "./screens/Settings";
import SignOut from "./screens/SignOut";
import BudgetPreview from "./screens/BudgetPreview"

export default class App extends Component {
    componentDidMount() {
        firebase.initializeApp(firebaseConfig);
    };

    render() {
        const Drawer = DrawerNavigator(
            {
                SignIn: {screen: SignIn},
                SignUp: {screen: SignUp},
                SignOut: {screen: SignOut},
                MyBudget: {screen: MyBudget},
                CreateBudget: {screen: CreateBudget},
                BudgetPreview: {screen: BudgetPreview},
                SpendingOverview: {screen: SpendingOverview},
                MonthlyReports: {screen: MonthlyReports},
                CategorizeTransactions: {screen: CategorizeTransactions},
                Settings: {screen: Settings}
            },
            {
                initialRouteName: "CreateBudget",
                contentOptions: {
                    activeTintColor: "#e91e63"
                },
                contentComponent:
                    props => <SideBar {...props} />
            }
        );

        const AppNavigator = StackNavigator(
            {
                Drawer: {screen: Drawer},
                SignIn: {screen: SignIn},
                SignUp: {screen: SignUp},
                SignOut: {screen: SignOut},
                MyBudget: {screen: MyBudget},
                CreateBudget: {screen: CreateBudget},
                BudgetPreview: {screen: BudgetPreview},
                SpendingOverview: {screen: SpendingOverview},
                MonthlyReports: {screen: MonthlyReports},
                CategorizeTransactions: {screen: CategorizeTransactions},
                Settings: {screen: Settings}
            },
            {
                initialRouteName: "Drawer",
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
