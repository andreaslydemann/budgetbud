import React, {Component} from 'react';
import {
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import {connect} from 'react-redux';
import {Container, Button, Label} from 'native-base';
import {Logo, AuthForm, ErrorInfo} from '../components/';
import {
    signUp,
    cprNumberChanged,
    phoneNumberChanged,
    resetAuthState
} from '../actions';
import {container} from "../style";
import I18n from "../strings/i18n";

class SignUp extends Component {
    onCprNumberChange = (text) => {
        this.props.cprNumberChanged(text);
    };

    onPhoneNumberChange = (text) => {
        this.props.phoneNumberChanged(text);
    };

    handleSubmit = () => {
        Keyboard.dismiss();
        const {cprNumber, phoneNumber} = this.props;
        this.props.signUp({cprNumber, phoneNumber}, () => {
            this.props.navigation.pop();
        });
    };

    onGoToSignInButtonPress = () => {
        this.props.resetAuthState(() => {
            this.props.navigation.pop();
        });
    };

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={container.signedOutContainer}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <Container style={{alignSelf: 'stretch'}}>

                        <Logo style={{flex: 2}} logoText={I18n.t('signInLogoWelcome')}/>

                        <AuthForm handleSubmit={this.handleSubmit}
                                  onCprNumberChange={this.onCprNumberChange}
                                  onSecondInputChange={this.onPhoneNumberChange}
                                  cprNumber={this.props.cprNumber}
                                  secondInput={this.props.phoneNumber}
                                  authLoading={this.props.authLoading}
                                  isSignIn={false}
                        />

                        <Container>
                            <Container style={styles.optionContainer}>
                                <Button transparent style={styles.optionButton}
                                        onPress={() => this.onGoToSignInButtonPress()}>
                                    <Label style={styles.optionText}>{I18n.t('signUpGoToSignIn')}</Label>
                                </Button>
                            </Container>

                            <ErrorInfo error={this.props.authError}/>
                        </Container>

                    </Container>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    };
}

const styles = {
    optionContainer: {
        flexShrink: 1,
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
    }
};

const mapStateToProps = ({auth}) => {
    return {cprNumber, phoneNumber, authError, authLoading} = auth;
};

const mapDispatchToProps = {
    signUp,
    cprNumberChanged,
    phoneNumberChanged,
    resetAuthState
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
