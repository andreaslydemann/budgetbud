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
        backgroundColor: '#999999',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
        borderBottomColor: '#001',
        borderBottomWidth: 2
    }
};

export default Separator;
