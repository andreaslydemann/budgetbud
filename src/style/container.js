import {StyleSheet, Platform, Dimensions} from 'react-native';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export const container = StyleSheet.create({
    parentBudgetSummary: {
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        width: '100%'
    },
    signedInContainer: {
        backgroundColor: "#ffffff",
    },
    signedOutContainer: {
        backgroundColor: "#03426A",
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    spacedTextWrapper: {
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    fullWidth: {
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
    defaultFormStyle: {
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
        justifyContent: 'center',
        marginHorizontal: 10
    },
    dialogButtonTextContainer: {
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },
    yCenteredFullSpan: {
        flex: 1,
        alignItems: 'center',
    },
    dialogButtonTextContainer2: {
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
    optionContainer: {
        flexShrink: 1,
        alignItems: 'flex-start',
        alignSelf: 'center',
        width: '80%',
        paddingTop: 13
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
    toastContainer: {
        height: 0,
        borderRadius: 100,
        marginBottom: 15
    },
    bodyContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
        width: 310
    },
    drawerCover: {
        alignSelf: "stretch",
        height: deviceHeight / 7.5,
        width: null,
        position: "relative",
        marginBottom: 10,
        backgroundColor: '#03426A'
    },
    drawerImage: {
        position: "absolute",
        left: deviceWidth / 18,
        top: deviceHeight / 23,
        width: 204,
        height: 46
    },
    modalButtonContainer: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
    },
    amountSummaryContainer: {
        paddingRight: 18,
        paddingLeft: 15,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    budgetSummary: {
        marginBottom: 0,
        justifyContent: 'space-between',
        flex: 1
    },
});
