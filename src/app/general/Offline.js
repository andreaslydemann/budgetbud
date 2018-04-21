import React, {Component} from 'react';
import {View, Image} from 'react-native';
import {Container, Label} from "native-base";
import {container, text} from "../../style/index";
import I18n from "../../strings/i18n";

class Offline extends Component {
    render() {
        return (
            <Container style={container.signedOutContainer}>
                <Image style={{width: 200, height: 200}}
                       source={require('../../../assets/logo.png')}/>
                <View>
                    <Label style={text.logoText}>{I18n.t('noConnection')}</Label>
                </View>
            </Container>
        );
    }
}

export default Offline;
