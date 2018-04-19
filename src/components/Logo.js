import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {Label} from 'native-base';
import {text} from "../style/";

export class Logo extends Component {
    render() {
        return (
            <View style={{alignItems: 'center'}}>
                <Image style={{width: 140, height: 140}}
                       source={require('../../assets/logo.png')}/>
                <View style={{alignItems: 'center', width: '80%'}}>
                    <Label style={text.logoText}>{this.props.logoText}</Label>
                </View>
            </View>
        )
    }
}
