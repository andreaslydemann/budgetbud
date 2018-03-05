import React, {Component} from 'react';
import {View} from 'react-native';
import {Label, Icon} from 'native-base';

class ErrorInfo extends Component {
    renderError() {
        if (this.props.error) {
            return (
                <View style={styles.errorContainer}>
                    <Icon name='warning' style={styles.warningIcon}/>
                    <Label style={styles.errorTextStyle}>
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
        )
    }
}

const styles = {
    errorContainer: {
        width: '80%',
        height: 20,
        marginBottom: 12,
        paddingVertical: 15,
        borderRadius: 25,
        backgroundColor: 'rgba(255, 255,255,0.2)',
        alignSelf: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row'
    },
    errorTextStyle: {
        color: '#fff800'
    },
    warningIcon: {
        paddingLeft: 12,
        paddingRight: 5,
        color: '#fff800'
    }
};

export default ErrorInfo;
