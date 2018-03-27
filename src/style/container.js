import {StyleSheet} from 'react-native';

const container = StyleSheet.create({
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
    removeIndenting: {
        marginLeft: 0,
        marginRight: 0,
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
    }
});

export default container;
