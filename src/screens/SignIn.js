import React, {Component} from 'react';
import {KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import {Container, Button, Label} from 'native-base';
import {signIn, cprNumberChanged, codeChanged, authScreenSwitched} from '../actions';
import Logo from '../components/Logo';
import AuthForm from '../components/AuthForm';
import ErrorInfo from '../components/ErrorInfo';
import screenStyles from './ScreenStyles';

class SignIn extends Component {
    onCprNumberChange = (text) => {
        this.props.cprNumberChanged(text);
    };

    onCodeChange = (text) => {
        this.props.codeChanged(text);
    };

    handleSubmit = () => {
        Keyboard.dismiss();
        const {cprNumber, code} = this.props;
        this.props.signIn({cprNumber, code}, () => {
            this.props.navigation.navigate('Drawer');
        });
    };

    onForgotCodeButtonPress = () => {
        /*
        this.props.authScreenSwitched(() => {
            this.props.navigation.navigate('SignUp');
        });*/
    };

    onGoToSignUpButtonPress = () => {
        this.props.authScreenSwitched(() => {
            this.props.navigation.navigate('SignUp');
        });
    };

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={screenStyles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <Container style={{alignSelf: 'stretch'}}>

                        <Logo/>

                        <AuthForm handleSubmit={this.handleSubmit}
                                  onCprNumberChange={this.onCprNumberChange}
                                  onSecondInputChange={this.onCodeChange}
                                  cprNumber={this.props.cprNumber}
                                  secondInput={this.props.code}
                                  loading={this.props.loading}
                                  error={this.props.error}
                                  isSignIn={true}
                        />

                        <Container>
                            <Container style={styles.optionContainer}>
                                <Button transparent style={styles.optionButton}
                                        onPress={() => this.onForgotCodeButtonPress()}>
                                    <Label style={styles.optionText}>Glemt pinkode?</Label>
                                </Button>

                                <Button transparent style={styles.optionButton}
                                        onPress={() => this.onGoToSignUpButtonPress()}>
                                    <Label style={styles.optionText}>Ny bruger?</Label>
                                </Button>
                            </Container>

                            <ErrorInfo error={this.props.error}/>
                        </Container>

                    </Container>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    };
}

const styles = {
    container: {
        backgroundColor: '#455a64',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%'
    },
    optionContainer: {
        alignItems: 'flex-start',
        alignSelf: 'center',
        width: '80%',
        paddingTop: 13
    },
    optionText: {
        color: 'rgba(255,255,255,0.6)'
    },
    optionButton: {
        height: 30,
        paddingLeft: 5
    },
    buttonText: {
        color: '#ffffff'
    }
};

const mapStateToProps = ({auth}) => {
    const {cprNumber, code, error, loading} = auth;
    return {cprNumber, code, error, loading};
};

export default connect(mapStateToProps, {
    signIn, cprNumberChanged, codeChanged, authScreenSwitched
})(SignIn);
