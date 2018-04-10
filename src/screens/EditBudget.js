import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import {Container} from 'native-base';
import {connect} from 'react-redux';
import {BudgetForm, AppHeader} from "../components/";
import I18n from "../strings/i18n";
import {
    editBudget,
    incomeChanged,
    categoryChanged,
    getMappedCategories
} from "../actions";

class EditBudget extends Component {
    async componentWillMount() {
        await this.props.getMappedCategories();
    };

    onIncomeChange = (text) => {
        this.props.incomeChanged(text);
    };

    onCategoryChange = (text) => {
        this.props.categoryChanged(text);
    };

    handleSubmit = () => {
        Keyboard.dismiss();

        this.props.editBudget(this.props, () => {
            this.props.navigation.navigate.pop();
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
                <AppHeader headerText={I18n.t('editBudgetHeader')}
                           showBackButton={true}
                           onLeftButtonPress={() => this.props.navigation.pop()}/>

                <BudgetForm handleSubmit={this.handleSubmit}
                            onIncomeChanged={this.onIncomeChange}
                            onCategoryChanged={this.onCategoryChange}
                            checkInput={this.checkInput}
                            income={this.props.income}
                            totalExpenses={this.props.totalExpenses}
                            disposable={this.props.disposable}
                            categories={this.props.tmpCategories}
                            debts={this.props.debts}
                            budgetLoading={this.props.budgetLoading}
                            budgetError={this.props.budgetError}
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
        budgetLoading,
        budgetError
    } = state.budget;

    const {tmpCategories, categoriesLoading, categoriesError} = state.category;

    return {
        income,
        debts,
        totalExpenses,
        disposable,
        budgetLoading,
        budgetError,
        tmpCategories,
        categoriesLoading,
        categoriesError
    };
};


const mapDispatchToProps = {
    editBudget,
    incomeChanged,
    categoryChanged,
    getMappedCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBudget);
