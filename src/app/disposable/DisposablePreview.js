import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {
    Container,
    Content,
    Button,
    Spinner,
    ListItem,
    Body,
    Right,
    Text
} from "native-base";
import _ from 'lodash';
import {AppHeader, Separator} from "../../components";
import {connect} from "react-redux";
import I18n from "../../strings/i18n";
import {button, text, container, color} from "../../style";
import {showWarningToast} from "../../helpers";
import {editDisposable, resetDisposableError, getCategories} from "../../redux/actions";

class DisposablePreview extends Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.disposableError) {
            showWarningToast(nextProps.disposableError);
            this.props.resetDisposableError();
        }
    }

    onSavePress = async () => {
        if (this.props.disposableLoading)
            return;

        await this.props.editDisposable(this.props);
        this.props.navigation.pop(2);
        this.props.getCategories(this.props.budgetID);
    };

    render() {
        return (
            <Container style={container.signedInContainer}>
                <AppHeader headerText={I18n.t('disposablePreviewHeader')}
                           showBackButton={true}
                           onLeftButtonPress={() => {
                               if (!this.props.disposableLoading) {
                                   this.props.navigation.pop();
                               }
                           }}/>

                <Content style={{flex: 4}}>
                    <FlatList
                        data={this.props.categoryDisposableItems}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.categoryID}
                    />
                </Content>

                <Separator/>

                <Button rounded
                        onPress={() => this.onSavePress()}
                        style={[button.defaultButton, color.button]}
                >
                    {this.props.disposableLoading ? (
                        <Spinner color='#D0D0D0'/>) : (
                        <Text style={text.submitButtonText}>
                            {I18n.t('disposablePreviewSaveButton')}
                        </Text>
                    )}
                </Button>
            </Container>
        );
    }

    renderItem = ({item}) => {
        return (
            <ListItem>
                <View style={container.fullWidth}>
                    <Body>
                    <Text style={color.text}>{item.name}</Text>
                    </Body>
                    <View style={[container.removeIndenting, {flexDirection: 'row'}]}>
                        <Body style={{flex: 1}}>
                        <Text note>{I18n.t('disposablePreviewBefore')}</Text>
                        <Text note>{I18n.t('disposablePreviewAfter')}</Text>
                        </Body>
                        <Right style={{flex: 2}}>
                            <Text note>{item.beforeAmount} {I18n.t('currency')}</Text>
                            <Text note>{item.afterAmount} {I18n.t('currency')} (
                                {(item.beforeAmount < item.afterAmount) ? '+' : ''}
                                {item.amountDiff} {I18n.t('currency')})
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
    const {
        categories,
        selectedCategories,
    } = state.category;
    const {
        disposableCategorySubtractions,
        disposableLoading,
        disposable,
        tmpDisposable
    } = state.disposable;

    const categoryDisposableItems = _.map(selectedCategories, (item, key) => {
        const categorySubtraction = disposableCategorySubtractions.filter((obj) => {
            return obj.categoryID === item.toString();
        });

        const category = categories.filter((obj) => {
            return obj.categoryID === item.toString();
        });

        const amountToSubtract = categorySubtraction[0].amountDifference;
        let amountDiff = amountToSubtract * (-1);
        let categoryOfDebtAmount = 0;

        const beforeAmount = category[0].amount + categoryOfDebtAmount;

        return {
            amountDiff: amountDiff,
            beforeAmount: beforeAmount,
            afterAmount: (beforeAmount - amountToSubtract),
            name: category[0].name,
            categoryID: item
        };
    });

    categoryDisposableItems.push({
        amountDiff: (tmpDisposable - disposable),
        beforeAmount: disposable,
        afterAmount: tmpDisposable,
        name: I18n.t('disposable'),
        categoryID: 'disposable'
    });

    return {
        tmpDisposable,
        categoryDisposableItems,
        disposableLoading,
        budgetID
    };
};

const mapDispatchToProps = {
    editDisposable,
    resetDisposableError,
    getCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(DisposablePreview);
