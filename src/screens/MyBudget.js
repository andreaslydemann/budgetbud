import React, {Component} from 'react';
import {Body, Button, Container, Form, Icon, ListItem, Text, View, Label, Spinner, Left, Right} from "native-base";
import AppHeader from "../components/AppHeader";
import Separator from "../components/Separator";
import {FlatList} from "react-native";
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
            <Container style={{alignItems: 'stretch', flex: 1}}>
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
                    <View style={{flexBasis: '10%'}}>
                        <View style={[styles.leftContainer, {marginTop: 10}]}>
                            <Text style={styles.textStyle}>Indkomst:</Text>
                            <Text style={styles.textStyle}>{this.props.income} KR</Text>
                        </View>
                    </View>

                        <Separator/>

                        {/*---CATEGORY LISTVIEW---*/}
                        <View style={{flex: 4, flexBasis: '50%'}}>
                            <FlatList
                                data={this.props.categories}
                                renderItem={this.renderCategory}
                                keyExtractor={item => item.name}
                                style={styles.listStyle}
                            />
                        </View>

                        <Separator/>

                        {/*---DEBT LISTVIEW---*/}
                        <View style={{flexGrow: 2, alignSelf: 'stretch'}}>
                            <FlatList
                                data={this.props.debt}
                                renderItem={this.renderDebt}
                                keyExtractor={item => item.name}
                                style={styles.listStyle}
                            />
                        </View>

                        <Separator/>


                        {/*---CALCULATED TOTAL---*/}
                        <View style={{flexGrow: 2, alignSelf: 'stretch'}}>
                            <View style={[styles.leftContainer, {marginTop: 10}]}>
                                <Text style={styles.textStyle}>Totale udgifter:</Text>
                                <Text style={styles.textStyle}>{this.props.totalExpenses} KR</Text>
                            </View>
                            <View style={[styles.leftContainer]}>
                                <Text style={styles.textStyle}>Til rådighed:</Text>
                                <Text style={styles.textStyle}>{this.props.disposable} KR</Text>
                            </View>

                            <Button transparent
                                    onPress={() => this.refs.bottomModal.open()}
                                    style={styles.buttonStyle}
                            >
                                <Icon name="ios-arrow-dropup-circle"
                                      style={{color: "#1c313a"}}/>
                            </Button>

                            <Modal style={styles.modal} position={"bottom"} ref={"bottomModal"}>
                                <Label style={[styles.textStyle, {alignSelf: 'center', marginTop: 10}]}>Redigér:</Label>
                                <Form style={{
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
                                        <View style={{
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Icon name="md-clipboard" style={{color: "#1c313a"}}/>
                                            <Label style={styles.textStyle}>Budget</Label>
                                        </View>
                                    </Button>

                                    <Button
                                        transparent
                                        onPress={() => this.props.navigation.navigate("EditDisposable")}
                                    >
                                        <View style={{
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Icon name="logo-usd" style={{color: "#1c313a"}}/>
                                            <Label style={styles.textStyle}>Rådighedsbeløb</Label>
                                        </View>
                                    </Button>

                                    <Button
                                        transparent
                                        onPress={() => this.props.navigation.navigate("DebtOverview")}
                                    >
                                        <View style={{
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            <Icon name="ios-archive" style={{color: "#1c313a"}}/>
                                            <Label style={styles.textStyle}>Gæld</Label>
                                        </View>
                                    </Button>
                                </Form>
                                <Button transparent
                                        onPress={() => this.refs.bottomModal.close()}
                                        style={styles.buttonStyle}
                                >
                                    <Icon name="ios-arrow-dropdown-circle"
                                          style={{color: "#1c313a"}}/>
                                </Button>
                            </Modal>
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
                <Text style={[styles.textStyle, {flex: 1}]}>{item.name + ":"}</Text>
                </Body>
                <Right>
                    <Text style={[styles.textStyle, {flex: 1}]}>{item.amount} KR</Text>
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

const styles = {
    buttonStyle: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end'
    },
    incomeFormStyle: {
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 5,
        width: '90%'
    },
    itemStyle: {
        fontWeight: '600',
        alignSelf: 'flex-start',
        color: 'white'
    },
    leftContainer: {
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: '10%',
        marginRight: '10%'
    },
    listStyle: {
        flexGrow: 1
    },
    textStyle: {
        fontWeight: '400',
        fontSize: 18,
        alignSelf: 'flex-start',
        marginLeft: 5,
    },
    inputStyle: {
        borderColor: '#001',
        marginLeft: 0,
        marginRight: 0,
        marginTop: 5,
        marginBottom: 5,
        paddingLeft: 0,
        paddingRight: 0,
        alignSelf: 'center',
        height: 40
    },
    modalStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 300,
        backgroundColor: '#166a97'
    }
};

const mapStateToProps = ({budget}) => {
    const {isBudgetCreated, loading, income, categories, debt, totalExpenses, disposable, estimatedIncome} = budget;
    return {isBudgetCreated, loading, income, categories, debt, totalExpenses, disposable, estimatedIncome}
};

export default connect(mapStateToProps, {
    getBudget
})(MyBudget);
