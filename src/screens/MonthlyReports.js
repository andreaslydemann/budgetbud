import React, {Component} from 'react';
import {Container} from "native-base";
import {AppHeader} from "../components/";

class MonthlyReports extends Component {
    render() {
        return (
            <Container style={{alignItems: 'stretch'}}>
                <AppHeader headerText={'Månedsrapporter'}
                           onLeftButtonPress={() => this.props.navigation.navigate("DrawerOpen")}/>
            </Container>
        );
    }
}

export default MonthlyReports;
