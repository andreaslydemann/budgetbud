import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import {Container} from 'native-base';
import {connect} from 'react-redux';
import {BudgetForm, AppHeader} from "../components/";
import I18n from "../strings/i18n";
import {
    createBudget,
    mapExpensesToBudget,
    getLinkedAccounts,
    createCategories
} from '../actions';
import {container} from "../style";
import {showWarningToast, checkInputAmount, commaToDotConversion} from "../helpers";
import {setupNewCategoriesList} from "../helpers/categoryListHelper";

class CreateBudget extends Component {
    state = {
        tmpIncome: this.props.income,
        tmpDisposable: this.props.disposable,
        tmpTotalGoalsAmount: this.props.totalGoalsAmount,
        tmpCategories: [],
        submitLoading: false
    };

    componentWillMount() {
        this.props.mapExpensesToBudget();
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.budgetError)
            showWarningToast(nextProps.budgetError);
    }

    onIncomeChange = (newIncome) => {
        newIncome = commaToDotConversion(newIncome);
        if (checkInputAmount(newIncome)) {
            const incomeDiff = newIncome - this.state.tmpIncome;
            const newDisposable = this.state.tmpDisposable + incomeDiff;

            this.setState({
                tmpIncome: newIncome,
                tmpDisposable: newDisposable,
            })
        }
    };

    onCategoryChange = (name, oldAmount, newAmount) => {
        newAmount = commaToDotConversion(newAmount);
        if (checkInputAmount(newAmount)) {
            const categoryDiff = oldAmount - newAmount;
            const newDisposable = this.state.tmpDisposable + categoryDiff;
            const newTotalGoalsAmount = this.state.tmpTotalGoalsAmount - categoryDiff;

            const newTmpCategories = setupNewCategoriesList(
                this.state.tmpCategories,
                name,
                newAmount);

            this.props.categoryChanged(name, newAmount);
            this.setState({
                tmpDisposable: newDisposable,
                tmpTotalGoalsAmount: newTotalGoalsAmount,
                tmpCategories: newTmpCategories
            })
        }
    };

    handleSubmit = async () => {
        if (this.state.submitLoading) return;
        Keyboard.dismiss();
        this.setState({
            submitLoading: true
        });

        await this.props.createBudget(
            this.state.tmpIncome,
            this.state.tmpDisposable,
            this.state.tmpTotalGoalsAmount);
        await this.props.createCategories(
            this.props.budgetID,
            this.state.tmpCategories);

        this.setState({
            submitLoading: false
        });
        if(!this.props.budgetError && !this.props.categoriesError)
            this.props.navigation.navigate('MyBudget');
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
                            budgetID={this.props.budgetID}
                            tmpIncome={this.state.tmpIncome}
                            tmpTotalGoalsAmount={this.state.tmpTotalGoalsAmount}
                            tmpDisposable={this.state.tmpDisposable}
                            tmpCategories={this.state.tmpCategories}
                            debts={this.props.debts}
                            budgetLoading={this.props.budgetLoading}
                            submitLoading={this.state.submitLoading}
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
        categoriesLoading,
        categoriesError,
        totalGoalsAmount
    } = state.category;

    return {
        income,
        budgetID,
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
    getLinkedAccounts,
    mapExpensesToBudget,
    createCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBudget);
