import React, {Component} from 'react';
import {Button, Container, Form, Label, Text} from "native-base";
import AppHeader from "../components/AppHeader";
import {Image} from "react-native";
import ConfirmDialog from "../components/ConfirmDialog";
import {connect} from "react-redux";


class Intro extends Component {
    componentWillMount() {
        this.props.getBudget(() => {
            this.props.navigation.navigate('CreateBudget');
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
                            onPress={this.props.accountCreated ?
                            this.props.navigation.navigate("CreateBudget") : () => this.confirmDialog.showDialog()}
                            style={styles.buttonStyle}
                            >
                            {this.props.loading ? (
                                <Spinner color='#D0D0D0'/>) : (
                                <Label style={styles.buttonText}>
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
    buttonText: {
        color: '#ffffff'
    },
    itemStyle: {
        marginTop: 10,
        height: 40,
        backgroundColor: 'rgba(255, 255,255,0.2)',
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
    },
};

const mapStateToProps = ({budget}) => {
    const {accountCreated} = budget;
    return {accountCreated};
};

export default connect(mapStateToProps, {
})(Intro);
