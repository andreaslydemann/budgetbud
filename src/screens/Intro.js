import React, {Component} from 'react';
import {Button, Container, Form, Label, Spinner, Text} from "native-base";
import {AppHeader, ConfirmDialog} from "../components/";
import {Image} from "react-native";
import {connect} from "react-redux";
import {getBudget} from "../actions/budget_actions";
import {color} from "../style/";


class Intro extends Component {
    componentWillMount() {
        this.props.getBudget(() => {
            this.props.navigation.navigate('MyBudget');
        });
    }

    render() {
        return (
            <Container style={{alignItems: 'stretch'}}>
                <ConfirmDialog
                    title="Tilføj konto"
                    text="Du mangler at tilføje en konto. Vil du gøre det nu?"
                    confirmCallback={() => this.props.navigation.navigate("CreateAccount")}
                    loading={this.props.loading}
                    ref={(confirmDialog) => {
                        this.confirmDialog = confirmDialog }}
                />

                <AppHeader headerText={'Velkommen'}
                           onLeftButtonPress={() => this.props.navigation.navigate("DrawerOpen")}
                />

                <Container style={styles.container}>

                    <Form style={styles.formStyle}>
                        {/*---Body header text---*/}
                        <Text style={styles.headerTextStyle}>
                            Opret et budget
                        </Text>

                        {/*---Logo---*/}
                        <Container style={styles.logoContainer}>
                            <Image style={{width: 200, height: 200}}
                                   source={require('../../assets/logo.png')}/>
                        </Container>

                        {/*---Informative text---*/}
                        <Text style={styles.mainTextStyle}>
                            Du har ikke oprettet et budget endnu.
                            Det er nemt og hurtigt at oprette for
                            at opnå økonomisk overblik og stabilitet.
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
                                    Kom i gang
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
    const {isAccountCreated} = budget;
    return {isAccountCreated};
};

export default connect(mapStateToProps, {getBudget
})(Intro);
