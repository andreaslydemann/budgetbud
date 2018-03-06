import React, {Component} from 'react';
import {Container} from "native-base";
import AppHeader from "../components/AppHeader";

class Settings extends Component {
    render() {
        return (
            <Container style={{alignItems: 'stretch'}}>
                <AppHeader headerText={'Indstillinger'}
                           onLeftButtonPress={() => this.props.navigation.navigate("DrawerOpen")}/>
            </Container>
        );
    }
}

export default Settings;
