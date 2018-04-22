import React, {Component} from 'react';
import {
    Body,
    Container,
    Icon,
    ListItem,
    Text,
    View,
    Right,
    Spinner
} from "native-base";
import {AppHeader, Separator} from "../../components";
import {FlatList, StyleSheet, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import I18n from "../../strings/i18n";
import {color, container} from "../../style";
import {
    getCategoryAlarms,
    toggleCategoryAlarm,
    getExpensesOfMonth
} from "../../redux/actions";

class ExpenseOverview extends Component {
    async componentWillMount() {
        if (!this.props.categoryAlarmsInitialized)
            this.props.getCategoryAlarms(this.props.budgetID);

        if (!this.props.expensesInitialized)
            this.props.getExpensesOfMonth();
    }

    onAlarmPress = async ({categoryID}) => {
        if (!this.props.toggleLoading)
            this.props.toggleCategoryAlarm(categoryID, this.props.budgetID)
    };

    render() {
        return (
            <Container style={container.signedInContainer}>
                <AppHeader headerText={I18n.t('expenseOverviewHeader')}
                           onLeftButtonPress={() => this.props.navigation.navigate("DrawerOpen")}/>
                <Container>
                    {this.props.expensesLoading ? (
                        <Spinner style={{
                            flex: 1
                        }} color='#1c313a'/>) : (
                        <Container>
                            <View style={{flex: 0.82}}>
                                <FlatList
                                    data={this.props.categoryItems}
                                    renderItem={this.renderCategory}
                                    keyExtractor={item => item.categoryID}
                                />
                                <Separator/>
                            </View>
                            <View style={{flex: 0.18}}>
                                <View style={[styles.budgetSummary, {paddingVertical: '5%',}]}>
                                    <View style={[styles.incomeFormStyle, {flex: 1}]}>
                                        <Text style={styles.listText}>
                                            {I18n.t('expenseOverviewTotalDebtsPerMonth')}
                                        </Text>
                                        <Text style={styles.listText}>
                                            {this.props.totalDebtPerMonth} {I18n.t('currency')}
                                        </Text>
                                    </View>
                                    <View style={[styles.incomeFormStyle, {flex: 1}]}>
                                        <Text style={styles.listText}>
                                            {I18n.t('expenseOverviewTotalExpenses')}
                                        </Text>
                                        <Text style={styles.listText}>
                                            {this.props.totalExpenses} {I18n.t('currency')}
                                        </Text>
                                    </View>
                                    <View style={[styles.incomeFormStyle, {flex: 1}]}>
                                        <Text style={styles.listText}>
                                            {I18n.t('expenseOverviewDisposable')}
                                        </Text>
                                        <Text style={styles.listText}>
                                            {this.props.disposable} {I18n.t('currency')}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </Container>
                    )}
                </Container>
            </Container>
        );
    }

    renderCategory = ({item}) => {
        const notificationsEnabled = this.props.categoryAlarms.includes(item.categoryID);

        return (
            <ListItem>
                <View style={{width: '100%', paddingHorizontal: 4}}>
                    <View style={[container.removeIndenting, {flexDirection: 'row'}]}>
                        <Body style={{alignItems: 'flex-start'}}>
                        <Text style={color.text}>{item.name}</Text>
                        </Body>
                        <Right>
                            <TouchableOpacity onPress={() => this.onAlarmPress(item)}>
                                <Icon style={[color.darkIcon, {fontSize: 26}]}
                                      name={notificationsEnabled ? "ios-notifications" : "ios-notifications-outline"}/>
                            </TouchableOpacity>
                        </Right>
                    </View>
                    <View style={[container.removeIndenting, {flexDirection: 'row'}]}>
                        <Body style={{alignItems: 'flex-start'}}>
                        <Text style={{color: '#808080'}}>{I18n.t('expenseOverviewBudget')}</Text>
                        <Text style={{color: '#808080'}}>{I18n.t('expenseOverviewExpenses')}</Text>
                        <Text style={{color: '#808080'}}>{I18n.t('expenseOverviewRemaining')}</Text>
                        </Body>
                        <Right>
                            <Text style={{color: '#808080'}}>{item.budget} {I18n.t('currency')}</Text>
                            <Text style={{color: '#808080'}}>{item.expenses} {I18n.t('currency')}</Text>
                            <Text
                                style={((item.budget - item.expenses) < 0 ? {color: '#EB7C83'} :
                                    {color: '#808080'})}>{item.budget - item.expenses} {I18n.t('currency')}
                            </Text>
                        </Right>
                    </View>
                </View>
            </ListItem>
        );
    };
}

const styles = StyleSheet.create({
    buttonStyle: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        paddingBottom: 10
    },
    incomeFormStyle: {
        alignSelf: 'center',
        width: '100%',
        paddingRight: 18,
        paddingLeft: 15,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    expenseListStyle: {
        alignSelf: 'center',
        width: '90%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 23
    },
    itemStyle: {
        fontWeight: '600',
        alignSelf: 'flex-start',
        color: 'white'
    },
    spacedText: {
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: '5%',
        marginVertical: 10
    },
    budgetSummary: {
        marginBottom: 0,
        justifyContent: 'space-between',
        flex: 1
    },
    textStyle: {
        fontWeight: '400',
        fontSize: 14,
        alignSelf: 'flex-start',
        marginLeft: 5,
        color: '#00263A'
    },
    listText: {
        marginLeft: 5,
        alignSelf: 'flex-start',
        fontSize: 16,
        color: '#00263A'
    },
    modalButton: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = (state) => {
    const {budgetID} = state.budget;
    const {debts} = state.debt;
    const {expenses, totalExpenses, expensesLoading, expensesInitialized} = state.expense;
    const disposable = state.disposable.disposable;
    const {categories} = state.category;
    const {categoryAlarms, toggleLoading, categoryAlarmsInitialized} = state.alarm;

    let totalDebtPerMonth = 0;
    debts.forEach(d => totalDebtPerMonth += d.debtData.amountPerMonth);

    const categoryItems = [];

    categories.forEach(category => {
        const index = expenses.findIndex(x => x.categoryTypeID === category.categoryTypeID);

        if (index !== -1) {
            categoryItems.push({
                categoryID: category.categoryID,
                name: category.name,
                budget: category.amount,
                expenses: expenses[index].amount,
                notificationsEnabled: false
            });
        }
    });

    return {
        budgetID,
        categoryAlarms,
        toggleLoading,
        totalDebtPerMonth,
        disposable,
        expenses,
        totalExpenses,
        expensesLoading,
        categoryItems,
        expensesInitialized,
        categoryAlarmsInitialized
    }
};

export default connect(mapStateToProps, {
    getExpensesOfMonth, getCategoryAlarms, toggleCategoryAlarm
})(ExpenseOverview);
