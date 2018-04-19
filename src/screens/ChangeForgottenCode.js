import React, {Component} from 'react';
import {
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {connect} from 'react-redux';
import {Container, Button, Label} from 'native-base';
import {Logo, ChangeForgottenCodeForm, ErrorInfo} from '../components/';
import {
    resetAuthState,
    resetActivationCode,
    repeatedCodeChanged,
    changeForgottenCode,
    codeChanged
} from '../actions';
import I18n from "../strings/i18n";
import {button, container, color} from "../style/";

class ChangeForgottenCode extends Component {
    onCodeChange = (text) => {
        this.props.codeChanged(text);
    };

    onRepeatedCodeChange = (text) => {
        this.props.repeatedCodeChanged(text);
    };

    handleSubmit = () => {
        Keyboard.dismiss();
        this.props.changeForgottenCode(
            this.props.code,
            this.props.repeatedCode,
            this.props.cprNumber, () => {
                this.props.resetAuthState(() => {
                    this.props.navigation.pop(3);
                });
            },
        );
    };

    onGoToVerifyActivationCodeButtonPress = () => {
        this.props.resetActivationCode(() => {
            this.props.navigation.pop();
        });
    };

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={container.signedOutContainer}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <Container style={{alignSelf: 'stretch'}}>

                        <View style={[container.parentContainer, {flex: 2}]}>
                            <Logo style={{flex: 2}} logoText={I18n.t('changeForgottenCodeDescription')}/>
                        </View>

                        <ChangeForgottenCodeForm
                            onCodeChange={this.onCodeChange}
                            onRepeatedCodeChange={this.onRepeatedCodeChange}
                            code={this.props.code}
                            repeatedCode={this.props.repeatedCode}
                            changeLoading={this.props.changeLoading}
                            handleSubmit={this.handleSubmit}
                        />

                        <Container>
                            <Container style={container.optionContainer}>
                                <Button transparent style={button.optionButton}
                                        onPress={() => this.onGoToVerifyActivationCodeButtonPress()}>
                                    <Label style={color.optionButton}>
                                        {I18n.t('changeForgottenCodeReturnButton')}
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
    return {
        code,
        repeatedCode,
        cprNumber,
        authError,
        changeLoading
    } = auth;
};

const mapDispatchToProps = {
    codeChanged,
    repeatedCodeChanged,
    changeForgottenCode,
    resetActivationCode,
    resetAuthState
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangeForgottenCode);
