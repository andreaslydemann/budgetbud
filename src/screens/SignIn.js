import React, {Component} from 'react';
import {
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback, View
} from 'react-native';
import {connect} from 'react-redux';
import {Container, Button, Label} from 'native-base';
import {AuthForm, ErrorInfo, Logo} from '../components/';
import {
    signIn,
    cprNumberChanged,
    codeChanged,
    resetAuthState
} from '../actions';
import {container, button, color} from "../style";
import I18n from "../strings/i18n";

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
        this.props.signIn({cprNumber, code});
    };

    onForgotCodeButtonPress = () => {
        this.props.resetAuthState(() => {
            this.props.navigation.navigate('SendActivationCode');
        });
    };

    onGoToSignUpButtonPress = () => {
        this.props.resetAuthState(() => {
            this.props.navigation.navigate('SignUp');
        });
    };

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={container.signedOutContainer}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <Container style={{alignSelf: 'stretch'}}>

                        <View style={[container.parentContainer, {flex: 2}]}>
                            <Logo logoText={I18n.t('signInLogoWelcome')}/>
                        </View>

                        <AuthForm handleSubmit={this.handleSubmit}
                                  onCprNumberChange={this.onCprNumberChange}
                                  onSecondInputChange={this.onCodeChange}
                                  cprNumber={this.props.cprNumber}
                                  secondInput={this.props.code}
                                  authLoading={this.props.authLoading}
                                  isSignIn={true}
                        />

                        <Container>
                            <Container style={container.optionContainer}>
                                <Button transparent style={button.optionButton}
                                        onPress={() => this.onForgotCodeButtonPress()}>
                                    <Label style={color.optionButton}>{I18n.t('signInForgotCode')}</Label>
                                </Button>

                                <Button transparent style={button.optionButton}
                                        onPress={() => this.onGoToSignUpButtonPress()}>
                                    <Label style={color.optionButton}>{I18n.t('signInGoToSignUp')}</Label>
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

const mapStateToProps = ({auth}) => {
    return {cprNumber, code, authError, authLoading} = auth;
};

const mapDispatchToProps = {
    signIn, cprNumberChanged, codeChanged, resetAuthState
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
