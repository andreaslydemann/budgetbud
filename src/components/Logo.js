import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {Container, Label} from 'native-base';
import {text, container} from "../style/";
import I18n from "../strings/i18n";

export class Logo extends Component {
    render() {
        return (
            <Container style={[container.parentContainer, {flex: 2}]}>
                <Image style={{width: 140, height: 140}}
                       source={require('../../assets/logo.png')}/>
                <View>
                    <Label style={text.logoText}>{I18n.t('signInLogoWelcome')}</Label>
                </View>
            </Container>
        )
    }
}