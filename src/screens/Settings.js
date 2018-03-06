import React, {Component} from 'react';
import {Container} from "native-base";
import AppHeader from "../components/AppHeader";

class Settings extends Component {
    render() {
        return (
            <Container style={{alignItems: 'stretch'}}>
                {/*---HEADER---*/}
                <AppHeader headerText={'Settings'}/>
            </Container>
        );
    }
}

export default Settings;