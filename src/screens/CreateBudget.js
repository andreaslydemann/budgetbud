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
    getAccountData
} from '../actions';

class CreateBudget extends Component {
    componentWillMount() {
        if (this.props.budgetID !== '')
            this.props.navigation.navigate('MyBudget');

        this.props.getAccountData();
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

const mapStateToProps = ({budget}) => {
    return {
        income,
        categories,
        debts,
        totalExpenses,
        disposable,
        loading,
        error
    } = budget;
};

const mapDispatchToProps = {
    createBudget,
    incomeChanged,
    categoryChanged,
    getAccountData
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBudget);
