import React, {Component} from 'react';
import {Body, Button, Container, Header, Icon, Left, Title} from "native-base";
import {Platform} from 'react-native';

class SpendingOverview extends Component {
    render() {
        return (
            <Container style={{alignItems: 'stretch'}}>
                <AppHeader headerText={'MyBudget'}
                           onLeftButtonPress={() => this.props.navigation.navigate("DrawerOpen")}/>
            </Container>
        );
    }
}

export default SpendingOverview;
