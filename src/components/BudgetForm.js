import React, {PureComponent} from 'react';
import {FlatList, Text, View} from 'react-native';
import {
    Container,
    Input,
    Item,
    Label,
    ListItem,
    Body,
    Button,
    Spinner,
    Toast
} from 'native-base';
import {Separator} from '../components/';
import {
    container,
    text,
    button,
    input
} from "../style/";
import I18n from "../strings/i18n";

export class BudgetForm extends PureComponent {

    componentWillReceiveProps(nextProps) {
        if (nextProps.budgetError)
            this.showToast(nextProps.budgetError);
    }

    showToast = (errorMsg) => Toast.show({
        text: errorMsg,
        position: 'bottom',
        buttonText: 'Okay',
        duration: 3000,
        type: 'warning'
    });

    render() {
        return (
            <Container>
                <View style={container.incomeFormStyle}>
                    <Label style={text.listText}>
                        {I18n.t('budgetIncome')}
                    </Label>

                    <Item rounded style={input.inputField}>
                        <Input
                            onChangeText={this.props.onIncomeChanged}
                            value={String(this.props.income)}
                            keyboardType="numeric"
                        />
                    </Item>
                </View>

                <Separator/>

                <View style={{flex: 4, alignItems: 'stretch'}}>
                    {this.props.linkLoading ? (
                        <Spinner color='#1c313a'/>) : (
                        <FlatList
                            data={this.props.tmpCategories}
                            renderItem={this.renderItem}
                            style={container.removeIndenting}
                            keyExtractor={(item, index) => index}
                        />)}
                </View>

                <Separator/>

                <View style={container.spacedTextWrapper}>
                    <View style={container.parentBudgetSummary}>
                        <View style={container.spacedTextChild}>
                            <Text style={text.listText}>
                                {I18n.t('budgetTotalExpenses')}
                            </Text>
                            <Text
                                style={text.listText}>{(this.props.totalGoalsAmount).toString()} {I18n.t('currency')}</Text>
                        </View>

                        <View style={container.spacedTextChild}>
                            <Text style={text.listText}>
                                {I18n.t('budgetDisposable')}
                            </Text>
                            <Text style={[text.listText,
                                this.props.disposable >= 0 ? {color: 'black'} : {color: 'red'}]}>
                                {this.props.disposable} {I18n.t('currency')}
                            </Text>
                        </View>
                    </View>
                </View>

                <View>
                    <Button rounded
                            onPress={
                                !this.props.checkInput(this.props.income, this.props.tmpCategories) ?
                                    this.showToast('Ugyldig indtastning!') :
                                    this.props.handleSubmit
                            }
                            style={button.defaultButton}
                    >
                        {this.props.budgetLoading ? (
                            <Spinner color='#D0D0D0'/>) : (
                            <Text style={text.submitButtonText}>
                                {!this.props.budgetID ?
                                    I18n.t('editBudgetButton') : I18n.t('createBudgetButton')}
                            </Text>
                        )}
                    </Button>
                </View>
            </Container>
        );
    }

    renderItem = ({item}) => {
        return (
            <ListItem>
                <Body>
                <Label style={text.defaultText}>{item.name}</Label>
                <Item rounded style={input.inputField}>
                    <Input
                        onChangeText={this.props.onCategoryChanged.bind(this, item.name)}
                        value={String(item.amount)}
                        keyboardType="numeric"
                        style={{width: '90%', fontSize: 13}}
                    />
                </Item>
                </Body>
            </ListItem>
        );
    };
}
