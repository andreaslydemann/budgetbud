import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import {Button, Container, Form, Spinner, Text} from 'native-base';
import {connect} from 'react-redux';
import {incomeChanged, categoryChanged, createBudget, openDrawer} from '../actions/index';
import BudgetForm from "../components/BudgetForm";
import {editBudget, getInitialBudget, getInitialState} from "../actions/budget_actions";
import AppHeader from "../components/AppHeader";

class EditBudget extends Component {
    onIncomeChange = (text) => {
        this.props.incomeChanged(text);
    };

    onCategoryChange = (text) => {
        this.props.categoryChanged(text);
    };

    handleSubmit = () => {
        Keyboard.dismiss();
        const {income, categoryAmount} = this.props;
        this.props.editBudget({income, categoryAmount}, () => {
            this.props.navigation.navigate.pop();
        });
    };

    render() {
        return (
            <Container style={[{alignItems: 'stretch'}]}>
                {/*---HEADER---*/}
                <AppHeader headerText={'Redigér budget'}
                           showBackButton={true}
                           onLeftButtonPress={() => this.props.navigation.pop()}/>

                <BudgetForm handleSubmit={this.handleSubmit}
                            onIncomeChanged={this.onIncomeChange}
                            onCategoryChanged={this.onCategoryChange}
                            income={this.props.income}
                            totalExpenses={this.props.totalExpenses}
                            disposable={this.props.disposable}
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
    const {income, categories, debt, totalExpenses, disposable, loading, error} = budget;
    return {income, categories, debt, totalExpenses, disposable, loading, error}
};

export default connect(mapStateToProps, {
    openDrawer, editBudget,
    incomeChanged, categoryChanged, getInitialBudget
})(EditBudget);
