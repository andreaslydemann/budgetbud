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
    mapExpensesToBudget,
    getLinkedAccounts,
    createCategories
} from '../actions';
import {container} from "../style";
import {showWarningToast} from "../helpers/toasts";
import {checkInputAmount} from "../helpers/validators";

class CreateBudget extends Component {
    state = {
        tmpIncome: this.props.income,
        tmpDisposable: this.props.disposable,
        tmpTotalGoalsAmount: this.props.totalGoalsAmount
    };

    componentWillMount() {
        this.props.mapExpensesToBudget();
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.budgetError)
            showWarningToast(nextProps.budgetError);
    }

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
        this.props.createBudget(this.props, (budgetID) => {
            this.props.createCategories(
                budgetID,
                this.props.tmpCategories, () => {
                    this.props.navigation.navigate('MyBudget');
                });
        })
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
                <AppHeader headerText={I18n.t('createBudgetHeader')}
                           onLeftButtonPress={
                               () => this.props.navigation.navigate("DrawerOpen")}
                />

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

    const disposable = state.disposable.disposable;

    const linkedAccounts = state.account.linkedAccounts;
    const {
        tmpCategories,
        categoriesLoading,
        categoriesError,
        totalGoalsAmount
    } = state.category;

    return {
        income,
        budgetID,
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
    createBudget,
    incomeChanged,
    categoryChanged,
    getLinkedAccounts,
    mapExpensesToBudget,
    createCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBudget);
