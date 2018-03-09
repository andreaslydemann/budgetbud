import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import {Container} from 'native-base';
import {connect} from 'react-redux';
import {incomeChanged, categoryChanged, createBudget, openDrawer} from '../actions/index';
import CreateBudgetForm from "../components/CreateBudgetForm";
import {loadInitialState} from "../actions/budget_actions";

class CreateBudget extends Component {

    // loadInitialState = () => {
    //     console.log("hej");
    //     this.props.loadInitialState();
    // };

    onIncomeChange = (text) => {
        console.log("Income change");
        this.props.incomeChanged(text);
    };

    onCategoryChange = (text) => {
        console.log("BEFORE: Category change " + text);
        this.props.categoryChanged(text);
        console.log("AFTER: Category change " + text);
    };

    handleSubmit = () => {
        console.log("Submit");
        Keyboard.dismiss();
        const {income, categoryValue} = this.props;
        this.props.createBudget({income, categoryValue}, () => {
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
                                  categoryValue={this.props.categoryValue}
                                  data={this.props.data}
                                  loading={this.props.loading}
                                  error={this.props.error}
                />
            </Container>
        );
    }
}

const mapStateToProps = ({budget}) => {
    const {income, categoryValue, data} = budget;
    return {income, categoryValue, data}
};

export default connect(mapStateToProps, { openDrawer,
    createBudget, incomeChanged, categoryChanged
})(CreateBudget);
