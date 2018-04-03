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
import {getBudget} from "../actions";

class Intro extends Component {
    componentWillMount() {
        if(this.props.budgetID === '')
            this.props.navigation.navigate("MyBudget");
    }

    render() {
        return (
            <Container style={{alignItems: 'stretch'}}>
                <ConfirmDialog
                    title={I18n.t('introConfirmDialogHeader')}
                    text={I18n.t('introConfirmDialogBody')}
                    confirmCallback={() => this.props.navigation.navigate("Accounts")}
                    loading={this.props.loading}
                    ref={(confirmDialog) => {
                        this.confirmDialog = confirmDialog
                    }}
                />

                <AppHeader headerText={I18n.t('introHeader')}
                           onLeftButtonPress={() => this.props.navigation.navigate("DrawerOpen")}
                />

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
                                onPress={() => this.props.isAccountCreated ?
                                    (this.props.navigation.navigate("CreateBudget")) :
                                    (this.confirmDialog.showDialog())}
                                style={styles.buttonStyle}
                        >
                            {this.props.loading ? (
                                <Spinner color='#D0D0D0'/>) : (
                                <Label style={color.white}>
                                    {I18n.t('introGetStarted')}
                                </Label>
                            )}
                        </Button>
                    </Form>
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

const mapStateToProps = ({budget}) => {
    return {isAccountCreated, budgetID} = budget;
};

export default connect(mapStateToProps, null)(Intro);
