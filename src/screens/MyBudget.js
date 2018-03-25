import React, {Component} from 'react';
import {
    Body, Button, Container, Icon, ListItem, Text, View, Label, Spinner, Right,
    Grid, Row, Col, Left
} from "native-base";
import AppHeader from "../components/AppHeader";
import Separator from "../components/Separator";
import {FlatList, StyleSheet} from "react-native";
import {connect} from "react-redux";
import {getBudget} from "../actions/budget_actions";
import ModalBox from "../components/ModalBox";

class MyBudget extends Component {
    componentWillMount() {
        this.props.getBudget(() => {
            this.props.navigation.navigate('CreateBudget');
        });
    }

    render() {
        return (
            <Container style={{flexGrow: 1}}>
                {/*---HEADER---*/}
                <AppHeader headerText={'Mit budget'}
                           onLeftButtonPress={() => this.props.navigation.navigate("DrawerOpen")}/>

                {this.props.loading ? (
                    <Spinner style={{
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} color='#1c313a'/>) : (

                    <Container>
                        {/*---INCOME FIELD<---*/}
                        <View style={[styles.incomeFormStyle, {flex: 0.1, alignItems: 'center'}]}>
                            <Text style={styles.listText}>Indkomst</Text>
                            <Text style={styles.listText}>{this.props.income} KR</Text>
                        </View>
                        <Separator/>
                        {/*---CATEGORY LISTVIEW---*/}
                        <View style={{flex: 0.7, alignSelf: 'stretch'}}>
                            <View style={styles.incomeFormStyle}>
                                <Label style={styles.textStyle}>Dine udgiftsposter</Label>
                            </View>
                            <FlatList
                                data={this.props.categories}
                                renderItem={this.renderCategory}
                                keyExtractor={item => item.name}
                            />
                        </View>

                        <Separator/>

                        {this.props.isDebtLoaded &&
                        <View style={{flex: 0.25, alignSelf: 'stretch'}}>
                            <View style={styles.incomeFormStyle}>
                                <Label style={styles.textStyle}>Dine gældsposter</Label>
                            </View>
                            <FlatList
                                data={this.props.debt}
                                renderItem={this.renderDebt}
                                keyExtractor={item => item.name}
                            />
                            <Separator/>
                        </View>
                        }


                        {/*---CALCULATED TOTAL---*/}
                        <View style={[styles.newStyle]}>
                            <View style={styles.budgetSummary}>
                                <View style={styles.incomeFormStyle}>
                                    <Text style={styles.listText}>Totale udgifter</Text>
                                    <Text style={styles.listText}>{this.props.totalExpenses} KR</Text>
                                </View>
                                <View style={styles.incomeFormStyle}>
                                    <Text style={styles.listText}>Til rådighed</Text>
                                    <Text style={styles.listText}>{this.props.disposable} KR</Text>
                                </View>

                                <Button transparent
                                        onPress={() => this.refs.bottomModal.open()}
                                        style={styles.buttonStyle}
                                >
                                    <Icon name="ios-arrow-dropup-circle"
                                          style={{color: "#1c313a"}}/>
                                </Button>

                                <ModalBox/>
                            </View>
                        </View>
                    </Container>
                )}
            </Container>
        );
    }

    renderCategory = ({item}) => {
        return (
            <ListItem>
                <Body>
                <Text style={styles.listText}>{item.name}</Text>
                </Body>
                    <Text style={[styles.listText, {justifyContent: 'flex-end', marginRight: '5%'}]}>{item.amount} KR</Text>
            </ListItem>
        );
    };

    renderDebt = ({item}) => {
        return (
            <ListItem>
                <Body>
                <Text style={styles.textStyle}>{item.name}</Text>
                </Body>
                    <Text style={[styles.listText, {justifyContent: 'flex-end', marginRight: '5%'}]}>{item.amount} KR</Text>
            </ListItem>
        );
    };
}

const styles = StyleSheet.create({
    buttonStyle: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end'
    },
    incomeFormStyle: {
        alignSelf: 'center',
        width: '90%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: '3%'
    },
    newStyle: {
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flex: 0.30
    },
    itemStyle: {
        fontWeight: '600',
        alignSelf: 'flex-start',
        color: 'white'
    },
    spacedText: {
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: '5%',
        marginVertical: 10
    },
    budgetSummary: {
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        width: '100%'
    },
    textStyle: {
        fontWeight: '400',
        fontSize: 14,
        alignSelf: 'flex-start',
        marginLeft: 5,
    },
    listText: {
        alignSelf: 'flex-start',
        marginLeft: 5,
        fontSize: 16
    },
    modalButton: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = ({budget}) => {
    const {isBudgetCreated, loading, income, categories, debt, totalExpenses, disposable, estimatedIncome, isDebtLoaded} = budget;
    return {isBudgetCreated, loading, income, categories, debt, totalExpenses, disposable, estimatedIncome, isDebtLoaded}
};

export default connect(mapStateToProps, {
    getBudget
})(MyBudget);
