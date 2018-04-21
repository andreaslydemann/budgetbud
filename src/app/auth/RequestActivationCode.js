import React, {Component} from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {connect} from 'react-redux';
import {Container, Button, Label} from 'native-base';
import {Logo, ErrorInfo, ActivationCodeForm} from '../../components/index';
import {
    requestActivationCode,
    cprNumberChanged,
    resetAuthState
} from '../actions/index';
import {button, color, container} from "../../style/index";
import I18n from "../../strings/i18n";

class RequestActivationCode extends Component {
    onCprNumberChange = (text) => {
        this.props.cprNumberChanged(text);
    };

    handleSubmit = () => {
        Keyboard.dismiss();
        this.props.requestActivationCode(this.props.cprNumber, () => {
            this.props.navigation.navigate('VerifyActivationCode');
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
                    <Container style={{alignSelf: 'stretch', justifyContent: 'center'}}>

                        <View style={{flex: 0.55, justifyContent: 'flex-end'}}>
                            <Logo logoText={I18n.t('requestActivationCodeDescription')}/>
                        </View>

                        <ActivationCodeForm
                            inputValue={this.props.cprNumber}
                            authLoading={this.props.authLoading}
                            onInputValueChange={this.onCprNumberChange}
                            handleSubmit={this.handleSubmit}
                            isRequestActivationCode={true}
                        />

                        <Container style={{flex: 0.25}}>
                            <Container style={container.optionContainer}>
                                <Button transparent style={button.optionButton}
                                        onPress={() => this.onGoToSignInButtonPress()}>
                                    <Label style={color.optionButton}>
                                        {I18n.t('requestActivationCodeReturnButton')}
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
    requestActivationCode,
    cprNumberChanged,
    resetAuthState
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestActivationCode);
