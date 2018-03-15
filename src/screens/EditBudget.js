import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import {Button, Container, Form, Spinner, Text} from 'native-base';
import {connect} from 'react-redux';
import {incomeChanged, categoryChanged, createBudget, openDrawer} from '../actions/index';
import BudgetForm from "../components/BudgetForm";
import {editBudget, getInitialState} from "../actions/budget_actions";
import AppHeader from "../components/AppHeader";

class EditBudget extends Component {
    onIncomeChange = (text) => {
        this.props.incomeChanged(text);
    };

    onCategoryChange = (text) => {
        this.props.categoryChanged(text);
    };

    handleSubmit = () => {
        Keyboard.dismiss();
        const {income, categoryValue} = this.props;
        this.props.editBudget({income, categoryValue}, () => {
            this.props.navigation.navigate.pop();
        });
    };

    onMenuPressed = () => {
        this.props.openDrawer(() => {
            this.props.navigation.navigate('DrawerOpen');
        });
    };

    render() {
        return (
            <Container style={[{alignItems: 'stretch'}]}>
                {/*---HEADER---*/}
                <AppHeader headerText={'Redigér budget'}
                           showBackButton={true}
                           onLeftButtonPress={() => this.props.navigation.pop()}/>

                <BudgetForm onMenuPressed={this.onMenuPressed}
                            onIncomeChanged={this.onIncomeChange}
                            onCategoryChanged={this.onCategoryChange}
                            handleSubmit={this.handleSubmit}
                            income={this.props.income}
                            categoryValue={this.props.categoryValue}
                            expenses={this.props.expenses}
                            disposable={this.props.disposable}
                            estimatedIncome={this.props.estimatedIncome}
                            category={this.props.category}
                            debt={this.props.debt}
                            loading={this.props.loading}
                            error={this.props.error}
                />

                {/*---BUTTONS---*/}
                <Form style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Button rounded
                            onPress={() => this.props.navigation.pop()}
                            style={styles.buttonStyle}
                    >
                        <Text style={styles.itemStyle}>Afbryd</Text>
                    </Button>

                    <Button rounded
                            onPress={this.props.handleSubmit}
                            style={styles.buttonStyle}
                    >
                        {this.props.loading ? (
                            <Spinner color='#D0D0D0'/>) : (
                            <Text style={styles.itemStyle}>Gem</Text>
                        )}
                    </Button>
                </Form>
            </Container>
        );
    }
}

const styles = {
    buttonStyle: {
        width: '30%',
        height: 40,
        backgroundColor: '#1c313a',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    itemStyle: {
        fontWeight: '600',
        alignSelf: 'flex-start',
        color: 'white'
    }
};

const mapStateToProps = ({budget}) => {
    const {income, categoryValue, category, debt, expenses, disposable, estimatedIncome} = budget;
    return {income, categoryValue, category, debt, expenses, disposable, estimatedIncome}
};

export default connect(mapStateToProps, {
    openDrawer, editBudget,
    incomeChanged, categoryChanged
})(EditBudget);
