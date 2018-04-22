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
import {AppHeader, Separator, Toolbox} from "../../components/index";
import {FlatList} from "react-native";
import {connect} from "react-redux";
import I18n from "../../strings/i18n";
import {
    container,
    color,
    text
} from "../../style";
import {
    getDebts,
    getCategories,
    getBudget
} from "../../redux/actions";

class MyBudget extends Component {
    componentWillMount() {
        if (!this.props.budgetInitialized)
            this.props.getBudget(this.props.budgetID);

        if (!this.props.categoriesInitialized)
            this.props.getCategories(this.props.budgetID);

        if (!this.props.debtsInitialized)
            this.props.getDebts(this.props.budgetID);
    }

    navigateUser = (destination) => {
        this.props.navigation.navigate(destination)
    };

    render() {
        return (
            <Container style={container.signedInContainer}>
                <AppHeader headerText={I18n.t('myBudgetHeader')}
                           onLeftButtonPress={
                               () => this.props.navigation.navigate("DrawerOpen")}
                />
                <Container>
                    <View style={{flex: 0.1, justifyContent: 'center'}}>
                        {this.props.budgetLoading ? (
                            <Spinner style={{
                                alignItems: 'center',
                                justifyContent: 'center'
                            }} color='#1c313a'/>) : (
                            <View style={container.amountSummaryContainer}>
                                <Text style={[text.listText, color.darkIcon]}>{I18n.t('budgetIncome')}
                                </Text>
                                <Text style={[text.listText, color.darkIcon]}>{this.props.income} {I18n.t('currency')}
                                </Text>
                            </View>
                        )}
                    </View>
                    <Separator/>

                    <View style={{flex: 0.7}}>
                        {this.props.categoriesLoading ? (
                            <Spinner style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1
                            }} color='#1c313a'/>) : (
                            <View style={{flex: 1, alignSelf: 'stretch', paddingTop: 20}}>
                                <View style={container.amountSummaryContainer}>
                                    <Label style={[text.defaultText, color.text]}>
                                        {I18n.t('budgetExpenses')}
                                    </Label>
                                </View>
                                <FlatList
                                    data={this.props.categories}
                                    renderItem={this.renderCategory}
                                    keyExtractor={item => item.categoryTypeID}
                                />

                            </View>
                        )}

                        <Separator/>

                        {this.props.debts.length !== 0 &&
                        <View style={this.props.debts.length > 2 ?
                            {flex: 1, alignSelf: 'stretch', paddingTop: 20} :
                            {flex: 0.5, alignSelf: 'stretch', paddingTop: 20}}>
                            <View style={container.amountSummaryContainer}>
                                <Label style={[text.defaultText, color.text]}>{I18n.t('budgetDebts')}</Label>
                            </View>
                            <FlatList
                                data={this.props.debts}
                                renderItem={this.renderDebt}
                                keyExtractor={item => item.id}
                            />
                            <Separator/>
                        </View>
                        }
                    </View>

                    <View style={{flex: 0.2}}>
                        <View style={container.budgetSummary}>
                            <View style={[container.amountSummaryContainer, {paddingTop: '5%', flex: 1}]}>
                                <Text style={[text.listText, color.text]}>
                                    {I18n.t('budgetTotalExpenses')}
                                </Text>
                                <Text style={[text.listText, color.text]}>
                                    {this.props.totalGoalsAmount} {I18n.t('currency')}
                                </Text>
                            </View>

                            <View style={[container.amountSummaryContainer, {flex: 1}]}>
                                <Text style={[text.listText, color.text]}>
                                    {I18n.t('budgetDisposable')}
                                </Text>
                                <Text style={[text.listText, color.text]}>
                                    {this.props.disposable} {I18n.t('currency')}
                                </Text>
                            </View>

                            <Button transparent
                                    onPress={() => this.bottomModal.showModal()}
                                    style={[container.modalButtonContainer, {flex: 1}]}
                            >
                                <Icon name="ios-arrow-dropup-circle"
                                      style={{color: "#00263A"}}/>
                            </Button>

                            <Toolbox
                                ref={(bottomModal) => {
                                    this.bottomModal = bottomModal
                                }}
                                navigateUser={this.navigateUser}
                            />
                        </View>
                    </View>
                </Container>
            </Container>
        );
    }

    renderCategory = ({item}) => {
        return (
            <ListItem style={{paddingRight: 18}}>
                <Body>
                <Text style={[text.listText, color.text]}>{item.name}</Text>
                </Body>
                <Text style={[text.listText, color.text, {justifyContent: 'flex-end'}]}>
                    {item.amount} {I18n.t('currency')}
                </Text>
            </ListItem>
        );
    };

    renderDebt = ({item}) => {
        return (
            <ListItem style={{paddingRight: 18}}>
                <Body>
                <Text style={[text.listText, color.text]}>{item.debtData.name}</Text>
                </Body>
                <Text style={[text.listText, color.text, {justifyContent: 'flex-end'}]}>
                    {item.debtData.amountPerMonth} {I18n.t('currency')}</Text>
            </ListItem>
        );
    };
}

const mapStateToProps = (state) => {
    const {
        categories,
        categoriesLoading,
        totalGoalsAmount,
        categoriesInitialized
    } = state.category;

    const {
        debts,
        debtsInitialized
    } = state.debt;

    const {
        budgetLoading,
        income,
        destination,
        budgetID,
        budgetInitialized
    } = state.budget;

    const disposable = state.disposable.disposable;

    return {
        categories,
        budgetLoading,
        income,
        debts,
        totalGoalsAmount,
        disposable,
        destination,
        budgetID,
        categoriesLoading,
        budgetInitialized,
        categoriesInitialized,
        debtsInitialized
    }
};

export default connect(mapStateToProps, {
    getBudget, getCategories, getDebts
})(MyBudget);
