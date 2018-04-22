import {StyleSheet, Platform, Dimensions} from 'react-native';

const deviceHeight = Dimensions.get("window").height;

export const text = StyleSheet.create({
    listText: {
        alignSelf: 'flex-start',
        marginLeft: 5,
        fontSize: 16
    },
    defaultText: {
        fontWeight: '400',
        fontSize: 14,
        alignSelf: 'flex-start',
        marginLeft: 5,
    },
    textCenter: {
        textAlign: 'center'
    },
    dialogButtonText: {
        color: '#fff',
        ...Platform.select({
            android: {
                fontSize: 16
            }
        })
    },
    logoText: {
        marginTop: 20,
        marginBottom: Platform.OS === "android" ? deviceHeight / 10 : deviceHeight / 18,
        color: 'rgba(255, 255, 255, 1)'
    },
    submitButtonText: {
        fontWeight: '600',
        alignSelf: 'center',
        color: 'white'
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 26,
        alignSelf: 'center',
        color: '#002940'
    },
    bodyText: {
        fontWeight: 'bold',
        fontSize: 17
    },
    sideBarText: {
        fontWeight: Platform.OS === "ios" ? "500" : "400",
        fontSize: 16,
        marginLeft: 20
    }
});
