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
import {container} from "../style";

class EditBudget extends Component {
    async componentWillMount() {
        await this.props.getMappedCategories(this.props.categories);
    };

    onIncomeChange = (newIncome) => {
        this.props.incomeChanged(newIncome, this.props.income);
    };

    onCategoryChange = (newAmount, name, oldAmount) => {
        this.props.categoryChanged(newAmount, name, oldAmount);
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
            <Container style={[container.signedInContainer, {alignItems: 'stretch'}]}>
                <AppHeader headerText={I18n.t('editBudgetHeader')}
                           showBackButton={true}
                           onLeftButtonPress={() => this.props.navigation.pop()}/>

                <BudgetForm handleSubmit={this.handleSubmit}
                            onIncomeChanged={this.onIncomeChange}
                            onCategoryChanged={this.onCategoryChange}
                            checkInput={this.checkInput}
                            income={this.props.income}
                            totalGoalsAmount={this.props.totalGoalsAmount}
                            disposable={this.props.disposable}
                            tmpCategories={this.props.tmpCategories}
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
        budgetLoading,
        budgetError
    } = state.budget;

    const disposable = state.disposable.disposable;

    const linkedAccounts = state.account.linkedAccounts;
    const {
        categories,
        tmpCategories,
        categoriesLoading,
        categoriesError,
        totalGoalsAmount
    } = state.category;

    return {
        income,
        categories,
        tmpCategories,
        linkedAccounts,
        debts,
        totalGoalsAmount,
        disposable,
        budgetLoading,
        categoriesError,
        budgetError,
        categoriesLoading
    };
};


const mapDispatchToProps = {
    editBudget,
    categoryChanged,
    incomeChanged,
    getMappedCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBudget);
