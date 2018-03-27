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
    expirationDateChanged,
    categoriesSelected
} from "../actions/debt_actions";
import {getCategories} from "../actions/category_actions";

class CreateDebt extends Component {
    componentWillMount() {
        this.props.getCategories(this.props.budgetID);
    }

    onContinuePress = () => {
        this.props.navigation.navigate('DebtPreview');
    };

    render() {
        return (
            <Container>
                <AppHeader headerText={'Opret gæld'}
                           showBackButton={true}
                           onLeftButtonPress={() => this.props.navigation.pop()}/>

                <DebtForm nameChanged={this.props.nameChanged}
                          amountChanged={this.props.amountChanged}
                          expirationDateChanged={this.props.expirationDateChanged}
                          categoriesSelected={this.props.categoriesSelected}
                          name={this.props.name}
                          amount={this.props.amount}
                          expirationDate={this.props.expirationDate}
                          categoryItems={this.props.categoryItems}
                          selectedCategories={this.props.selectedCategories}
                          categoriesLoading={this.props.categoriesLoading}
                          onContinuePress={this.onContinuePress}/>
            </Container>
        );
    }
}

styles = {
    textContainer: {
        width: '90%',
        alignSelf: 'center',
        alignItems: 'flex-start',
        marginVertical: 25
    }
};

const mapStateToProps = (state) => {
    const budgetID = state.budget.budgetID;
    const {name, amount, expirationDate, selectedCategories} = state.debt;
    const {categories, categoriesLoading} = state.category;

    const categoryItems = _.map(categories, (item, key) => {
        return {...item.categoryData, categoryID: item.id, key: key};
    });

    return {
        name,
        amount,
        expirationDate,
        selectedCategories,
        budgetID,
        categoryItems,
        categoriesLoading
    };
};

const mapDispatchToProps = {
    nameChanged,
    amountChanged,
    expirationDateChanged,
    categoriesSelected,
    getCategories,
    resetDebtForm,
    debtSelected,
    getDebts,
    deleteDebt
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDebt);
