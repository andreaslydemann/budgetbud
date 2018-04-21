import React, {Component} from 'react';
import {
    Container,
    Content,
    List,
    ListItem,
    Label,
    Body,
    Left,
    Right,
    Icon
} from "native-base";
import {AppHeader, ConfirmDialog} from "../components/";
import {connect} from "react-redux";
import I18n from "../strings/i18n";
import {deleteBudget, resetBudgetError} from "../actions";
import {container, color} from "../style";
import {showWarningToast} from "../helpers";

class Settings extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.budgetError) {
            showWarningToast(nextProps.budgetError);
            this.props.resetBudgetError();
        }
    }

    deleteBudget = () => {
        const {budgetID} = this.props;
        this.props.deleteBudget({budgetID}, () => {
            this.props.navigation.navigate('CreateBudget');
        });
    };

    render() {
        return (
            <Container style={container.signedInContainer}>
                <ConfirmDialog
                    title={I18n.t('confirmDialogDeletionHeader')}
                    text={I18n.t('settingsConfirmDialogBody')}
                    confirmCallback={() => this.deleteBudget()}
                    budgetLoading={this.props.budgetLoading}
                    ref={(confirmDialog) => {
                        this.confirmDialog = confirmDialog
                    }}
                />

                <Container>
                    <AppHeader headerText={I18n.t('settingsHeader')}
                               onLeftButtonPress={() => this.props.navigation.navigate("DrawerOpen")}/>

                    <Content>
                        <List>
                            <ListItem icon onPress={() => this.props.navigation.navigate("UserDetails")}>
                                <Left>
                                    <Icon style={color.darkIcon} name="md-person"/>
                                </Left>
                                <Body>
                                <Label style={color.text}>{I18n.t('settingsUserDetails')}</Label>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward"/>
                                </Right>
                            </ListItem>
                            <ListItem icon onPress={() => this.props.navigation.navigate("Accounts")}>
                                <Left>
                                    <Icon style={color.darkIcon} name="md-card"/>
                                </Left>
                                <Body>
                                <Label style={color.text}>{I18n.t('settingsAccounts')}</Label>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward"/>
                                </Right>
                            </ListItem>
                            <ListItem icon onPress={() => this.props.navigation.navigate("Alarms")}>
                                <Left>
                                    <Icon style={color.darkIcon} name="md-notifications-outline"/>
                                </Left>
                                <Body>
                                <Label style={color.text}>{I18n.t('settingsAlarms')}</Label>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward"/>
                                </Right>
                            </ListItem>
                            <ListItem icon onPress={() => this.confirmDialog.showDialog()}>
                                <Left>
                                    <Icon style={color.darkIcon} name="md-trash"/>
                                </Left>
                                <Body>
                                <Label style={color.text}>{I18n.t('settingsDeleteBudget')}</Label>
                                </Body>
                                <Right >
                                    <Icon name="arrow-forward"/>
                                </Right>
                            </ListItem>
                        </List>
                    </Content>
                </Container>
            </Container>
        );
    }
}

const mapStateToProps = ({budget}) => {
    return {budgetID, budgetError} = budget;
};

const mapDispatchToProps = {
    deleteBudget, resetBudgetError
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
