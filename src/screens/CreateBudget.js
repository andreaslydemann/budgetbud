import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import {Button, Container, Form, Spinner, Text} from 'native-base';
import {connect} from 'react-redux';
import {incomeChanged, categoryChanged, createBudget} from '../actions/index';
import BudgetForm from "../components/BudgetForm";
import AppHeader from "../components/AppHeader";

class CreateBudget extends Component {
    componentWillMount() {
        if (this.props.isBudgetCreated)
            this.props.navigation.navigate('MyBudget');
    };

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
                            totalExpenses={this.props.totalExpenses}
                            disposable={this.props.disposable}
                            categories={this.props.categories}
                            debt={this.props.debt}
                            loading={this.props.loading}
                            error={this.props.error}
                            isBudgetCreated={this.props.isBudgetCreated}
                />
            </Container>
        );
    }
}

const mapStateToProps = ({budget}) => {
    const {income, categories, debt, totalExpenses, disposable, loading, error, isBudgetCreated} = budget;
    return {income, categories, debt, totalExpenses, disposable, loading, error, isBudgetCreated}
};

export default connect(mapStateToProps, {
    createBudget,
    incomeChanged,
    categoryChanged
})(CreateBudget);
