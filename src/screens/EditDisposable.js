import React, {Component} from 'react';
import {Container} from 'native-base';
import {connect} from "react-redux";
import I18n from "../strings/i18n";
import {AppHeader, DisposableForm} from "../components/";
import {
    resetDisposableForm,
    disposableChanged,
    getCategories,
    calculateDisposableCategoryDifferences,
    categoriesSelected,
    setTmpDisposable,
    resetDisposableError
} from "../actions";
import {container} from "../style";
import {showWarningToast} from "../helpers";

class EditDisposable extends Component {
    componentWillMount() {
        this.props.setTmpDisposable();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.disposableError) {
            showWarningToast(nextProps.disposableError);
            this.props.resetDisposableError();
        }
    }

    onContinuePress = () => {
        if (this.props.subtractionsLoading)
            return;

        if (this.props.disposable === this.props.tmpDisposable)
            return;

        this.props.calculateDisposableCategoryDifferences(
            this.props.disposable,
            this.props.tmpDisposable,
            this.props.selectedCategories, () => {
                this.props.navigation.navigate('DisposablePreview');
            });
    };

    render() {
        return (
            <Container style={container.signedInContainer}>
                <AppHeader headerText={I18n.t('editDisposableHeader')}
                           showBackButton={true}
                           onLeftButtonPress={() => this.props.navigation.pop()}/>

                <DisposableForm disposableChanged={this.props.disposableChanged}
                                categoriesSelected={this.props.categoriesSelected}
                                categoryItems={this.props.categoryItems}
                                selectedCategories={this.props.selectedCategories}
                                budgetLoading={this.props.budgetLoading}
                                categoriesLoading={this.props.categoriesLoading}
                                disposable={this.props.disposable}
                                tmpDisposable={this.props.tmpDisposable}
                                disposableError={this.props.disposableError}
                                disposableCalculationLoading={this.props.disposableCalculationLoading}
                                disposableLoading={this.props.disposableLoading}
                                subtractionsLoading={this.props.subtractionsLoading}
                                onContinuePress={this.onContinuePress}/>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    const budgetLoading = state.budget.budgetLoading;
    const {
        disposable,
        tmpDisposable,
        disposableError,
        disposableLoading,
        disposableCalculationLoading
    } = state.disposable;
    const {
        categories,
        selectedCategories,
        categoriesLoading,
        subtractionsLoading,
        categoriesError
    } = state.category;

    const categoryItems = categories.filter((obj) => {
        return obj.amount > 0
    });

    return {
        budgetLoading,
        selectedCategories,
        categoryItems,
        categoriesLoading,
        subtractionsLoading,
        categoriesError,
        disposable,
        tmpDisposable,
        disposableError,
        disposableLoading,
        disposableCalculationLoading
    };
};

const mapDispatchToProps = {
    disposableChanged,
    getCategories,
    resetDisposableForm,
    calculateDisposableCategoryDifferences,
    categoriesSelected,
    setTmpDisposable,
    resetDisposableError
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDisposable);
