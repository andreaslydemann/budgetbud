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
import {codeChanged} from "../actions";
import {renderInputIcon} from "../helpers/validators";
import {
    button,
    text,
    container,
    color,
    input
} from "../style";

class ChangeCode extends PureComponent {
    onCodeChange = (text) => {
        this.props.codeChanged(text);
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <Container style={container.signedInContainer}>
                    <AppHeader headerText={I18n.t('changeCodeHeader')}
                               showBackButton={true}
                               onLeftButtonPress={() => this.props.navigation.pop()}/>

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
                            <Label style={[text.defaultText, color.text]}>{I18n.t('changeCodeRepeatLabel')}</Label>
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
                    </Container>

                    <Separator/>

                    <Button rounded
                            onPress={() => {
                                if (!this.props.changeLoading) {
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
        authError,
        authLoading,
        changeLoading
    } = auth;
};

const mapDispatchToProps = {
    codeChanged
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeCode);
