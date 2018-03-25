import React, {Component} from 'react';
import {Container} from "native-base";
import AppHeader from "../components/AppHeader";

class CreateAccount extends Component {
    render() {
        return (
            <Container style={{alignItems: 'stretch'}}>
                <AppHeader headerText={'Tilføj konto'}
                           onLeftButtonPress={() => this.props.navigation.navigate("DrawerOpen")}/>
            </Container>
        );
    }
}

export default CreateAccount;
