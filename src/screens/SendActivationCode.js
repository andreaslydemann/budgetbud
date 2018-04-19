import React, {Component} from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {connect} from 'react-redux';
import {Container, Button, Label} from 'native-base';
import {Logo, ErrorInfo, ActivationCodeForm} from '../components/';
import {
    sendActivationCode,
    cprNumberChanged,
    resetAuthState
} from '../actions';
import {button, color, container} from "../style/";
import I18n from "../strings/i18n";

class SendActivationCode extends Component {
    onCprNumberChange = (text) => {
        this.props.cprNumberChanged(text);
    };

    handleSubmit = () => {
        Keyboard.dismiss();
        this.props.navigation.navigate('VerifyActivationCode');
        /*
        this.props.sendActivationCode(this.props.cprNumber, () => {
            this.props.navigation.navigate('VerifyActivationCode');
        });*/
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
                    <Container style={{alignSelf: 'stretch', justifyContent: 'center'}}>

                        <View style={{flex: 0.55, justifyContent: 'flex-end'}}>
                            <Logo logoText={I18n.t('sendActivationCodeDescription')}/>
                        </View>

                        <ActivationCodeForm
                            inputValue={this.props.cprNumber}
                            authLoading={this.props.authLoading}
                            onInputValueChange={this.onCprNumberChange}
                            handleSubmit={this.handleSubmit}
                            isSendActivationCode={true}
                        />

                        <Container style={{flex: 0.25}}>
                            <Container style={container.optionContainer}>
                                <Button transparent style={button.optionButton}
                                        onPress={() => this.onGoToSignInButtonPress()}>
                                    <Label style={color.optionButton}>
                                        {I18n.t('sendActivationCodeReturnButton')}
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
    return {cprNumber, authError, authLoading} = auth;
};

const mapDispatchToProps = {
    sendActivationCode,
    cprNumberChanged,
    resetAuthState
};

export default connect(mapStateToProps, mapDispatchToProps)(SendActivationCode);
