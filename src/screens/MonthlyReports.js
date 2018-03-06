import React, {Component} from 'react';
import {Container} from "native-base";
import AppHeader from "../components/AppHeader";

class MonthlyReports extends Component {
    render() {
        return (
            <Container style={{alignItems: 'stretch'}}>
                {/*---HEADER---*/}
                <AppHeader headerText={'MonthlyReports'}/>
            </Container>
        );
    }
}

export default MonthlyReports;