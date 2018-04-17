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

export class AuthForm extends Component {
    render() {
        return (
            <Container style={[container.parentContainer, {flex: 1}]}>
                <View style={{width: '80%'}}>
                    <Item rounded style={input.authInputItem}>
                        <Input value={this.props.cprNumber}
                               onChangeText={this.props.onCprNumberChange}
                               keyboardType="numeric"
                               maxLength={10}
                               placeholder={I18n.t('signInCprNumberPlaceholder')}
                               placeholderTextColor='rgba(255,255,255,0.6)'
                               style={color.white}
                        />
                        {renderInputIcon(this.props.cprNumber, 10)}
                    </Item>

                    <Item rounded style={input.authInputItem}>
                        <Input secureTextEntry={this.props.isSignIn}
                               value={this.props.secondInput}
                               onChangeText={this.props.onSecondInputChange}
                               keyboardType="numeric"
                               maxLength={this.props.isSignIn ? 4 : 8}
                               placeholder={this.props.isSignIn ?
                                   I18n.t('signInCodePlaceholder') : I18n.t('signUpPhoneNumberPlaceholder')}
                               placeholderTextColor='rgba(255,255,255,0.6)'
                               style={color.white}
                        />
                        {renderInputIcon(this.props.secondInput, (this.props.isSignIn ? 4 : 8))}
                    </Item>

                    <Button rounded
                            onPress={this.props.handleSubmit}
                            style={button.authButton}
                    >
                        {this.props.authLoading ? (
                            <Spinner color='#D0D0D0'/>) : (
                            <Label style={color.white}>
                                {this.props.isSignIn ?
                                    I18n.t('signInButton') : I18n.t('signUpButton')}
                            </Label>
                        )}
                    </Button>
                </View>
            </Container>
        );
    }
}
