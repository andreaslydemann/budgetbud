import React, {Component} from 'react';
import {container, color, button, input} from "../style/";
import {
    Container,
    Item,
    Input,
    Button,
    Label,
    Spinner,
    View
} from 'native-base';
import I18n from "../strings/i18n";
import {renderInputIcon} from "../helpers/validators";

export class ActivationCodeForm extends Component {
    render() {
        const maxLength = this.props.isSendActivationCode ? 10 : 4;

        return (
            <Container style={[container.parentContainer, {flex: 0.2}]}>
                <View style={{width: '80%'}}>
                    <Item rounded style={input.authInputItem}>
                        <Input value={this.props.inputValue}
                               onChangeText={this.props.onInputValueChange}
                               keyboardType="numeric"
                               maxLength={maxLength}
                               placeholder={this.props.isSendActivationCode ?
                                   I18n.t('sendActivationCprNumberPlaceholder') :
                                   I18n.t('verifyActivationCprNumberPlaceholder')}
                               placeholderTextColor='rgba(255,255,255,0.6)'
                               style={color.white}
                        />
                        {renderInputIcon(this.props.inputValue, maxLength)}
                    </Item>

                    <Button rounded
                            onPress={this.props.handleSubmit}
                            style={button.authButton}
                    >
                        {this.props.authLoading ? (
                            <Spinner color='#D0D0D0'/>) : (
                            <Label style={color.white}>{I18n.t('sendActivationCodeNextButton')}
                            </Label>
                        )}
                    </Button>
                </View>
            </Container>
        );
    }
}
