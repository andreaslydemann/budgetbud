import React, {Component} from 'react';
import {Container} from 'native-base';
import AppHeader from "../components/AppHeader";
import DebtForm from '../components/DebtForm';
import {connect} from "react-redux";
import _ from 'lodash';
import {
    debtSelected,
    deleteDebt,
    getDebts,
    resetDebtForm,
    nameChanged,
    amountChanged,
    expirationDateChanged
} from "../actions/debt_actions";
import {getCategories, getCategoriesOfDebt, categoriesOfDebtSelected} from "../actions/category_actions";

class EditDebt extends Component {
    componentWillMount() {
        this.props.getCategories(this.props.budgetID);
        this.props.getCategoriesOfDebt(this.props.selectedDebtID);
    }

    onContinuePress = () => {
        this.props.navigation.navigate('DebtPreview');
    };

    render() {
        return (
            <Container>
                <AppHeader headerText={'Redigér gæld'}
                           showBackButton={true}
                           onLeftButtonPress={() => this.props.navigation.pop()}/>

                <DebtForm nameChanged={this.props.nameChanged}
                          amountChanged={this.props.amountChanged}
                          expirationDateChanged={this.props.expirationDateChanged}
                          categoriesSelected={this.props.categoriesOfDebtSelected}
                          name={this.props.name}
                          amount={this.props.amount}
                          expirationDate={this.props.expirationDate}
                          categoryItems={this.props.categoryItems}
                          selectedCategories={this.props.selectedCategoriesOfDebt}
                          categoriesLoading={this.props.categoriesLoading}
                          onContinuePress={this.onContinuePress}/>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const budgetID = state.budget.budgetID;
    const {name, amount, expirationDate, selectedDebtID} = state.debt;
    const {categories, selectedCategoriesOfDebt, categoriesLoading} = state.category;

    const categoryItems = _.map(categories, (item, key) => {
        return {...item.categoryData, categoryID: item.id, key: key};
    });

    return {
        name,
        amount,
        expirationDate,
        selectedDebtID,
        selectedCategoriesOfDebt,
        budgetID,
        categoryItems,
        categoriesLoading
    };
};

const mapDispatchToProps = {
    nameChanged,
    amountChanged,
    expirationDateChanged,
    categoriesOfDebtSelected,
    getCategories,
    getCategoriesOfDebt,
    resetDebtForm,
    debtSelected,
    getDebts,
    deleteDebt
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDebt);
