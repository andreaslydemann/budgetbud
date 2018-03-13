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
import BudgetPreview from "./screens/BudgetPreview"
import {AsyncStorage} from "react-native";
import UserDetails from "./screens/UserDetails";
import Intro from "./screens/Intro";
import EditBudget from "./screens/EditBudget";

export default class App extends Component {
    state = {signedIn: false};

    async componentWillMount() {
        // await AsyncStorage.removeItem('jwt');
        let token = await AsyncStorage.getItem('jwt');

        if (token)
            this.setState({signedIn: true});
        else
            this.setState({signedIn: false});
    };

    componentDidMount() {
        firebase.initializeApp(firebaseConfig);
    };

    render() {
        const SettingsStack = StackNavigator(
            {
                Settings: {screen: Settings},
                UserDetails: {screen: UserDetails}
            },
            {
                navigationOptions: {gesturesEnabled: false},
                initialRouteName: "Settings",
                headerMode: "none"
            }
        );

        const Drawer = DrawerNavigator(
            {
                MyBudget: {screen: MyBudget},
                CreateBudget: {screen: CreateBudget},
                BudgetPreview: {screen: BudgetPreview},
                SpendingOverview: {screen: SpendingOverview},
                MonthlyReports: {screen: MonthlyReports},
                CategorizeTransactions: {screen: CategorizeTransactions},
                Settings: {screen: SettingsStack},
                Intro: {screen: Intro},
                EditBudget: {screen: EditBudget},
            },
            {
                initialRouteName: "MyBudget",
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
                initialRouteName: this.state.signedIn ? 'Drawer' : 'SignIn',
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
