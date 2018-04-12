import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container, Toast} from 'native-base';
import {AppHeader, DebtForm} from "../components/";
import _ from 'lodash';
import I18n from "../strings/i18n";
import {
    deleteDebt,
    getDebts,
    nameChanged,
    amountChanged,
    expirationDateChanged,
    categoriesSelected,
    getCategories,
    calculateCategorySubtractions
} from "../actions";
import {container} from "../style";

class CreateDebt extends Component {
    componentWillMount() {
        this.props.getCategories(this.props.budgetID);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.categoriesError)
            this.showToast(nextProps.categoriesError);
    }

    showToast = (errorMsg) => Toast.show({
        text: errorMsg,
        position: 'bottom',
        buttonText: 'Okay',
        duration: 5000,
        type: 'warning'
    });

    onContinuePress = () => {
        this.props.calculateCategorySubtractions(
            this.props.totalAmount,
            this.props.expirationDate,
            this.props.selectedCategories, () => {
                this.props.navigation.navigate('DebtPreview');
            });
    };

    render() {
        return (
            <Container style={container.signedInContainer}>
                <AppHeader headerText={I18n.t('createDebtHeader')}
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
    const {name, totalAmount, expirationDate} = state.debt;
    const {
        categories,
        categoriesOfDebt,
        selectedCategories,
        categoriesLoading,
        subtractionsLoading,
        categoriesError
    } = state.category;

    const categoriesWithAmounts = categories.filter((obj) => {
        return obj.categoryData.amount > 0
    });

    const categoryItems = _.map(categoriesWithAmounts, (item, key) => {
        return {...item.categoryData, categoryID: item.id, key: key};
    });

    return {
        name,
        totalAmount,
        expirationDate,
        categoriesOfDebt,
        selectedCategories,
        budgetID,
        categoryItems,
        categoriesLoading,
        subtractionsLoading,
        categoriesError
    };
};

const mapDispatchToProps = {
    nameChanged,
    amountChanged,
    expirationDateChanged,
    calculateCategorySubtractions,
    categoriesSelected,
    getCategories,
    getDebts,
    deleteDebt
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDebt);
