import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import {Container} from 'native-base';
import {connect} from 'react-redux';
import I18n from "../strings/i18n";
import AppHeader from "../components/AppHeader";
import BudgetForm from "../components/BudgetForm";
import {
    editBudget,
    incomeChanged,
    categoryChanged
} from "../actions";

class EditBudget extends Component {
    onIncomeChange = (text) => {
        this.props.incomeChanged(text);
    };

    onCategoryChange = (text) => {
        this.props.categoryChanged(text);
    };

    handleSubmit = () => {
        Keyboard.dismiss();

        this.props.editBudget(this.props, () => {
            this.props.navigation.navigate.pop();
        });
    };

    render() {
        return (
            <Container style={[{alignItems: 'stretch'}]}>
                <AppHeader headerText={I18n.t('editBudgetHeader')}
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
    return {
        income,
        categories,
        debt,
        totalExpenses,
        disposable,
        loading,
        error,
        isBudgetCreated
    } = budget;
};

const mapDispatchToProps = {
    editBudget,
    incomeChanged,
    categoryChanged
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBudget);
