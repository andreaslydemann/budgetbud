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
        height: 5,
        width: '100%',
        backgroundColor: '#999999',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    }
};

export default Separator;
