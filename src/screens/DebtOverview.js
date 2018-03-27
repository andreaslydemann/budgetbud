import React, {PureComponent} from 'react';
import {View, FlatList} from 'react-native';
import {Container, Button, ListItem, Body, Right, Icon, Text, Spinner} from 'native-base';
import {connect} from 'react-redux';
import _ from 'lodash';
import {resetDebtForm, debtSelected, getDebts, deleteDebt} from "../actions/debt_actions";
import {AppHeader, ConfirmDialog, Separator} from "../components/";
import {button} from "../style/button";

class DebtOverview extends PureComponent {
    componentWillMount() {
        this.props.getDebts(this.props.budgetID);
    }

    onCreateDebtPress = () => {
        this.props.resetDebtForm(() => {
            this.props.navigation.navigate('CreateDebt');
        });
    };

    deleteDebt = () => {
        this.confirmDialog.dismissDialog();
        this.props.deleteDebt(this.props.selectedDebtID);
    };

    onDebtSelect = (debt) => {
        this.props.debtSelected(debt);
    };

    render() {
        return (
            <Container>
                <ConfirmDialog
                    title="Bekræft sletning"
                    text="Vil du slette den valgte gæld?"
                    confirmCallback={() => this.deleteDebt()}
                    loading={this.props.loading}
                    ref={(confirmDialog) => {
                        this.confirmDialog = confirmDialog
                    }}
                />

                <Container>
                    <AppHeader headerText={'Gældsoversigt'}
                               showBackButton={true}
                               onLeftButtonPress={() => this.props.navigation.pop()}/>

                    <Container style={{flex: 4, justifyContent: 'center'}}>
                        {this.props.loading ? (
                            <Spinner style={{
                                alignItems: 'center',
                                justifyContent: 'center'
                            }} color='#1c313a'/>) : (

                            <FlatList
                                data={this.props.debts}
                                renderItem={this.renderItem}
                            />
                        )}
                    </Container>

                    <Separator/>

                    <Button rounded
                            onPress={() => this.onCreateDebtPress()}
                            style={button.defaultButton}
                    >
                        <Text style={text.submitButtonText}>Opret gæld</Text>
                    </Button>
                </Container>
            </Container>
        );
    }

    renderItem = ({item}) => {
        return (
            <ListItem>
                <Body>
                <Text>{item.name}</Text>
                <Text note>{item.amount} kr</Text>
                </Body>
                <Right>
                    <View style={{flexDirection: 'row'}}>
                        <Icon
                            onPress={() => {
                                this.onDebtSelect(item);
                                this.props.navigation.navigate('EditDebt');
                            }}
                            style={{marginRight: 7, fontSize: 30}}
                            name="md-create"/>
                        <Icon
                            onPress={() => {
                                this.onDebtSelect(item);
                                this.confirmDialog.showDialog()
                            }}
                            style={{marginHorizontal: 7, fontSize: 30}}
                            name="md-trash"/>
                    </View>
                </Right>
            </ListItem>
        );
    }
}

const mapStateToProps = (state) => {
    const budgetID = state.budget.budgetID;
    const {loading, selectedDebtID} = state.debt;

    const debts = _.map(state.debt.debts, (item, key) => {
        return {...item.debtData, debtID: item.id, key: key};
    });

    return {budgetID, debts, loading, selectedDebtID};
};

const mapDispatchToProps = {
    resetDebtForm, debtSelected, getDebts, deleteDebt
};

export default connect(mapStateToProps, mapDispatchToProps)(DebtOverview);
