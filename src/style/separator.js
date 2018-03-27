import {StyleSheet} from 'react-native';

export const separator = StyleSheet.create({
    container: {
        height: 2,
        width: '100%',
        backgroundColor: '#777777',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 3 },
        shadowOpacity: 0.1,
        borderBottomColor: '#9c9c9c',
        borderBottomWidth: 2
    }
});