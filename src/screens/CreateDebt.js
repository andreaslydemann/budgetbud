import React, {Component} from 'react';
import {Container} from 'native-base';
import AppHeader from "../components/AppHeader";
import DebtForm from '../components/DebtForm';
import {connect} from "react-redux";
import _ from 'lodash';
import {debtSelected, deleteDebt, getDebts, resetDebtForm} from "../actions/debt_actions";
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

                <DebtForm categoryItems={this.props.categoryItems}
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
    const {categories, categoriesLoading} = state.category;

    const categoryItems = _.map(categories, (item, key) => {
        return {...item.data, debtID: item.id, key: key};
    });

    return {budgetID, categoryItems, categoriesLoading};
};

const mapDispatchToProps = {
    getCategories, resetDebtForm, debtSelected, getDebts, deleteDebt
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateDebt);
