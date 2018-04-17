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
import {showWarningToast} from "../helpers/toast";

class CreateBudget extends Component {
    componentWillMount() {
        this.props.mapExpensesToBudget();
    };

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.budgetError)
    //         showWarningToast(nextProps.budgetError);
    //     if (nextProps.budgetID) {
    //         console.log("Number 1")
    //         this.props.createCategories(
    //             nextProps.budgetID,
    //             this.state.tmpCategories,
    //             () => {
    //                 this.state.navigation.navigate('MyBudget');
    //             });
    //     }
    // }

    onIncomeChange = (newIncome) => {
        this.props.incomeChanged(newIncome, this.props.income);
    };

    onCategoryChange = (newAmount, name, oldAmount) => {
        this.props.categoryChanged(newAmount, name, oldAmount);
    };

    handleSubmit = async () => {
        Keyboard.dismiss();

        this.props.createBudget(this.props);
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
        budgetError,
        budgetID
    } = state.budget;

    const disposable = state.disposable.disposable;

    const linkedAccounts = state.account.linkedAccounts;
    const {tmpCategories, categoriesLoading, categoriesError, totalGoalsAmount} = state.category;

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
