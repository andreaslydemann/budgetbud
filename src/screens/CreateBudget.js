import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import {Container} from 'native-base';
import {connect} from 'react-redux';
import {incomeChanged, categoryChanged, createBudget} from '../actions/index';
import CreateBudgetForm from "../components/CreateBudgetForm";


class CreateBudget extends Component {

    onIncomeChange = (text) => {
        console.log("hello");
        this.props.incomeChanged(text);
    };

    onCategoryChange = (text) => {
        this.props.categoryChanged(text);
    };

    handleSubmit = () => {
        Keyboard.dismiss();
        const {income, category} = this.props;
        this.props.createBudget({income, category}, () => {
            this.props.navigation.navigate('MyBudget');
        });
    };

    render() {
        return (
            <Container style={[{alignItems: 'stretch'}]}>
                <CreateBudgetForm handleSubmit={this.handleSubmit}
                                  onIncomeChanged={this.onIncomeChange}
                                  onCategoryChanged={this.onCategoryChange}
                                  income={this.props.income}
                                  category={this.props.category}
                                  loading={this.props.loading}
                                  error={this.props.error}

                />
            </Container>
        );
    }
}

const mapStateToProps = ({budget}) => {
    const {income, category} = budget;
    return {income, category}
};

export default connect(mapStateToProps, {
    createBudget, incomeChanged, categoryChanged
})(CreateBudget);
