import React, {Component} from 'react';
import {
    Body, Button, Container, Icon, ListItem, Text, View, Label, Spinner, Right,
    Grid, Row, Col
} from "native-base";
import AppHeader from "../components/AppHeader";
import Separator from "../components/Separator";
import {FlatList, StyleSheet} from "react-native";
import {connect} from "react-redux";
import {getBudget} from "../actions/budget_actions";
import Modal from 'react-native-modalbox';

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
                        <View style={styles.incomeFormStyle}>
                            <Text style={styles.textStyle}>Indkomst:</Text>
                            <Text>{this.props.income} KR</Text>
                        </View>
                        <Separator/>
                        <Grid>
                            {/*---INCOME FIELD<---*/}

                            {/*---CATEGORY LISTVIEW---*/}
                            <Row size={4}>
                                <FlatList
                                    data={this.props.categories}
                                    renderItem={this.renderCategory}
                                    keyExtractor={item => item.name}
                                    style={styles.listStyle}
                                />
                            </Row>

                            <Separator/>

                            {/*---DEBT LISTVIEW---*/}
                            <Row size={2}>
                                <FlatList
                                    data={this.props.debt}
                                    renderItem={this.renderDebt}
                                    keyExtractor={item => item.name}
                                    style={styles.listStyle}
                                />
                            </Row>

                            <Separator/>

                            {/*---CALCULATED TOTAL---*/}
                            <Row size={2}>
                                <View style={{flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between', alignItems: 'stretch', width: '100%'}}>
                                    <View style={styles.spacedText}>
                                        <Text>Totale udgifter:</Text>
                                        <Text>{this.props.totalExpenses} KR</Text>
                                    </View>
                                    <View style={styles.spacedText}>
                                        <Text>Til rådighed:</Text>
                                        <Text>{this.props.disposable} KR</Text>
                                    </View>

                                    <Button transparent
                                            onPress={() => this.refs.bottomModal.open()}
                                            style={styles.buttonStyle}
                                    >
                                        <Icon name="ios-arrow-dropup-circle"
                                              style={{color: "#1c313a"}}/>
                                    </Button>

                                    <Modal position={"bottom"} ref={"bottomModal"}>
                                        <Label style={[styles.textStyle, {
                                            alignSelf: 'center',
                                            marginTop: 10
                                        }]}>Redigér:</Label>
                                        <View style={{
                                            flex: 1,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            marginTop: 40,
                                            marginHorizontal: 40
                                        }}>
                                            <Button
                                                transparent
                                                onPress={() => this.props.navigation.navigate("EditBudget")}
                                            >
                                                <View style={styles.modalButton}>
                                                    <Icon name="md-clipboard"
                                                          style={{color: "#1c313a"}}/>
                                                    <Label style={styles.textStyle}>Budget</Label>
                                                </View>
                                            </Button>

                                            <Button
                                                transparent
                                                onPress={() => this.props.navigation.navigate("EditDisposable")}
                                            >
                                                <View style={styles.modalButton}>
                                                    <Icon name="logo-usd" style={{color: "#1c313a"}}/>
                                                    <Label style={styles.textStyle}>Rådighedsbeløb</Label>
                                                </View>
                                            </Button>

                                            <Button
                                                transparent
                                                onPress={() => this.props.navigation.navigate("DebtOverview")}
                                            >
                                                <View style={styles.modalButton}>
                                                    <Icon name="ios-archive" style={{color: "#1c313a"}}/>
                                                    <Label style={styles.textStyle}>Gæld</Label>
                                                </View>
                                            </Button>
                                        </View>
                                        <Button transparent
                                                onPress={() => this.refs.bottomModal.close()}
                                                style={styles.buttonStyle}
                                        >
                                            <Icon name="ios-arrow-dropdown-circle"
                                                  style={{color: "#1c313a"}}/>
                                        </Button>
                                    </Modal>
                                </View>
                            </Row>
                        </Grid>
                    </Container>
                )}
            </Container>
        );
    }

    renderCategory = ({item}) => {
        return (
            <ListItem>
                <Body>
                <Text>{item.name + ":"}</Text>
                </Body>
                <Right>
                    <Text style={[{flex: 1}]}>{item.amount} KR</Text>
                </Right>
            </ListItem>
        );
    };

    renderDebt = ({item}) => {
        return (
            <ListItem>
                <Body>
                <Text style={[styles.textStyle, {flex: 1}]}>{item.name + ":"}</Text>
                </Body>
                <Right>
                    <Text style={[styles.textStyle, {flex: 1}]}>{item.amount} KR</Text>
                </Right>
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
        marginTop: 10,
        marginBottom: 5,
        width: '90%',
        justifyContent: 'space-between',
        flexDirection: 'row'
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
    listStyle: {
        flexGrow: 1
    },
    textStyle: {
        fontWeight: '400',
        fontSize: 14,
        alignSelf: 'flex-start',
        marginLeft: 5,
    },
    modalButton: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = ({budget}) => {
    const {isBudgetCreated, loading, income, categories, debt, totalExpenses, disposable, estimatedIncome} = budget;
    return {isBudgetCreated, loading, income, categories, debt, totalExpenses, disposable, estimatedIncome}
};

export default connect(mapStateToProps, {
    getBudget
})(MyBudget);
