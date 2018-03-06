import React, {Component} from 'react';
import {Container} from "native-base";
import AppHeader from "../components/AppHeader";

class BudgetPreview extends Component {
    render() {
        return (
            <Container style={{alignItems: 'stretch'}}>
                {/*---HEADER---*/}
                <AppHeader headerText={'BudgetPreview'}/>
            </Container>
        );
    }
}

export default BudgetPreview;