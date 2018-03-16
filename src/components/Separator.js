import React from 'react';
import { View } from 'react-native';

const Separator = (props) => {
    return (
        <View style={styles.containerStyle}>
            {props.children}
        </View>
    );
};

const styles = {
    containerStyle: {
        height: 2,
        width: '100%',
        backgroundColor: '#777777',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.1,
        borderBottomColor: '#9c9c9c',
        borderBottomWidth: 2
    }
};

export default Separator;
