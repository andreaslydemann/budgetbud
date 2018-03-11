import React, {Component} from 'react';
import {Keyboard} from 'react-native';
import {Button, Container, Form, Spinner, Text} from 'native-base';
import {connect} from 'react-redux';
import CurrencyInput from 'react-currency-input';
import {incomeChanged, categoryChanged, createBudget, openDrawer} from '../actions/index';
import CreateBudgetForm from "../components/BudgetForm";
import {editBudget, getInitialState} from "../actions/budget_actions";

class EditBudget extends Component {
    onIncomeChange = (text) => {
        console.log("Income change");
        this.props.incomeChanged(text);
    };

    onCategoryChange = (text) => {
        console.log("BEFORE: Category change " + text);
        this.props.categoryChanged(text);
    };

    handleSubmit = () => {
        console.log("Submit");
        Keyboard.dismiss();
        const {income, categoryValue} = this.props;
        this.props.editBudget({income, categoryValue}, () => {
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
                                  isBudgetCreated={false}
                                  isEditBudget={false}
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
    const {income, categoryValue, data} = budget;
    return {income, categoryValue, data}
};

export default connect(mapStateToProps, {
    openDrawer, editBudget,
    incomeChanged, categoryChanged
})(EditBudget);
