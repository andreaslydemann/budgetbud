import React, {Component} from 'react';
import {
    Button,
    Container,
    Label,
    Spinner,
    Text
} from "native-base";
import {AppHeader, ConfirmDialog} from "../../components";
import {Image} from "react-native";
import {connect} from "react-redux";
import {color, container, text, button} from "../../style";
import I18n from "../../strings/i18n";
import {getLinkedAccounts} from "../../redux/actions";

class Intro extends Component {
    componentWillMount() {
        this.props.getLinkedAccounts();
    }

    render() {
        return (
            <Container style={[container.signedInContainer]}>
                <ConfirmDialog
                    title={I18n.t('introConfirmDialogHeader')}
                    text={I18n.t('introConfirmDialogBody')}
                    confirmCallback={() => {
                        this.props.navigation.navigate("Accounts");
                        this.confirmDialog.dismissDialog();
                    }}
                    budgetLoading={this.props.budgetLoading}
                    ref={(confirmDialog) => {
                        this.confirmDialog = confirmDialog
                    }}
                />

                <AppHeader headerText={I18n.t('introHeader')}
                           onLeftButtonPress={() => this.props.navigation.navigate("DrawerOpen")}
                />
                <Container style={container.justifyCenter}>
                    {this.props.accountsLoading ? (
                        <Spinner style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }} color='#1c313a'/>) : (
                        <Container style={container.defaultFormStyle}>
                            <Container style={{flex: 1,}}>
                                <Container style={{flex: 0.15, justifyContent: 'flex-end'}}>
                                    <Text style={[text.headerText, color.text]}>
                                        {I18n.t('introCreateBudgetHeader')}
                                    </Text>
                                </Container>
                                <Container style={{
                                    flex: 0.7,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Image style={{width: 220, height: 220, borderRadius: 110, borderColor: '#03426A', borderWidth: 2}}
                                           source={require('../../../assets/logo.png')}/>
                                </Container>

                                <Container style={{flex: 0.15, justifyContent: 'flex-start', alignItems: 'flex-end'}}>
                                    <Text style={[text.bodyText, container.bodyContainer, color.text]}>
                                        {I18n.t('introCreateBudgetBody')}
                                    </Text>
                                </Container>
                            </Container>
                            <Button rounded
                                    onPress={() => this.props.linkedAccounts.length === 0 ?
                                        (this.confirmDialog.showDialog()) :
                                        (this.props.navigation.navigate("CreateBudget"))}
                                    style={[button.defaultButton, color.button, {width: '100%'}]}
                            >
                                {this.props.budgetLoading ? (
                                    <Spinner color='#D0D0D0'/>) : (
                                    <Label style={color.white}>
                                        {I18n.t('introGetStarted')}
                                    </Label>
                                )}
                            </Button>
                        </Container>)}
                </Container>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const {budgetID} = state.budget;
    const {linkedAccounts, accountsLoading} = state.account;

    return {budgetID, linkedAccounts, accountsLoading};
};

const mapDispatchToProps = {
    getLinkedAccounts
};

export default connect(mapStateToProps, mapDispatchToProps)(Intro);
