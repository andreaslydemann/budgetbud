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
import {FlatList, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import I18n from "../../strings/i18n";
import {color, container, text} from "../../style";
import {
    getCategoryAlarms,
    toggleCategoryAlarm,
    getExpensesOfMonth,
    resetExpensesError
} from "../../redux/actions";
import {showWarningToast} from "../../helpers/toasts";

class ExpenseOverview extends Component {
    componentWillMount() {
        if (!this.props.categoryAlarmsInitialized)
            this.props.getCategoryAlarms(this.props.budgetID);

        if (!this.props.expensesInitialized)
            this.props.getExpensesOfMonth();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.expensesError) {
            showWarningToast(nextProps.expensesError);
            this.props.resetExpensesError();
        }
    }

    onAlarmPress = async ({categoryID}) => {
        this.props.toggleCategoryAlarm(categoryID, this.props.budgetID)
    };

    render() {
        return (
            <Container style={container.signedInContainer}>
                <AppHeader headerText={I18n.t('expenseOverviewHeader')}
                           infoText={I18n.t('expenseOverviewInfo')}
                           onLeftButtonPress={() => this.props.navigation.navigate("DrawerOpen")}/>
                <Container>
                    {((this.props.expensesLoading || this.props.alarmsLoading)
                        && (!this.props.expensesInitialized && !this.props.categoriesInitialized)) ? (
                        <Spinner style={{
                            flex: 1
                        }} color='#1c313a'/>) : (
                        <Container>
                            <View style={{flex: 0.82}}>
                                <FlatList
                                    data={this.props.categoryItems}
                                    renderItem={this.renderCategory}
                                    keyExtractor={item => item.categoryID}
                                    refreshing={this.props.expensesLoading}
                                    onRefresh={() => this.props.getExpensesOfMonth()}
                                />
                                <Separator/>
                            </View>
                            <View style={{flex: 0.18}}>
                                <View style={[container.budgetSummary, {paddingVertical: '5%',}]}>
                                    <View style={[container.amountSummaryContainer, {flex: 1}]}>
                                        <Text style={[text.listText, color.text]}>
                                            {I18n.t('expenseOverviewTotalDebtsPerMonth')}
                                        </Text>
                                        <Text style={[text.listText, color.text]}>
                                            {this.props.totalDebtPerMonth} {I18n.t('currency')}
                                        </Text>
                                    </View>
                                    <View style={[container.amountSummaryContainer, {flex: 1}]}>
                                        <Text style={[text.listText, color.text]}>
                                            {I18n.t('expenseOverviewTotalExpenses')}
                                        </Text>
                                        <Text style={[text.listText, color.text]}>
                                            {this.props.totalExpenses} {I18n.t('currency')}
                                        </Text>
                                    </View>
                                    <View style={[container.amountSummaryContainer, {flex: 1}]}>
                                        <Text style={[text.listText, color.text]}>
                                            {I18n.t('expenseOverviewDisposable')}
                                        </Text>
                                        <Text style={[text.listText, color.text]}>
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
                            <TouchableOpacity onPress={() => {
                                if (!this.props.toggleLoading)
                                    this.onAlarmPress(item)
                            }}>
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

const mapStateToProps = (state) => {
    const {budgetID} = state.budget;
    const {debts} = state.debt;
    const {
        expenses,
        totalExpenses,
        expensesLoading,
        expensesInitialized,
        expensesError
    } = state.expense;
    const disposable = state.disposable.disposable;
    const {categories} = state.category;
    const {categoryAlarms, toggleLoading, alarmsLoading, categoryAlarmsInitialized} = state.alarm;

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
        categoryAlarmsInitialized,
        expensesError,
        alarmsLoading
    }
};

export default connect(mapStateToProps, {
    getExpensesOfMonth,
    getCategoryAlarms,
    toggleCategoryAlarm,
    resetExpensesError
})(ExpenseOverview);
