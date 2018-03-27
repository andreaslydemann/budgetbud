import React, {Component} from 'react';
import {container, color, button, input} from "../style/";
import {
    Container,
    Item,
    Input,
    Button,
    Label,
    Spinner,
    Icon,
    View
} from 'native-base';
import I18n from "../strings/i18n";

export class AuthForm extends Component {
    renderCprNumberIcon() {
        if (0 < this.props.cprNumber.length && this.props.cprNumber.length < 10)
            return (<Icon name='close-circle' style={{color: '#db000e'}}/>);
        else if (this.props.cprNumber.length === 10)
            return (<Icon name='checkmark-circle' style={{color: '#00d219'}}/>);
    }

    renderSecondInputIcon() {
        const correctLength = this.props.isSignIn ? 4 : 8;

        if (0 < this.props.secondInput.length && this.props.secondInput.length < correctLength)
            return (<Icon name='close-circle' style={{color: '#db000e'}}/>);
        else if (this.props.secondInput.length === correctLength)
            return (<Icon name='checkmark-circle' style={{color: '#00d219'}}/>);
    }

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
                        {this.renderCprNumberIcon()}
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
                        {this.renderSecondInputIcon()}
                    </Item>

                    <Button rounded
                            onPress={this.props.handleSubmit}
                            style={button.authButton}
                    >
                        {this.props.loading ? (
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