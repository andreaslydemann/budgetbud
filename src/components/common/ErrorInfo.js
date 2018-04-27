import React, {Component} from 'react';
import {View} from 'react-native';
import {Label, Icon} from 'native-base';
import {container, color, icon} from "../../style/index";

export class ErrorInfo extends Component {
    renderError() {
        if (this.props.error) {
            return (
                <View style={container.errorContainer}>
                    <Icon name='warning' style={icon.warningIcon}/>
                    <Label style={color.yellow}>
                        {this.props.error}
                    </Label>
                </View>
            );
        }
    };

    render() {
        return (
            <View>
                {this.renderError()}
            </View>
        );
    }
}