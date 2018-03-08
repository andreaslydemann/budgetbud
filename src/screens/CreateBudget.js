import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import {Container} from 'native-base';
import {connect} from 'react-redux';
import {incomeChanged, categoryChanged, createBudget, openDrawer} from '../actions/index';
import CreateBudgetForm from "../components/CreateBudgetForm";

class CreateBudget extends Component {

    onIncomeChange = (text) => {
        console.log("Income change");
        this.props.incomeChanged(text);
    };

    onCategoryChange = (text) => {
        console.log("Category change");
        this.props.categoryChanged(text);
    };

    handleSubmit = () => {
        console.log("Submit");
        Keyboard.dismiss();
        const {income, category} = this.props;
        this.props.createBudget({income, category}, () => {
            this.props.navigation.navigate('MyBudget');
        });
    };

    onMenuPressed = () => {
        console.log("Menu pressed");
        this.props.openDrawer(() => {
            this.props.navigation.navigate('DrawerOpen');
        });
    };

    render() {
        return (
            <Container style={[{alignItems: 'stretch'}]}>
                <CreateBudgetForm onMenuPressed={this.onMenuPressed}
                                  onIncomeChanged={this.onIncomeChange}
                                  onCategoryChanged={this.onCategoryChange}
                                  handleSubmit={this.handleSubmit}
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

export default connect(mapStateToProps, {openDrawer,
    createBudget, incomeChanged, categoryChanged
})(CreateBudget);
