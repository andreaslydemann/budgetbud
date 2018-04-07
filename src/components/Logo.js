import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {Label} from 'native-base';
import {text, container} from "../style/";

export class Logo extends Component {
    render() {
        return (
            <View style={[container.parentContainer, {flex: 2}]}>
                <Image style={{width: 140, height: 140}}
                       source={require('../../assets/logo.png')}/>
                <View>
                    <Label style={text.logoText}>{this.props.logoText}</Label>
                </View>
            </View>
        )
    }
}
