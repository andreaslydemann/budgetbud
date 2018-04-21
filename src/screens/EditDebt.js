import React, {Component} from 'react';
import {Container} from 'native-base';
import {connect} from "react-redux";
import _ from 'lodash';
import I18n from "../strings/i18n";
import {showWarningToast} from '../helpers';
import {AppHeader, DebtForm} from "../components/";
import {
    deleteDebt,
    getDebts,
    nameChanged,
    amountChanged,
    expirationDateChanged,
    getCategoriesOfDebt,
    categoriesSelected,
    calculateDebtCategorySubtractions,
    resetDebtError
} from "../actions";
import {container} from "../style";

class EditDebt extends Component {
    componentWillMount() {
        this.props.getCategoriesOfDebt(this.props.selectedDebt);
    }

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
            },
            this.props.selectedDebt);
    };

    render() {
        return (
            <Container style={container.signedInContainer}>
                <AppHeader headerText={I18n.t('editDebtHeader')}
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
        selectedDebt,
        debtLoading,
        debtError
    } = state.debt;
    const {
        categories,
        categoriesOfDebt,
        selectedCategories,
        categoriesLoading,
    } = state.category;

    const unfilteredCategories = _.map(categories, (item) => {
        const categoryOfDebt = categoriesOfDebt.filter((obj) => {
            return obj.categoryID === item.categoryID;
        });
        return {
            name: item.name,
            amount: (item.amount +
                (categoryOfDebt[0] ? categoryOfDebt[0].amount : 0)),
            categoryID: item.categoryID
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
    getCategoriesOfDebt,
    getDebts,
    deleteDebt,
    resetDebtError
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDebt);
