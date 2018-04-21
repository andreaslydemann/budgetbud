import I18n from "../strings/i18n";
import React, {Component} from "react";
import {View} from "react-native";
import {
    Button,
    Container,
    Input,
    Item,
    Label,
    Spinner
} from "native-base";
import {button, color, container, input, text} from "../style";
import {renderInputIcon} from "../helpers";

export class ChangeForgottenCodeForm extends Component {
    render() {
        return (
            <Container style={[container.parentContainer, {flex: 1}]}>
                <View style={{width: '80%'}}>
                    <Item rounded style={input.authInputItem}>
                        <Input
                            secureTextEntry={true}
                            value={this.props.code}
                            onChangeText={this.props.onCodeChange}
                            keyboardType="numeric"
                            maxLength={4}
                            placeholder={I18n.t('changeForgottenCodeCodePlaceholder')}
                            placeholderTextColor='rgba(255,255,255,0.6)'
                            style={color.white}
                        />
                        {renderInputIcon(this.props.code, 4)}
                    </Item>

                    <Item rounded style={input.authInputItem}>
                        <Input
                            secureTextEntry={true}
                            value={this.props.repeatedCode}
                            onChangeText={this.props.onRepeatedCodeChange}
                            keyboardType="numeric"
                            maxLength={4}
                            placeholder={I18n.t('changeForgottenCodeRepeatedCodePlaceholder')}
                            placeholderTextColor='rgba(255,255,255,0.6)'
                            style={color.white}
                        />
                        {renderInputIcon(this.props.repeatedCode, 4)}
                    </Item>

                    <Button rounded
                            onPress={() => {
                                if (!this.props.changeLoading)
                                    this.props.handleSubmit()
                            }}
                            style={button.authButton}
                    >
                        {this.props.changeLoading ? (
                            <Spinner color='#D0D0D0'/>) : (
                            <Label style={text.submitButtonText}>
                                {I18n.t('changeCodeSaveButton')}
                            </Label>
                        )}
                    </Button>
                </View>
            </Container>
        )
    }
}
