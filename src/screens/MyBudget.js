import React, {Component} from 'react';
import {Container} from "native-base";
import {Platform, Text} from 'react-native';
import AppHeader from '../components/AppHeader';


class MyBudget extends Component {
    render() {
        return (
            <Container style={{marginTop: Platform.OS === 'android' ? 24 : 0}}>
                <AppHeader onLeftButtonPress={() => this.props.navigation.navigate("DrawerOpen")}
                           >

                </AppHeader>

            </Container>
        );
    }
}


export default MyBudget;
