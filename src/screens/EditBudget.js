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
    setupEditBudget,
    editCategories
} from "../actions";
import {container} from "../style";
import {getCategories} from "../actions/category_actions";
import {getBudget} from "../actions/budget_actions";
import {checkInputAmount} from "../helpers/validators";

class EditBudget extends Component {
    state = {
        tmpIncome: this.props.income,
        tmpDisposable: this.props.disposable,
        tmpTotalGoalsAmount: this.props.totalGoalsAmount
    };

    componentWillMount() {
        this.props.setupEditBudget(this.props);
    };

    onIncomeChange = (newIncome) => {
        newIncome = newIncome.replace(/,/g, '.');
        if (checkInputAmount(newIncome)) {
            const incomeDiff = newIncome - this.state.tmpIncome;
            const newDisposable = this.state.tmpDisposable + incomeDiff;

            this.setState({
                tmpIncome: newIncome,
                tmpDisposable: newDisposable
            })
        }
    };

    onCategoryChange = (name, oldAmount, newAmount) => {
        newAmount = newAmount.replace(/,/g, '.');
        if (checkInputAmount(newAmount)) {
            const categoryDiff = oldAmount - newAmount;
            const newDisposable = this.state.tmpDisposable + categoryDiff;
            const newTotalGoalsAmount = this.state.tmpTotalGoalsAmount - categoryDiff;

            this.props.categoryChanged(name, newAmount);
            this.setState({
                tmpDisposable: newDisposable,
                tmpTotalGoalsAmount: newTotalGoalsAmount
            })
        }
    };

    handleSubmit = async () => {
        Keyboard.dismiss();

        if (this.state.tmpIncome.slice(-1) === '.')
            this.setState({
                tmpIncome: this.state.tmpIncome.slice(0, -1)
            });

        await this.props.editBudget(
            this.props.budgetID,
            this.state.tmpIncome,
            this.state.tmpDisposable,
            this.state.tmpTotalGoalsAmount
        );

        await this.props.editCategories(this.props);
        this.props.navigation.pop();
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
                            budgetID={this.props.budgetID}
                            tmpIncome={this.state.tmpIncome}
                            tmpTotalGoalsAmount={this.state.tmpTotalGoalsAmount}
                            tmpDisposable={this.state.tmpDisposable}
                            tmpCategories={this.props.tmpCategories}
                            debts={this.props.debts}
                            budgetLoading={this.props.budgetLoading}
                            categoriesLoading={this.props.categoriesLoading}
                            budgetError={this.props.budgetError}
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
        budgetError,
        budgetID
    } = state.budget;

    const {disposable} = state.disposable;

    const linkedAccounts = state.account.linkedAccounts;
    const {
        categories,
        tmpCategories,
        categoriesLoading,
        categoriesError,
        totalGoalsAmount,
    } = state.category;

    return {
        budgetID,
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
    editCategories,
    getBudget,
    getCategories,
    categoryChanged,
    incomeChanged,
    setupEditBudget
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBudget);
