import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import {Button, Container, Form, Spinner, Text} from 'native-base';
import {connect} from 'react-redux';
import {incomeChanged, categoryChanged, createBudget} from '../actions/index';
import BudgetForm from "../components/BudgetForm";
import AppHeader from "../components/AppHeader";

class CreateBudget extends Component {
    onIncomeChange = (text) => {
        this.props.incomeChanged(text);
    };

    onCategoryChange = (amount, name) => {
        this.props.categoryChanged(amount, name);
    };

    handleSubmit = () => {
        Keyboard.dismiss();
        const {income, categories} = this.props;
        this.props.createBudget({income, categories}, () => {
            this.props.navigation.navigate('MyBudget');
        });
    };

    render() {
        return (
            <Container style={[{alignItems: 'stretch'}]}>
                {/*---HEADER---*/}
                <AppHeader headerText={'Opret budget'}
                           onLeftButtonPress={() => this.props.navigation.navigate("DrawerOpen")}/>

                <BudgetForm handleSubmit={this.handleSubmit}
                            onIncomeChanged={this.onIncomeChange}
                            onCategoryChanged={this.onCategoryChange}
                            income={this.props.income}
                            categoryAmount={this.props.categoryAmount}
                            expenses={this.props.expenses}
                            disposable={this.props.disposable}
                            estimatedIncome={this.props.estimatedIncome}
                            categories={this.props.categories}
                            debt={this.props.debt}
                            loading={this.props.loading}
                            error={this.props.error}
                />
            </Container>
        );
    }
}

const mapStateToProps = ({budget}) => {
    const {income, categoryAmount, categories, debt, expenses, disposable, estimatedIncome, loading} = budget;
    return {income, categoryAmount, categories, debt, expenses, disposable, estimatedIncome, loading}
};

export default connect(mapStateToProps, {
    createBudget,
    incomeChanged,
    categoryChanged
})(CreateBudget);
