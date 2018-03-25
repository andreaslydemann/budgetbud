import React, {PureComponent} from 'react';
import {View, FlatList} from 'react-native';
import {Container, Button, ListItem, Body, Right, Icon, Text, Spinner} from 'native-base';
import Separator from '../components/Separator';
import {connect} from 'react-redux';
import _ from 'lodash';
import {resetDebtForm, debtSelected, getDebts, deleteDebt} from "../actions/debt_actions";
import AppHeader from "../components/AppHeader";
import ConfirmDialog from '../components/ConfirmDialog';

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
        this.props.deleteDebt(this.props.selectedDebt.debtID);
    };

    onDebtSelect = ({key, debtID}) => {
        this.props.debtSelected(key, debtID);
    };

    render() {
        return (
            <Container>
                <ConfirmDialog
                    title="Bekræft sletning"
                    text="Er du sikker på, at du vil slette den valgte gæld?"
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
                                data={this.props.debtItems}
                                renderItem={this.renderItem}
                            />
                        )}
                    </Container>

                    <Separator/>

                    <Button rounded
                            onPress={() => this.onCreateDebtPress()}
                            style={styles.buttonStyle}
                    >
                        <Text style={styles.itemStyle}>Opret gæld</Text>
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
                <Text note>{item.totalAmount} kr</Text>
                </Body>
                <Right>
                    <View style={{flexDirection: 'row'}}>
                        <Icon style={{marginRight: 7, fontSize: 30}} name="md-create"/>
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

const styles = {
    buttonStyle: {
        width: '90%',
        height: 40,
        backgroundColor: '#1c313a',
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    itemStyle: {
        fontWeight: '600',
        alignSelf: 'center',
        color: 'white'
    }
};

const mapStateToProps = (state) => {
    const budgetID = state.budget.budgetID;
    const {loading, selectedDebt} = state.debt;

    const debtItems = _.map(state.debt.debtItems, (item, key) => {
        return {...item.data, debtID: item.id, key: key};
    });

    return {budgetID, debtItems, loading, selectedDebt};
};

const mapDispatchToProps = {
    resetDebtForm, debtSelected, getDebts, deleteDebt
};

export default connect(mapStateToProps, mapDispatchToProps)(DebtOverview);
