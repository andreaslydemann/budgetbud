import React, {Component} from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {connect} from 'react-redux';
import {Container, Button, Label} from 'native-base';
import {Logo} from '../../components/index';
import {button, color, container} from "../../style/index";
import I18n from "../../strings/i18n";
import {ActivationCodeForm} from "../../components/forms/ActivationCodeForm";
import {
    activationCodeChanged,
    resetAuthState,
    verifyActivationCode,
    resetAuthError
} from "../../redux/actions";
import {showWarningToast} from "../../helpers/toasts";

class VerifyActivationCode extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.authError) {
            showWarningToast(nextProps.authError);
            this.props.resetAuthError();
        }
    }

    onActivationCodeChange = (text) => {
        this.props.activationCodeChanged(text);
    };

    handleSubmit = () => {
        Keyboard.dismiss();
        this.props.verifyActivationCode(
            this.props.activationCode,
            this.props.cprNumber,
            () => {
                this.props.navigation.navigate('ChangeForgottenCode');
            });
    };

    onGoToRequestActivationButtonPress = () => {
        if (!this.props.authLoading) {
            this.props.resetAuthState(() => {
                this.props.navigation.pop();
            });
        }
    };

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={container.signedOutContainer}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <Container style={{alignSelf: 'stretch', justifyContent: 'center'}}>

                        <View style={{flex: 0.55, justifyContent: 'flex-end'}}>
                            <Logo logoText={I18n.t('verifyActivationCodeDescription')}/>
                        </View>

                        <ActivationCodeForm
                            inputValue={this.props.activationCode}
                            authLoading={this.props.authLoading}
                            onInputValueChange={this.onActivationCodeChange}
                            handleSubmit={this.handleSubmit}
                            isRequestActivationCode={false}
                        />

                        <Container style={{flex: 0.25}}>
                            <Container style={container.optionContainer}>
                                <Button transparent style={button.optionButton}
                                        onPress={() => this.onGoToRequestActivationButtonPress()}>
                                    <Label style={color.optionButton}>
                                        {I18n.t('verifyActivationCodeReturnButton')}
                                    </Label>
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
    return {cprNumber, activationCode, authError, authLoading} = auth;
};

const mapDispatchToProps = {
    verifyActivationCode,
    activationCodeChanged,
    resetAuthState,
    resetAuthError
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyActivationCode);
