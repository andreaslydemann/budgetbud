import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import {Container} from 'native-base';
import {connect} from 'react-redux';
import {incomeChanged, categoryChanged, editBudget} from '../actions/budget_actions';
import {BudgetForm, AppHeader} from "../components/";

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
    editBudget,
    incomeChanged,
    categoryChanged
})(EditBudget);
