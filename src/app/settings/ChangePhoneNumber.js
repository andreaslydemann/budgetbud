import React, {PureComponent} from 'react';
import {Keyboard, TouchableWithoutFeedback} from "react-native";
import {connect} from 'react-redux';
import {AppHeader, Separator} from "../../components";
import {
    Container,
    Text,
    Spinner,
    Button,
    Item,
    Label,
    Input,
} from 'native-base';
import I18n from "../../strings/i18n";
import {renderInputIcon} from "../../helpers";
import {
    button,
    text,
    container,
    color,
    input
} from "../../style";
import {showWarningToast} from "../../helpers";
import {
    changePhoneNumber,
    getPhoneNumber,
    phoneNumberChanged,
    resetAuthError
} from "../../redux/actions";

class ChangePhoneNumber extends PureComponent {
    componentWillMount() {
        if (!this.props.phoneNumberInitialized)
            this.props.getPhoneNumber();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.authError) {
            showWarningToast(nextProps.authError);
            this.props.resetAuthError();
        }
    }

    onPhoneNumberChange = (text) => {
        this.props.phoneNumberChanged(text);
    };

    onSavePress = () => {
        this.props.changePhoneNumber(
            this.props.phoneNumber, () => {
                this.props.navigation.pop();
            }
        );
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <Container style={container.signedInContainer}>
                    <AppHeader headerText={I18n.t('changePhoneNumberHeader')}
                               infoText={I18n.t('changePhoneNumberInfo')}
                               showBackButton={true}
                               onLeftButtonPress={() => {
                                   if (!this.props.changeLoading) {
                                       this.props.navigation.pop()
                                   }
                               }}/>

                    <Container style={{flex: 4, justifyContent: 'center'}}>
                        {this.props.authLoading ? (
                            <Spinner style={{
                                alignItems: 'center',
                                justifyContent: 'center'
                            }} color='#1c313a'/>) : (
                            <Container style={[container.defaultFormStyle, {paddingTop: 10}]}>
                                <Label style={[text.defaultText, color.text]}>{I18n.t('changePhoneNumberLabel')}</Label>
                                <Item rounded style={[input.inputField, color.input]}>
                                    <Input
                                        value={String(this.props.phoneNumber)}
                                        onChangeText={this.onPhoneNumberChange}
                                        keyboardType="numeric"
                                        maxLength={8}
                                        placeholder={I18n.t('changePhoneNumberPlaceholder')}
                                        placeholderTextColor='#7F9BAA'
                                        style={color.text}
                                    />
                                    {renderInputIcon(this.props.phoneNumber, 8)}
                                </Item>
                            </Container>)}
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
                                {I18n.t('changePhoneNumberSaveButton')}
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
        phoneNumber,
        authError,
        authLoading,
        changeLoading,
        phoneNumberInitialized
    } = auth;
};

const mapDispatchToProps = {
    phoneNumberChanged,
    getPhoneNumber,
    changePhoneNumber,
    resetAuthError
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePhoneNumber);
