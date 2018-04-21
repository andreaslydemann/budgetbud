import React, {Component} from 'react';
import {
    Body,
    Button,
    Container,
    Icon,
    ListItem,
    Text,
    View,
    Label,
    Spinner
} from "native-base";
import {AppHeader, Separator, Toolbox} from "../../components/index";
import {FlatList, StyleSheet} from "react-native";
import {connect} from "react-redux";
import I18n from "../../strings/i18n";
import {
    container
} from "../../style/index";
import {getBudget} from "./budget_actions";
import {getCategories} from "../category/category_actions";
import {getDebts} from "../debt/debt_actions";

class MyBudget extends Component {
    componentWillMount() {
        if (!this.props.budgetInitialized)
            this.props.getBudget(this.props.budgetID);

        if (!this.props.categoriesInitialized)
            this.props.getCategories(this.props.budgetID);

        if (!this.props.debtsInitialized)
            this.props.getDebts(this.props.budgetID);
    }

    navigateUser = (destination) => {
        this.props.navigation.navigate(destination)
    };

    render() {
        return (
            <Container style={container.signedInContainer}>
                <AppHeader headerText={I18n.t('myBudgetHeader')}
                           onLeftButtonPress={
                               () => this.props.navigation.navigate("DrawerOpen")}
                />
                <Container>
                    <View style={{flex: 0.1, justifyContent: 'center'}}>
                        {this.props.budgetLoading ? (
                            <Spinner style={{
                                alignItems: 'center',
                                justifyContent: 'center'
                            }} color='#1c313a'/>) : (
                            <View style={styles.incomeFormStyle}>
                                <Text style={styles.listText}>{I18n.t('budgetIncome')}
                                </Text>
                                <Text style={styles.listText}>{this.props.income} {I18n.t('currency')}
                                </Text>
                            </View>
                        )}
                    </View>
                    <Separator/>

                    <View style={{flex: 0.7}}>
                        {this.props.categoriesLoading ? (
                            <Spinner style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1
                            }} color='#1c313a'/>) : (
                            <View style={{flex: 1, alignSelf: 'stretch', paddingTop: 20}}>
                                <View style={styles.incomeFormStyle}>
                                    <Label style={styles.textStyle}>
                                        {I18n.t('budgetExpenses')}
                                    </Label>
                                </View>
                                <FlatList
                                    data={this.props.categories}
                                    renderItem={this.renderCategory}
                                    keyExtractor={item => item.categoryTypeID}
                                />

                            </View>
                        )}

                        <Separator/>

                        {this.props.debts.length !== 0 &&
                        <View style={this.props.debts.length > 2 ?
                            {flex: 1, alignSelf: 'stretch', paddingTop: 20} :
                            {flex: 0.5, alignSelf: 'stretch', paddingTop: 20}}>
                            <View style={styles.incomeFormStyle}>
                                <Label style={styles.textStyle}>{I18n.t('budgetDebts')}</Label>
                            </View>
                            <FlatList
                                data={this.props.debts}
                                renderItem={this.renderDebt}
                                keyExtractor={item => item.id}
                            />
                            <Separator/>
                        </View>
                        }
                    </View>

                    <View style={{flex: 0.2}}>
                        <View style={styles.budgetSummary}>
                            <View style={[styles.incomeFormStyle, {paddingTop: '5%', flex: 1}]}>
                                <Text style={styles.listText}>
                                    {I18n.t('budgetTotalExpenses')}
                                </Text>
                                <Text style={styles.listText}>
                                    {this.props.totalGoalsAmount} {I18n.t('currency')}
                                </Text>
                            </View>

                            <View style={[styles.incomeFormStyle, {flex: 1}]}>
                                <Text style={styles.listText}>
                                    {I18n.t('budgetDisposable')}
                                </Text>
                                <Text style={styles.listText}>
                                    {this.props.disposable} {I18n.t('currency')}
                                </Text>
                            </View>

                            <Button transparent
                                    onPress={() => this.bottomModal.showModal()}
                                    style={[styles.buttonStyle, {flex: 1}]}
                            >
                                <Icon name="ios-arrow-dropup-circle"
                                      style={{color: "#00263A"}}/>
                            </Button>

                            <Toolbox
                                ref={(bottomModal) => {
                                    this.bottomModal = bottomModal
                                }}
                                navigateUser={this.navigateUser}
                            />
                        </View>
                    </View>
                </Container>
            </Container>
        );
    }

    renderCategory = ({item}) => {
        return (
            <ListItem style={{paddingRight: 18}}>
                <Body>
                <Text style={styles.listText}>{item.name}</Text>
                </Body>
                <Text style={[styles.listText, {justifyContent: 'flex-end'}]}>
                    {item.amount} {I18n.t('currency')}
                </Text>
            </ListItem>
        );
    };

    renderDebt = ({item}) => {
        return (
            <ListItem style={{paddingRight: 18}}>
                <Body>
                <Text style={styles.listText}>{item.debtData.name}</Text>
                </Body>
                <Text style={[styles.listText, {justifyContent: 'flex-end'}]}>
                    {item.debtData.amountPerMonth} {I18n.t('currency')}</Text>
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
    const {
        categories,
        categoriesLoading,
        totalGoalsAmount,
        categoriesInitialized
    } = state.category;

    const {
        debts,
        debtsInitialized
    } = state.debt;

    const {
        budgetLoading,
        income,
        destination,
        budgetID,
        budgetInitialized
    } = state.budget;

    const disposable = state.disposable.disposable;

    return {
        categories,
        budgetLoading,
        income,
        debts,
        totalGoalsAmount,
        disposable,
        destination,
        budgetID,
        categoriesLoading,
        budgetInitialized,
        categoriesInitialized,
        debtsInitialized
    }
};

export default connect(mapStateToProps, {
    getBudget, getCategories, getDebts
})(MyBudget);
