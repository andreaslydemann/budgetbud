import React, {Component} from 'react';
import {container, color, button, input} from "../../style/index";
import {
    Container,
    Item,
    Input,
    Button,
    Label,
    Spinner,
    View
} from 'native-base';
import I18n from "../../strings/i18n";
import {renderInputIcon} from "../../helpers/index";

export class ActivationCodeForm extends Component {
    render() {
        const maxLength = this.props.isRequestActivationCode ? 10 : 4;

        return (
            <Container style={[container.parentContainer, {flex: 0.2}]}>
                <View style={{width: '80%'}}>
                    <Item rounded style={input.authInputItem}>
                        <Input secureTextEntry={!this.props.isRequestActivationCode}
                               value={this.props.inputValue}
                               onChangeText={this.props.onInputValueChange}
                               keyboardType="numeric"
                               maxLength={maxLength}
                               placeholder={this.props.isRequestActivationCode ?
                                   I18n.t('requestActivationCprNumberPlaceholder') :
                                   I18n.t('verifyActivationCprNumberPlaceholder')}
                               placeholderTextColor='rgba(255,255,255,0.6)'
                               style={color.white}
                        />
                        {renderInputIcon(this.props.inputValue, maxLength)}
                    </Item>

                    <Button rounded
                            onPress={() => {
                                if (!this.props.authLoading)
                                    this.props.handleSubmit()
                            }}
                            style={button.authButton}
                    >
                        {this.props.authLoading ? (
                            <Spinner color='#D0D0D0'/>) : (
                            <Label style={color.white}>{I18n.t('requestActivationCodeNextButton')}
                            </Label>
                        )}
                    </Button>
                </View>
            </Container>
        );
    }
}
