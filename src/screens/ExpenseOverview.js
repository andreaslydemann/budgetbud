import React, {Component} from 'react';
import {
    Body,
    Button,
    Container,
    Icon,
    ListItem,
    Text,
    View,
    Label,
    Spinner
} from "native-base";
import {AppHeader, Separator} from "../components/";
import {FlatList, StyleSheet} from "react-native";
import {connect} from "react-redux";
import {getBudget, getCategories, getDebts} from "../actions";
import I18n from "../strings/i18n";
import {container} from "../style";

class ExpenseOverview extends Component {
    componentWillMount() {
        this.props.getBudget(this.props.budgetID);
        this.props.getCategories(this.props.budgetID);
    }

    navigateUser = (destination) => {
        this.props.navigation.navigate(destination)
    };

    render() {
        return (
            <Container style={container.signedInContainer}>
                <AppHeader headerText={I18n.t('expenseOverviewHeader')}
                           onLeftButtonPress={() => this.props.navigation.navigate("DrawerOpen")}/>
                <Container>
                    {this.props.budgetLoading ? (
                        <Spinner style={{
                            flex: 1
                        }} color='#1c313a'/>) : (
                        <Container>
                            <View style={{flex: 0.82, paddingTop: 20}}>
                                    <View style={[styles.incomeFormStyle,]}>
                                        <Label style={styles.textStyle}>{I18n.t('budgetExpenses')}
                                        </Label>
                                    </View>
                                    <FlatList
                                        data={this.props.categories}
                                        renderItem={this.renderCategory}
                                        keyExtractor={item => item.id}
                                    />
                                <Separator/>
                            </View>

                            <View style={{flex: 0.18}}>
                                <View style={[styles.budgetSummary, {paddingVertical: '5%', }]}>
                                    <View style={[styles.incomeFormStyle, {flex: 1}]}>
                                        <Text style={styles.listText}>
                                            {I18n.t('budgetTotalExpenses')}
                                        </Text>
                                        <Text style={styles.listText}>
                                            {this.props.totalExpenses} {I18n.t('currency')}
                                        </Text>
                                    </View>
                                    <View style={[styles.incomeFormStyle, {flex: 1}]}>
                                        <Text style={styles.listText}>
                                            {I18n.t('budgetDisposable')}
                                        </Text>
                                        <Text style={styles.listText}>
                                            {this.props.disposable} {I18n.t('currency')}
                                        </Text>
                                    </View>
                                    <View style={[styles.incomeFormStyle, {flex: 1}]}>
                                        <Text style={styles.listText}>
                                            {I18n.t('budgetDisposable')}
                                        </Text>
                                        <Text style={styles.listText}>
                                            {this.props.disposable} {I18n.t('currency')}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </Container>
                    )}
                </Container>
            </Container>
        );
    }

    renderCategory = ({item}) => {
        return (
            <ListItem style={{paddingLeft: 6, paddingRight: 18}}>
                <Body>
                <Text style={styles.listText}>{item.categoryData.name}</Text>
                </Body>
                <Text style={[styles.listText, {justifyContent: 'flex-end'}]}>
                    {item.categoryData.amount} {I18n.t('currency')}
                </Text>
            </ListItem>
        );
    };
}

const styles = StyleSheet.create({
    buttonStyle: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        paddingBottom: 10
    },
    incomeFormStyle: {
        alignSelf: 'center',
        width: '90%',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    expenseListStyle: {
        alignSelf: 'center',
        width: '90%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingTop: 23
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
        marginBottom: 0,
        justifyContent: 'space-between',
        flex: 1
    },
    textStyle: {
        fontWeight: '400',
        fontSize: 14,
        alignSelf: 'flex-start',
        marginLeft: 5,
    },
    listText: {
        marginLeft: 5,
        alignSelf: 'flex-start',
        fontSize: 16
    },
    modalButton: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const mapStateToProps = (state) => {
    const categories = state.category.categories;
    const {
        budgetLoading,
        income,
        totalExpenses,
        disposable,
        destination,
        budgetID
    } = state.budget;

    return {
        categories,
        budgetLoading,
        income,
        totalExpenses,
        disposable,
        destination,
        budgetID
    }
};

export default connect(mapStateToProps, {
    getBudget, getCategories, getDebts
})(ExpenseOverview);
