import React, {PureComponent} from 'react';
import {Keyboard, TouchableWithoutFeedback} from "react-native";
import {connect} from 'react-redux';
import {AppHeader, Separator} from "../components/";
import {
    Container,
    Text,
    Spinner,
    Button,
    Item,
    Label,
    Input,
    View
} from 'native-base';
import I18n from "../strings/i18n";
import {
    codeChanged,
    repeatedCodeChanged,
    changeCode,
    resetAuthState
} from "../actions";
import {renderInputIcon} from "../helpers/validators";
import {
    button,
    text,
    container,
    color,
    input
} from "../style";
import {showWarningToast} from "../helpers/toasts";

class ChangeCode extends PureComponent {
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
                               showBackButton={true}
                               onLeftButtonPress={() => {
                                   if (!this.props.changeLoading) {
                                       this.props.navigation.pop()
                                   }
                               }}/>

                    <Container style={{flex: 4, justifyContent: 'flex-start'}}>
                        <View style={[container.defaultFormStyle, {paddingTop: 10}]}>
                            <Label style={[text.defaultText, color.text]}>{I18n.t('changeCodeLabel')}</Label>
                            <Item rounded style={[input.inputField, color.input]}>
                                <Input
                                    secureTextEntry={true}
                                    value={this.props.code}
                                    onChangeText={this.onCodeChange}
                                    keyboardType="numeric"
                                    maxLength={4}
                                    placeholder={I18n.t('changeCodePlaceholder')}
                                    placeholderTextColor='#7F9BAA'
                                    style={color.text}
                                />
                                {renderInputIcon(this.props.code, 4)}
                            </Item>
                        </View>

                        <View style={[container.defaultFormStyle, {paddingTop: 10}]}>
                            <Label style={[text.defaultText, color.text]}>{I18n.t('changeRepeatedCodeLabel')}</Label>
                            <Item rounded style={[input.inputField, color.input]}>
                                <Input
                                    secureTextEntry={true}
                                    value={this.props.repeatedCode}
                                    onChangeText={this.onRepeatedCodeChange}
                                    keyboardType="numeric"
                                    maxLength={4}
                                    placeholder={I18n.t('changeCodePlaceholder')}
                                    placeholderTextColor='#7F9BAA'
                                    style={color.text}
                                />
                                {renderInputIcon(this.props.repeatedCode, 4)}
                            </Item>
                        </View>
                    </Container>

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
