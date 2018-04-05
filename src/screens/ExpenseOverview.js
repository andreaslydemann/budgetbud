import React, {Component} from 'react';
import {Container} from "native-base";
import {AppHeader} from "../components/";
import I18n from "../strings/i18n";

class ExpenseOverview extends Component {
    render() {
        return (
            <Container style={{alignItems: 'stretch'}}>
                <AppHeader headerText={I18n.t('expenseOverviewHeader')}
                           onLeftButtonPress={() => this.props.navigation.navigate("DrawerOpen")}/>
            </Container>
        );
    }
}

export default ExpenseOverview;
