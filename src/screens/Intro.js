import React, {Component} from 'react';
import {
    Button,
    Container,
    Label,
    Spinner,
    Text
} from "native-base";
import {AppHeader, ConfirmDialog} from "../components/";
import {Image} from "react-native";
import {connect} from "react-redux";
import {color, container} from "../style/";
import I18n from "../strings/i18n";
import {getLinkedAccounts} from "../actions/account_actions";

class Intro extends Component {
    componentWillMount() {
        this.props.getLinkedAccounts();
    }

    render() {
        return (
            <Container style={[container.signedInContainer, {alignItems: 'stretch'}]}>
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
                <Container style={{justifyContent: 'center'}}>
                    {this.props.accountsLoading ? (
                        <Spinner style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }} color='#1c313a'/>) : (
                        <Container style={container.defaultFormStyle}>
                            <Container style={{flex: 1,}}>
                                <Container style={{flex: 0.15, justifyContent: 'flex-end'}}>
                                    <Text style={[styles.headerTextStyle, color.text]}>
                                        {I18n.t('introCreateBudgetHeader')}
                                    </Text>
                                </Container>
                                <Container style={{
                                    flex: 0.7,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Image style={{width: 220, height: 220, borderRadius: 110, borderColor: '#03426A', borderWidth: 2}}
                                           source={require('../../assets/logo.png')}/>
                                </Container>

                                <Container style={{flex: 0.15, justifyContent: 'flex-start', alignItems: 'flex-end'}}>
                                    <Text style={[styles.mainTextStyle, color.text]}>
                                        {I18n.t('introCreateBudgetBody')}
                                    </Text>
                                </Container>
                            </Container>
                            <Button rounded
                                    onPress={() => this.props.linkedAccounts.length === 0 ?
                                        (this.confirmDialog.showDialog()) :
                                        (this.props.navigation.navigate("CreateBudget"))}
                                    style={[styles.buttonStyle]}
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

const styles = {
    logoContainer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerTextStyle: {
        fontWeight: 'bold',
        fontSize: 26,
        alignSelf: 'center',
        color: '#002940'
    },
    mainTextStyle: {
        fontWeight: 'bold',
        fontSize: 17,
        justifyContent: 'center',
        alignSelf: 'center',
        width: 310
    },
    buttonStyle: {
        width: '100%',
        height: 40,
        backgroundColor: '#1c313a',
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center'
    },
};

const mapStateToProps = (state) => {
    const {budgetID} = state.budget;
    const {linkedAccounts, accountsLoading} = state.account;

    return {budgetID, linkedAccounts, accountsLoading};
};

const mapDispatchToProps = {
    getLinkedAccounts
};

export default connect(mapStateToProps, mapDispatchToProps)(Intro);
