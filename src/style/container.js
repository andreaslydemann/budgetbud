import {StyleSheet, Platform} from 'react-native';

export const container = StyleSheet.create({
    parenBudgetSummary: {
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        width: '100%'
    },
    spacedTextWrapper: {
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    fullWidth: {
        width: '100%'
    },
    removeIndenting: {
        marginHorizontal: 0,
        padding: 0,
    },
    spacedTextChild: {
        alignSelf: 'center',
        width: '90%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: '3%'
    },
    incomeFormStyle: {
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 5,
        width: '90%'
    },
    parentContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    iosElevation: {
        ...Platform.select({
            ios: {
                zIndex: 1,
            }
        }),
    },
    androidMargin: {
        ...Platform.select({
            android: {
                marginTop: 24,
            }
        }),
    },
    xyCenteredFullSpan: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dialogButtonTextContainer: {
        backgroundColor: '#002940',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },
    yCenteredFullSpan: {
        flex: 1,
        alignItems: 'center',
    },
    dialogButtonTextContainer2: { //TODO
        backgroundColor: '#002940',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderRightColor: '#fff',
        borderRightWidth: 1
    },
    justifyCenter: {
        justifyContent: 'center'
    },
    flexRow: {
        flexDirection: 'row',
        flex: 1
    },
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
});
