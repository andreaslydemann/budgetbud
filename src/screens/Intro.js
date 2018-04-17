import React, {Component} from 'react';
import {
    Button,
    Container,
    Form,
    Label,
    Spinner,
    Text
} from "native-base";
import {AppHeader, ConfirmDialog} from "../components/";
import {Image} from "react-native";
import {connect} from "react-redux";
import {color} from "../style/";
import I18n from "../strings/i18n";
import {container} from "../style";
import {getLinkedAccounts} from "../actions/account_actions";
import View from "../theme/components/View";

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
                        <Container style={styles.container}>
                            <Form style={styles.formStyle}>
                                <Text style={styles.headerTextStyle}>
                                    {I18n.t('introCreateBudgetHeader')}
                                </Text>

                                <Container style={styles.logoContainer}>
                                    <Image style={{width: 200, height: 200}}
                                           source={require('../../assets/logo.png')}/>
                                </Container>

                                <Text style={styles.mainTextStyle}>
                                    {I18n.t('introCreateBudgetBody')}
                                </Text>

                                <Button rounded
                                        onPress={() => this.props.linkedAccounts.length === 0 ?
                                            (this.confirmDialog.showDialog()) :
                                            (this.props.navigation.navigate("CreateBudget"))}
                                        style={styles.buttonStyle}
                                >
                                    {this.props.budgetLoading ? (
                                        <Spinner color='#D0D0D0'/>) : (
                                        <Label style={color.white}>
                                            {I18n.t('introGetStarted')}
                                        </Label>
                                    )}
                                </Button>
                            </Form>
                        </Container>)}
                </Container>
            </Container>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    logoContainer: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formStyle: {
        width: '80%',
        flex: 1,
        alignItems: 'stretch',
    },
    headerTextStyle: {
        fontWeight: 'bold',
        fontSize: 25,
        alignSelf: 'center',
        marginTop: 25,
        flex: 1,
        color: '#002940'
    },
    mainTextStyle: {
        fontSize: 16,
        justifyContent: 'center',
        width: '100%'
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
