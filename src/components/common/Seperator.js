import React from 'react';
import { View } from 'react-native';

const Seperator = (props) => {
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        height: 5,
        width: '100%',
        backgroundColor: '#999999'
    }
};

export {Seperator};