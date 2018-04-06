import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {Container, Label} from 'native-base';
import {text, container} from "../style/";
import I18n from "../strings/i18n";

export class Logo extends Component {
    render() {
        return (
            <View style={[container.parentContainer]}>
                <Image style={{width: 140, height: 140}}
                       source={require('../../assets/logo.png')}/>
                <View>
                    <Label style={text.logoText}>{this.props.logoText}</Label>
                </View>
            </View>
        )
    }
}
