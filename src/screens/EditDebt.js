import React, {Component} from 'react';
import {Container} from 'native-base';
import {connect} from "react-redux";
import _ from 'lodash';
import I18n from "../strings/i18n";
import {AppHeader, DebtForm} from "../components/";
import {
    deleteDebt,
    getDebts,
    nameChanged,
    amountChanged,
    expirationDateChanged,
    getCategoriesOfDebt,
    categoriesSelected,
    calculateCategorySubtractions
} from "../actions";
import {container} from "../style";

class EditDebt extends Component {
    componentWillMount() {
        this.props.getCategoriesOfDebt(this.props.selectedDebt.id);
    }

    onContinuePress = () => {
        this.props.calculateCategorySubtractions(
            this.props.totalAmount,
            this.props.expirationDate,
            this.props.selectedCategories, () => {
                this.props.navigation.navigate('DebtPreview');
            },
            this.props.selectedDebt.id);
    };

    render() {
        return (
            <Container style={container.signedInContainer}>
                <AppHeader headerText={I18n.t('editDebtHeader')}
                           showBackButton={true}
                           onLeftButtonPress={() => this.props.navigation.pop()}/>

                <DebtForm nameChanged={this.props.nameChanged}
                          amountChanged={this.props.amountChanged}
                          expirationDateChanged={this.props.expirationDateChanged}
                          categoriesSelected={this.props.categoriesSelected}
                          name={this.props.name}
                          amount={this.props.totalAmount}
                          expirationDate={this.props.expirationDate}
                          categoryItems={this.props.categoryItems}
                          selectedCategories={this.props.selectedCategories}
                          categoriesLoading={this.props.categoriesLoading}
                          subtractionsLoading={this.props.subtractionsLoading}
                          onContinuePress={this.onContinuePress}/>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const budgetID = state.budget.budgetID;
    const {name, totalAmount, expirationDate, selectedDebt} = state.debt;
    const {
        categories,
        categoriesOfDebt,
        selectedCategories,
        categoriesLoading,
        subtractionsLoading
    } = state.category;

    const unfilteredCategories = _.map(categories, (item, key) => {
        const categoryOfDebt = categoriesOfDebt.filter((obj) => {
            return obj.categoryID === item.id;
        });

        const amount = (categoryOfDebt[0] ? categoryOfDebt[0].amount : 0);

        return {
            budgetID: item.categoryData.budgetID,
            name: item.categoryData.name,
            amount: (item.categoryData.amount + amount),
            categoryID: item.id,
            key: key
        };
    });

    const categoryItems = unfilteredCategories.filter((obj) => {
        return obj.amount > 0
    });

    return {
        name,
        totalAmount,
        expirationDate,
        selectedDebt,
        categoriesOfDebt,
        selectedCategories,
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
    categoriesSelected,
    getCategoriesOfDebt,
    getDebts,
    deleteDebt
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDebt);
