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
        await this.props.mapExpensesToBudget(this.props.linkedAccounts);
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

    checkInput = (income, categories) => {
        let allowedRegex = /^[+-]?(?=.)(?:\d+,)*\d*(?:\.\d+)?$/;
        if (!allowedRegex.test(income))
            return false;

        categories.forEach(c => {
            if (!allowedRegex.test(c.amount))
                return false;
        });
        return true;
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
                            checkInput={this.checkInput}
                            income={this.props.income}
                            totalExpenses={this.props.totalExpenses}
                            disposable={this.props.disposable}
                            categories={this.props.categories}
                            debts={this.props.debts}
                            loading={this.props.loading}
                            error={this.props.error}
                            linkLoading={this.props.linkLoading}
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

    const {categories, linkedAccounts, linkLoading} = state.account;

    return {
        income,
        categories,
        linkedAccounts,
        debts,
        totalExpenses,
        disposable,
        loading,
        error,
        linkLoading
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
