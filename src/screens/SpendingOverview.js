import React, {Component} from 'react';
import {Container} from "native-base";
import AppHeader from "../components/AppHeader";
import I18n from "../strings/i18n";

class SpendingOverview extends Component {
    render() {
        return (
            <Container style={{alignItems: 'stretch'}}>
                <AppHeader headerText={I18n.t('spendingOverviewHeader')}
                           onLeftButtonPress={() => this.props.navigation.navigate("DrawerOpen")}/>
            </Container>
        );
    }
}

export default SpendingOverview;
