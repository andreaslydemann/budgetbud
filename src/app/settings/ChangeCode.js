import React, {Component} from 'react';
import {Keyboard, TouchableWithoutFeedback} from "react-native";
import {connect} from 'react-redux';
import {AppHeader, Separator} from "../../components";
import {
    Container,
    Text,
    Spinner,
    Button,
} from 'native-base';
import I18n from "../../strings/i18n";
import {
    button,
    text,
    container,
    color
} from "../../style";
import {showWarningToast} from "../../helpers";
import {ChangeCodeForm} from "../../components";
import {
    changeCode,
    codeChanged,
    repeatedCodeChanged,
    resetAuthState
} from "../../redux/actions";

class ChangeCode extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.authError) {
            showWarningToast(nextProps.authError);
            this.props.resetAuthState();
        }
    }

    onCodeChange = (text) => {
        this.props.codeChanged(text);
    };

    onRepeatedCodeChange = (text) => {
        this.props.repeatedCodeChanged(text);
    };

    onSavePress = () => {
        this.props.changeCode(
            this.props.code,
            this.props.repeatedCode, () => {
                this.props.navigation.pop();
            }
        );
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <Container style={container.signedInContainer}>
                    <AppHeader headerText={I18n.t('changeCodeHeader')}
                               infoText={I18n.t('changeCodeInfo')}
                               showBackButton={true}
                               onLeftButtonPress={() => {
                                   if (!this.props.changeLoading) {
                                       this.props.navigation.pop()
                                   }
                               }}/>

                    <ChangeCodeForm
                        code={this.props.code}
                        repeatedCode={this.props.repeatedCode}
                        onCodeChange={this.onCodeChange}
                        onRepeatedCodeChange={this.onRepeatedCodeChange}
                    />

                    <Separator/>

                    <Button rounded
                            onPress={() => {
                                if (!this.props.changeLoading || !this.props.authLoading) {
                                    this.onSavePress()
                                }
                            }}
                            style={[button.defaultButton, color.button]}
                    >
                        {this.props.changeLoading ? (
                            <Spinner color='#D0D0D0'/>) : (
                            <Text style={text.submitButtonText}>
                                {I18n.t('changeCodeSaveButton')}
                            </Text>
                        )}
                    </Button>
                </Container>
            </TouchableWithoutFeedback>
        );
    }
}

const mapStateToProps = ({auth}) => {
    return {
        code,
        repeatedCode,
        authError,
        changeLoading
    } = auth;
};

const mapDispatchToProps = {
    codeChanged,
    repeatedCodeChanged,
    changeCode,
    resetAuthState
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeCode);
