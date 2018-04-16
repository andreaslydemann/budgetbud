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
import {AppHeader, Separator} from "../components/";
import {FlatList, StyleSheet} from "react-native";
import {connect} from "react-redux";
import {getBudget, getCategories, getDebts} from "../actions";
import I18n from "../strings/i18n";
import {color, container} from "../style";

class ExpenseOverview extends Component {
    componentWillMount() {
        this.props.getBudget(this.props.budgetID);
        this.props.getCategories(this.props.budgetID);
    }

    navigateUser = (destination) => {
        this.props.navigation.navigate(destination)
    };

    render() {
        return (
            <Container style={container.signedInContainer}>
                <AppHeader headerText={I18n.t('expenseOverviewHeader')}
                           onLeftButtonPress={() => this.props.navigation.navigate("DrawerOpen")}/>
                <Container>
                    {this.props.budgetLoading ? (
                        <Spinner style={{
                            flex: 1
                        }} color='#1c313a'/>) : (
                        <Container>
                            <View style={{flex: 0.82}}>
                                <FlatList
                                    data={this.props.items}
                                    renderItem={this.renderCategory}
                                    keyExtractor={item => item.name}
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
                                            {this.props.disposable} {I18n.t('currency')}
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
        return (
            <ListItem>
                <View style={{width: '100%', paddingHorizontal: 4}}>
                    <View style={[container.removeIndenting, {flexDirection: 'row'}]}>
                        <Body style={{alignItems: 'flex-start'}}>
                        <Text style={color.text}>{item.name}</Text>
                        </Body>
                        <Right>
                            {item.notificationsEnabled ?
                                (<Icon style={[color.darkIcon, {fontSize: 26}]} name="ios-notifications"/>) :
                                (<Icon style={[color.darkIcon, {fontSize: 26}]} name="ios-notifications-outline"/>)}
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
                            <Text style={{color: '#808080'}}>{item.spending} {I18n.t('currency')}</Text>
                            <Text
                                style={((item.budget - item.spending) < 0 ? {color: '#EB7C83'} :
                                    {color: '#808080'})}>{item.budget - item.spending} {I18n.t('currency')}
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
        paddingLeft: 14,
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
    const {debts} = state.debt;

    let totalDebtPerMonth = 0;
    debts.forEach(d => totalDebtPerMonth += d.debtData.amountPerMonth);

    const {
        budgetLoading,
        income,
        totalExpenses,
        destination,
        budgetID
    } = state.budget;

    const disposable = state.disposable.disposable;

    const items = [{
        name: 'Dagligvarer',
        budget: 150,
        spending: 300,
        notificationsEnabled: false
    }, {
        name: 'Transport',
        budget: 1220,
        spending: 1500,
        notificationsEnabled: true
    }, {
        categoryID: 12,
        name: 'Bolig',
        budget: 1750,
        spending: 100,
        notificationsEnabled: false
    },
    ];

    return {
        totalDebtPerMonth,
        items,
        budgetLoading,
        income,
        totalExpenses,
        disposable,
        destination,
        budgetID
    }
};

export default connect(mapStateToProps, {
    getBudget, getCategories, getDebts
})(ExpenseOverview);
