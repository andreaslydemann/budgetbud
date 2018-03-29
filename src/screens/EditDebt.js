import React, {Component} from 'react';
import {Container} from 'native-base';
import {connect} from "react-redux";
import _ from 'lodash';
import I18n from "../strings/i18n";
import {AppHeader, DebtForm} from "../components/";
import {
    debtSelected,
    deleteDebt,
    getDebts,
    resetDebtForm,
    nameChanged,
    amountChanged,
    expirationDateChanged,
    getCategoriesOfDebt,
    categoriesOfDebtSelected
} from "../actions";

class EditDebt extends Component {
    componentWillMount() {
        this.props.getCategoriesOfDebt(this.props.selectedDebtID);
    }

    onContinuePress = () => {
        this.props.navigation.navigate('DebtPreview');
    };

    render() {
        return (
            <Container>
                <AppHeader headerText={I18n.t('editDebtHeader')}
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
                          selectedCategories={this.props.categoriesOfDebt}
                          categoriesLoading={this.props.categoriesLoading}
                          onContinuePress={this.onContinuePress}/>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const budgetID = state.budget.budgetID;
    const {name, amount, expirationDate, selectedDebtID} = state.debt;
    const {categories, categoriesOfDebt, categoriesLoading} = state.category;

    const categoryItems = _.map(categories, (item, key) => {
        return {...item.categoryData, categoryID: item.id, key: key};
    });

    return {
        name,
        amount,
        expirationDate,
        selectedDebtID,
        categoriesOfDebt,
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
    getCategoriesOfDebt,
    resetDebtForm,
    debtSelected,
    getDebts,
    deleteDebt
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDebt);
