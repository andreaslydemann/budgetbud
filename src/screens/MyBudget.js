import React, {Component} from 'react';
import {Container} from "native-base";
import AppHeader from "../components/AppHeader";

class MyBudget extends Component {
    render() {
        return (
            <Container style={{alignItems: 'stretch'}}>
                {/*---HEADER---*/}
                <AppHeader headerText={'MyBudget'}/>
            </Container>
        );
    }
}

export default MyBudget;