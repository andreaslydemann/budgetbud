import React, {Component} from 'react';
import {connect} from "react-redux";
import {Container} from 'native-base';
import {AppHeader, DebtForm} from "../components/";
import I18n from "../strings/i18n";
import {showWarningToast} from '../helpers';
import {
    deleteDebt,
    getDebts,
    nameChanged,
    amountChanged,
    expirationDateChanged,
    categoriesSelected,
    getCategories,
    calculateDebtCategorySubtractions,
    resetDebtError
} from "../actions";
import {container} from "../style";

class CreateDebt extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.debtError) {
            showWarningToast(nextProps.debtError);
            this.props.resetDebtError();
        }
    }

    onContinuePress = () => {
        if (this.props.debtLoading)
            return;

        this.props.calculateDebtCategorySubtractions(
            this.props.name,
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
                           onLeftButtonPress={() => {
                               if (!this.props.debtLoading) {
                                   this.props.navigation.pop();
                               }
                           }}/>

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
                          debtLoading={this.props.debtLoading}
                          onContinuePress={this.onContinuePress}/>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const {
        name,
        totalAmount,
        expirationDate,
        debtLoading,
        debtError
    } = state.debt;
    const {
        categories,
        categoriesOfDebt,
        selectedCategories,
        categoriesLoading,
    } = state.category;

    const categoryItems = categories.filter((obj) => {
        return obj.amount > 0
    });

    return {
        name,
        totalAmount,
        expirationDate,
        categoriesOfDebt,
        selectedCategories,
        categoryItems,
        categoriesLoading,
        debtLoading,
        debtError
    };
};

const mapDispatchToProps = {
    nameChanged,
    amountChanged,
    expirationDateChanged,
    calculateDebtCategorySubtractions,
    categoriesSelected,
    getCategories,
    getDebts,
    deleteDebt,
    resetDebtError
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDebt);
