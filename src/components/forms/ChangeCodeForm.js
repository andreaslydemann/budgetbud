import I18n from "../../strings/i18n";
import React, {Component} from 'react';
import {
    Container,
    Item,
    Label,
    Input,
    View
} from 'native-base';
import {
    color,
    container,
    input,
    text
} from "../../style/index";
import {renderInputIcon} from "../../helpers/index";

export class ChangeCodeForm extends Component {
    render() {
        return (
            <Container style={{flex: 4, justifyContent: 'flex-start'}}>
                <View style={[container.defaultFormStyle, {paddingTop: 10}]}>
                    <Label style={[text.defaultText, color.text]}>{I18n.t('changeCodeLabel')}</Label>
                    <Item rounded style={[input.inputField, color.input]}>
                        <Input
                            secureTextEntry={true}
                            value={this.props.code}
                            onChangeText={this.props.onCodeChange}
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
                            onChangeText={this.props.onRepeatedCodeChange}
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
        )
    }
}
