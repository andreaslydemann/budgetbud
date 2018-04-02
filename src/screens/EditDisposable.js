import React, {Component} from 'react';
import {Container} from 'native-base';
import {connect} from "react-redux";
import _ from 'lodash';
import I18n from "../strings/i18n";
import {AppHeader, DisposableForm} from "../components/";
import {
    resetDisposableForm,
    disposableChanged,
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

                <DisposableForm disposableChanged={this.props.disposableChanged}
                                selectedCategories={this.props.categoriesOfDebtIDs}
                                disposable={this.props.disposable}
                                categoryItems={this.props.categoryItems}
                                categoriesLoading={this.props.categoriesLoading}
                                onContinuePress={this.onContinuePress}/>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const budgetID = state.budget.budgetID;
    const {disposable} = state.disposable;
    const {
        categories,
        categoriesOfDebt,
        categoriesLoading,
    } = state.category;

    const categoryItems = _.map(categories, (item, key) => {
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

    return {
        disposable,
        budgetID,
        categoryItems,
        categoriesLoading
    };
};

const mapDispatchToProps = {
    disposableChanged,
    getCategories,
    resetDisposableForm
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDisposable);
