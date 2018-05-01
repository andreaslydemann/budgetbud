import React, {Component} from 'react';
import {
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback, View
} from 'react-native';
import {connect} from 'react-redux';
import {Container, Button, Label} from 'native-base';
import {AuthForm, Logo} from '../../components/index';
import {container, button, color} from "../../style/index";
import I18n from "../../strings/i18n";
import {
    codeChanged,
    cprNumberChanged,
    resetAuthState,
    signIn,
    resetAuthError
} from "../../redux/actions";
import {showWarningToast} from "../../helpers/toasts";

class SignIn extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.authError) {
            showWarningToast(nextProps.authError);
            this.props.resetAuthError();
        }
    }

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
        if (!this.props.authLoading) {
            this.props.resetAuthState(() => {
                this.props.navigation.navigate('RequestActivationCode');
            });
        }
    };

    onGoToSignUpButtonPress = () => {
        if (!this.props.authLoading) {
            this.props.resetAuthState(() => {
                this.props.navigation.navigate('SignUp');
            });
        }
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
    signIn,
    cprNumberChanged,
    codeChanged,
    resetAuthState,
    resetAuthError
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
