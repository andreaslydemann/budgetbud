import React, {Component} from 'react';
import {Container} from "native-base";
import AppHeader from "../components/AppHeader";

class CategorizeTransactions extends Component {
    render() {
        return (
            <Container style={{alignItems: 'stretch'}}>
                {/*---HEADER---*/}
                <AppHeader headerText={'CategorizeTransactions'}/>
            </Container>
        );
    }
}

export default CategorizeTransactions;