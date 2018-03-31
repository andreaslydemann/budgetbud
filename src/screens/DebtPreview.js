import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {
    Container,
    Content,
    Button,
    ListItem,
    Body,
    Right,
    Text
} from "native-base";
import _ from 'lodash';
import {AppHeader, Separator} from "../components/";
import {connect} from "react-redux";
import {button, text, container} from "../style/";
import {createDebt} from "../actions";
import I18n from "../strings/i18n";

class DebtPreview extends Component {
    onSavePress = () => {
        this.props.createDebt(this.props, () => {
            this.props.navigation.pop(2);
        });
    };

    render() {
        return (
            <Container>
                <AppHeader headerText={I18n.t('debtPreviewHeader')}
                           showBackButton={true}
                           onLeftButtonPress={() => this.props.navigation.pop()}/>

                <Content style={{flex: 4}}>
                    <FlatList
                        data={this.props.categoryDebtItems}
                        renderItem={this.renderItem}
                    />
                </Content>

                <Separator/>

                <Button rounded
                        onPress={() => this.onSavePress()}
                        style={button.defaultButton}
                >
                    <Text style={text.submitButtonText}>
                        {I18n.t('debtPreviewSaveButton')}
                    </Text>
                </Button>
            </Container>
        );
    }

    renderItem = ({item}) => {
        return (
            <ListItem>
                <View style={container.fullWidth}>
                    <Body>
                    <Text>{item.name}</Text>
                    </Body>
                    <View style={[container.removeIndenting, {flexDirection: 'row'}]}>
                        <Body style={{flex: 1}}>
                        <Text note>{I18n.t('debtPreviewBefore')}</Text>
                        <Text note>{I18n.t('debtPreviewAfter')}</Text>
                        </Body>
                        <Right style={{flex: 2}}>
                            <Text note>{item.beforeAmount} {I18n.t('currency')}</Text>
                            <Text note>{item.afterAmount} {I18n.t('currency')} (-
                                {item.amountToSubtract} {I18n.t('currency')})
                            </Text>
                        </Right>
                    </View>
                </View>
            </ListItem>
        );
    }
}

const mapStateToProps = (state) => {
    const budgetID = state.budget.budgetID;
    const {name, amount, expirationDate} = state.debt;
    const {
        categories,
        categoriesOfDebt,
        categorySubtractions,
    } = state.category;

    const categoryDebtItems = _.map(categoriesOfDebt, (item, key) => {
        const categorySubtraction = categorySubtractions.filter((obj) => {
            return obj.categoryID === item.toString();
        });

        const category = categories.filter((obj) => {
            return obj.id === item.toString();
        });

        const amountToSubtract = categorySubtraction[0].amountToSubtract;
        const beforeAmount = category[0].categoryData.amount;

        return {
            amountToSubtract: amountToSubtract,
            beforeAmount: beforeAmount,
            afterAmount: (beforeAmount - amountToSubtract),
            name: category[0].categoryData.name,
            categoryID: item,
            key: key
        };
    });

    return {
        name,
        amount,
        expirationDate,
        categoriesOfDebt,
        categorySubtractions,
        categoryDebtItems,
        budgetID,
    };
};

const mapDispatchToProps = {
    createDebt
};

export default connect(mapStateToProps, mapDispatchToProps)(DebtPreview);
