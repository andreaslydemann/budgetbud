import React, {Component} from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {connect} from 'react-redux';
import {Container, Button, Label} from 'native-base';
import {Logo, ErrorInfo} from '../components/';
import {
    verifyActivationCode,
    activationCodeChanged,
    resetAuthState
} from '../actions';
import {button, color, container} from "../style/";
import I18n from "../strings/i18n";
import {ActivationCodeForm} from "../components/ActivationCodeForm";

class VerifyActivationCode extends Component {
    onActivationCodeChange = (text) => {
        console.log(text);
        this.props.activationCodeChanged(text);
    };

    handleSubmit = () => {
        Keyboard.dismiss();
        this.props.navigation.navigate('ChangeForgottenCode');
        /*this.props.verifyActivationCode(this.props.activationCode, () => {
            this.props.navigation.navigate('ChangeForgottenCode');
        });*/
    };

    onGoToSendActivationButtonPress = () => {
        this.props.resetAuthState(() => {
            this.props.navigation.pop();
        });
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
                            isSendActivationCode={false}
                        />

                        <Container style={{flex: 0.25}}>
                            <Container style={container.optionContainer}>
                                <Button transparent style={button.optionButton}
                                        onPress={() => this.onGoToSendActivationButtonPress()}>
                                    <Label style={color.optionButton}>
                                        {I18n.t('verifyActivationCodeReturnButton')}
                                    </Label>
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
    return {activationCode, authError, authLoading} = auth;
};

const mapDispatchToProps = {
    verifyActivationCode,
    activationCodeChanged,
    resetAuthState
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyActivationCode);
