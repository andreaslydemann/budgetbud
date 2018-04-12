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
        totalGoalsAmount,
        disposable,
        budgetLoading,
        budgetError
    } = state.budget;

    const categories = state.category.categories;

    const {tmpCategories, categoriesLoading, categoriesError} = state.category;

    return {
        income,
        debts,
        totalGoalsAmount,
        disposable,
        budgetLoading,
        budgetError,
        tmpCategories,
        categoriesLoading,
        categoriesError,
        categories
    };
};


const mapDispatchToProps = {
    editBudget,
    categoryChanged,
    incomeChanged,
    getMappedCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBudget);
