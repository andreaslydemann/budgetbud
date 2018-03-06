import React, {Component} from 'react';
import {Container} from "native-base";
import AppHeader from "../components/AppHeader";

class CategorizeTransactions extends Component {
    render() {
        return (
            <Container style={{alignItems: 'stretch'}}>
                <AppHeader headerText={'Kategorisér transaktioner'}
                           onLeftButtonPress={() => this.props.navigation.navigate("DrawerOpen")}/>
            </Container>
        );
    }
}

export default CategorizeTransactions;
