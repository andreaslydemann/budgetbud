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
import {AppHeader, Separator} from "../components/";
import {connect} from "react-redux";
import {button, text, container} from "../style/";
import {editDisposable} from "../actions";
import I18n from "../strings/i18n";

class DisposablePreview extends Component {
    onSavePress = () => {
        this.props.editDisposable(this.props, () => {
            this.props.navigation.pop(2);
        });
    };

    render() {
        return (
            <Container>
                <AppHeader headerText={I18n.t('disposablePreviewHeader')}
                           showBackButton={true}
                           onLeftButtonPress={() => this.props.navigation.pop()}/>

                <Content style={{flex: 4}}>
                    <FlatList
                        data={this.props.categoryDisposableItems}
                        renderItem={this.renderItem}
                    />
                </Content>

                <Separator/>

                <Button rounded
                        onPress={() => this.onSavePress()}
                        style={button.defaultButton}
                >
                    {this.props.loading ? (
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
                    <Text>{item.name}</Text>
                    </Body>
                    <View style={[container.removeIndenting, {flexDirection: 'row'}]}>
                        <Body style={{flex: 1}}>
                        <Text note>{I18n.t('disposablePreviewBefore')}</Text>
                        <Text note>{I18n.t('disposablePreviewAfter')}</Text>
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
    const {disposable, loading} = state.disposable;
    const {
        categories,
        categorySubtractions,
    } = state.category;

    const categoryDisposableItems = _.map(categoriesOfDisposableIDs, (item, key) => {
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
        disposable,
        loading,
        budgetID,
    };
};

const mapDispatchToProps = {
    editDisposable
};

export default connect(mapStateToProps, mapDispatchToProps)(DisposablePreview);
