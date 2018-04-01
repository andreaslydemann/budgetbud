import React, {Component} from 'react';
import {Container} from 'native-base';
import {connect} from "react-redux";
import _ from 'lodash';
import I18n from "../strings/i18n";
import {AppHeader, DisposableForm} from "../components/";
import {
    resetDisposableForm,
    amountChanged,
    getCategories
} from "../actions";

class EditDisposable extends Component {
    componentWillMount() {
        this.props.getCategories(this.props.budgetID);
    }

    onContinuePress = () => {
        this.props.navigation.navigate('DisposablePreview');
    };

    render() {
        return (
            <Container>
                <AppHeader headerText={I18n.t('editDisposableHeader')}
                           showBackButton={true}
                           onLeftButtonPress={() => this.props.navigation.pop()}/>

                <DisposableForm amountChanged={this.props.amountChanged}
                          categoriesSelected={this.props.categoriesOfDisposableSelected}
                          amount={this.props.amount}
                          categoryItems={this.props.categoryItems}
                          selectedCategories={this.props.selectedCategoriesOfDisposable}
                          categoriesLoading={this.props.categoriesLoading}
                          onContinuePress={this.onContinuePress}/>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const budgetID = state.budget.budgetID;
    const {amount, selectedDisposableID} = state.disposable;
    const {categories, selectedCategoriesOfDisposable, categoriesLoading} = state.category;

    const categoryItems = _.map(categories, (item, key) => {
        return {...item.categoryData, categoryID: item.id, key: key};
    });

    return {
        amount,
        selectedDisposableID,
        selectedCategoriesOfDisposable,
        budgetID,
        categoryItems,
        categoriesLoading
    };
};

const mapDispatchToProps = {
    amountChanged,
    getCategories,
    resetDisposableForm
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDisposable);
