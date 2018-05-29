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
import {SectionList} from "react-native";
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
        if (!this.props.debtsInitialized)
            this.props.getDebts(this.props.budgetID);

        if (!this.props.categoriesInitialized)
            this.props.getCategories(this.props.budgetID);

        if (!this.props.budgetInitialized)
            this.props.getBudget(this.props.budgetID);
    }

    navigateUser = (destination) => {
        this.props.navigation.navigate(destination)
    };

    render() {
        return (
            <Container style={container.signedInContainer}>
                <AppHeader headerText={I18n.t('myBudgetHeader')}
                           infoText={I18n.t('myBudgetInfo')}
                           onLeftButtonPress={
                               () => this.props.navigation.navigate("DrawerOpen")}
                />
                <Container>
                    <View style={{flex: 0.1, justifyContent: 'center'}}>
                        {this.props.budgetLoading ? (
                            <View style={container.amountSummaryContainer}/>) : (
                            <View style={container.amountSummaryContainer}>
                                <Text style={[text.listText, color.text]}>{I18n.t('budgetIncome')}
                                </Text>
                                <Text style={[text.listText, color.text]}>{this.props.income} {I18n.t('currency')}
                                </Text>
                            </View>
                        )}
                    </View>
                    <Separator/>
                    {this.props.categoriesLoading || this.props.debtLoading || this.props.budgetLoading ? (
                        <View style={{flex: 0.7}}>
                            <Spinner style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1
                            }} color='#1c313a'/>
                            <Separator/>
                        </View>) : (
                        <View style={{flex: 0.7}}>
                            <SectionList
                                renderItem={this.renderSection}
                                renderSectionHeader={this.renderSectionHeader}
                                sections={this.sectionList()}
                                keyExtractor={item => {
                                    return (item.categoryTypeID ? item.categoryTypeID : item.id)
                                }}
                            />
                            <Separator/>
                        </View>
                    )}

                    <View style={{flex: 0.2}}>
                        <View style={container.budgetSummary}>

                            {this.props.budgetLoading ? (
                                <View style={{
                                    flex: 0.6
                                }}/>) : (
                                <View style={{
                                    justifyContent: 'space-between',
                                    flex: 0.6
                                }}>
                                    <View style={[container.amountSummaryContainer, {paddingTop: '5%', flex: 1}]}>
                                        <Text style={[text.listText, color.text]}>
                                            {I18n.t('budgetTotalExpenses')}
                                        </Text>
                                        <Text style={[text.listText, color.text]}>
                                            {this.props.totalGoalsAmount} {I18n.t('currency')}
                                        </Text>
                                    </View>

                                    <View style={[container.amountSummaryContainer, {paddingTop: '4%', flex: 1}]}>
                                        <Text style={[text.listText, color.text]}>
                                            {I18n.t('budgetDisposable')}
                                        </Text>
                                        <Text style={[text.listText, color.text]}>
                                            {this.props.disposable} {I18n.t('currency')}
                                        </Text>
                                    </View>
                                </View>
                            )}

                            <Button transparent
                                    onPress={() => this.bottomModal.showModal()}
                                    style={[container.modalButtonContainer, {flex: 0.4}]}
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

    sectionList = () => {
        return ([
            {data: this.props.categories, title: I18n.t('budgetExpenses'), isCategorySection: true},
            {data: this.props.debts, title: I18n.t('budgetDebts'), isCategorySection: false},
        ])
    };

    renderSectionHeader = ({section}) => {
        return (
            (this.props.debts.length || section.isCategorySection) ?
                <View
                    style={[container.amountSummaryContainer, color.sectionHeader, {paddingVertical: 5}]}>
                    <Label style={[text.defaultText, color.white]}>{section.title}</Label>
                </View> :
                <View/>
        );
    };

    renderSection = (sectionElement) => {
        const section = sectionElement.section;
        const item = sectionElement.item;

        return (
            <ListItem style={{paddingRight: 18}}>
                <Body>
                <Text
                    style={[text.listText, color.text]}>{section.isCategorySection ? item.name : item.debtData.name}</Text>
                </Body>
                <Text style={[text.listText, color.text, {justifyContent: 'flex-end'}]}>
                    {section.isCategorySection ? item.amount : item.debtData.amountPerMonth} {I18n.t('currency')}
                </Text>
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
        debtsInitialized,
        debtLoading
    } = state.debt;

    const {
        income,
        destination,
        budgetID,
        budgetLoading,
        budgetInitialized
    } = state.budget;

    const {disposable} = state.disposable;

    return {
        categories,
        budgetLoading,
        income,
        debts,
        debtLoading,
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
