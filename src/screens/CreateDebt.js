import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container} from 'native-base';
import {AppHeader, DebtForm} from "../components/";
import _ from 'lodash';
import I18n from "../strings/i18n";
import {
    debtSelected,
    deleteDebt,
    getDebts,
    nameChanged,
    amountChanged,
    expirationDateChanged,
    categoriesOfDebtSelected,
    getCategories,
    calculateCategorySubtractions
} from "../actions";

class CreateDebt extends Component {
    componentWillMount() {
        this.props.getCategories(this.props.budgetID);
    }

    onContinuePress = () => {
        this.props.calculateCategorySubtractions(
            this.props.amount,
            this.props.expirationDate,
            this.props.categoriesOfDebtIDs, () => {
                this.props.navigation.navigate('DebtPreview');
            });
    };

    render() {
        return (
            <Container>
                <AppHeader headerText={I18n.t('createDebtHeader')}
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
                          selectedCategories={this.props.categoriesOfDebtIDs}
                          categoriesLoading={this.props.categoriesLoading}
                          subtractionsLoading={this.props.subtractionsLoading}
                          onContinuePress={this.onContinuePress}/>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const budgetID = state.budget.budgetID;
    const {name, amount, expirationDate} = state.debt;
    const {
        categories,
        categoriesOfDebtIDs,
        categoriesLoading,
        subtractionsLoading
    } = state.category;

    const categoriesWithAmounts = categories.filter((obj) => {
        return obj.categoryData.amount > 0
    });

    const categoryItems = _.map(categoriesWithAmounts, (item, key) => {
        return {...item.categoryData, categoryID: item.id, key: key};
    });

    return {
        name,
        amount,
        expirationDate,
        categoriesOfDebtIDs,
        budgetID,
        categoryItems,
        categoriesLoading,
        subtractionsLoading
    };
};

const mapDispatchToProps = {
    nameChanged,
    amountChanged,
    expirationDateChanged,
    calculateCategorySubtractions,
    categoriesOfDebtSelected,
    getCategories,
    debtSelected,
    getDebts,
    deleteDebt
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDebt);
