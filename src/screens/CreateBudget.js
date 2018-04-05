import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import {Container} from 'native-base';
import {connect} from 'react-redux';
import {BudgetForm, AppHeader} from "../components/";
import I18n from "../strings/i18n";
import {
    incomeChanged,
    categoryChanged,
    createBudget,
    getLinkedAccounts,
    mapExpensesToBudget
} from '../actions';

class CreateBudget extends Component {
    async componentWillMount() {
        await this.props.getLinkedAccounts();
        await this.props.mapExpensesToBudget(this.props.accounts);
    };

    onIncomeChange = (text) => {
        this.props.incomeChanged(text);
    };

    onCategoryChange = (amount, name) => {
        this.props.categoryChanged(amount, name);
    };

    handleSubmit = () => {
        Keyboard.dismiss();

        this.props.createBudget(this.props, () => {
            this.props.navigation.navigate('MyBudget');
        });
    };

    render() {
        return (
            <Container style={[{alignItems: 'stretch'}]}>
                <AppHeader headerText={I18n.t('createBudgetHeader')}
                           onLeftButtonPress={
                               () => this.props.navigation.navigate("DrawerOpen")}
                />

                <BudgetForm handleSubmit={this.handleSubmit}
                            onIncomeChanged={this.onIncomeChange}
                            onCategoryChanged={this.onCategoryChange}
                            income={this.props.income}
                            totalExpenses={this.props.totalExpenses}
                            disposable={this.props.disposable}
                            categories={this.props.categories}
                            debts={this.props.debts}
                            loading={this.props.loading}
                            error={this.props.error}
                />
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        income,
        debts,
        totalExpenses,
        disposable,
        loading,
        error
    } = state.budget;

    const {categories, accounts} = state.account;

    return {
        income,
        categories,
        accounts,
        debts,
        totalExpenses,
        disposable,
        loading,
        error
    };
};

const mapDispatchToProps = {
    createBudget,
    incomeChanged,
    categoryChanged,
    getLinkedAccounts,
    mapExpensesToBudget
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBudget);
