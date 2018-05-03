import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import {Container} from 'native-base';
import {connect} from 'react-redux';
import {BudgetForm, AppHeader} from "../../components";
import I18n from "../../strings/i18n";
import {container} from "../../style";
import {
    showWarningToast,
    checkInputAmount,
    correctConversion,
    setupNewCategoriesList
} from "../../helpers";
import {
    createBudget,
    getLinkedAccounts,
    createCategories,
    mapExpensesToBudget
} from "../../redux/actions";
import {resetBudgetError} from "./budget_actions";
import {resetCategoriesError} from "../categories/category_actions";

class CreateBudget extends Component {
    state = {
        tmpIncome: this.props.income,
        tmpDisposable: this.props.disposable,
        tmpTotalGoalsAmount: this.props.totalGoalsAmount,
        tmpCategories: [],
        submitLoading: false
    };

    async componentWillMount() {
        this.setState({
            tmpCategories: await this.props.mapExpensesToBudget()
        })
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.budgetError) {
            showWarningToast(nextProps.budgetError);
            this.props.resetBudgetError();
        } else if (nextProps.categoriesError) {
            showWarningToast(nextProps.categoriesError);
            this.props.resetCategoriesError();
        }
    }

    onIncomeChange = (newIncome) => {
        newIncome = correctConversion(newIncome);
        if (checkInputAmount(newIncome)) {
            const incomeDiff = newIncome - this.state.tmpIncome;
            const newDisposable = Math.round((this.state.tmpDisposable + incomeDiff) * 100) / 100;

            this.setState({
                tmpIncome: newIncome,
                tmpDisposable: newDisposable,
            })
        }
    };

    onCategoryChange = (name, oldAmount, newAmount) => {
        newAmount = correctConversion(newAmount);
        if (checkInputAmount(newAmount)) {
            const categoryDiff = oldAmount - newAmount;
            const newDisposable = Math.round((this.state.tmpDisposable + categoryDiff) * 100) / 100;
            const newTotalGoalsAmount = Math.round((this.state.tmpTotalGoalsAmount - categoryDiff) * 100) / 100;
            const newTmpCategories = setupNewCategoriesList(
                this.state.tmpCategories,
                name,
                newAmount);

            this.setState({
                tmpDisposable: newDisposable,
                tmpTotalGoalsAmount: newTotalGoalsAmount,
                tmpCategories: newTmpCategories
            })
        }
    };

    handleSubmit = async () => {
        Keyboard.dismiss();
        this.setState({
            submitLoading: true
        });

        const categoryItems = this.state.tmpCategories.filter((obj) => {
            return obj.amount > 0
        });

        await this.props.createBudget(
            this.state.tmpIncome,
            this.state.tmpDisposable,
            this.state.tmpTotalGoalsAmount,
            (budgetID) => {
                this.props.createCategories
                (
                    budgetID,
                    categoryItems,
                    () => {
                        this.setState({
                            submitLoading: false
                        });
                    }
                )
            }
        );
    };

    render() {
        return (
            <Container style={[container.signedInContainer, {alignItems: 'stretch'}]}>
                <AppHeader headerText={I18n.t('createBudgetHeader')}
                           infoText={I18n.t('createBudgetInfo')}
                           showBackButton={true}
                           onLeftButtonPress={() => {
                               if (!this.state.submitLoading)
                                   this.props.navigation.pop()
                           }}/>

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
    createCategories,
    resetBudgetError,
    resetCategoriesError
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBudget);
