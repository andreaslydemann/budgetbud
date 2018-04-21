import React, {PureComponent} from 'react';
import {FlatList, View} from 'react-native';
import {
    Container,
    Input,
    Item,
    Label,
    ListItem,
    Body,
    Button,
    Spinner,
    Text
} from 'native-base';
import {Separator} from '../components/';
import {
    container,
    text,
    button,
    color,
    input
} from "../style/";
import I18n from "../strings/i18n";

export class BudgetForm extends PureComponent {
    render() {
        return (
            <Container>
                <View style={[container.defaultFormStyle, {paddingTop: 10}]}>
                    <Label style={[text.defaultText, color.text]}>
                        {I18n.t('budgetIncomeLabel')}
                    </Label>

                    <Item rounded style={[input.inputField, color.input]}>
                        <Input
                            onChangeText={this.props.onIncomeChanged}
                            value={String(this.props.tmpIncome)}
                            keyboardType="numeric"
                            style={color.text}
                        />
                    </Item>
                </View>

                <View style={{marginTop: 10}}>
                    <Separator/>
                </View>

                <View style={{flex: 4, alignItems: 'stretch'}}>
                    {this.props.todooooooooooooooooooooooooooooooooooooooooooooo ? (
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
                            <Text style={[text.listText, color.text]}>
                                {I18n.t('budgetTotalExpenses')}
                            </Text>
                            <Text
                                style={[text.listText, color.text]}>
                                {(this.props.tmpTotalGoalsAmount).toString()} {I18n.t('currency')}
                            </Text>
                        </View>

                        <View style={container.spacedTextChild}>
                            <Text style={[text.listText, color.text]}>
                                {I18n.t('budgetDisposable')}
                            </Text>
                            <Text style={[
                                text.listText,
                                this.props.tmpDisposable >= 0 ? color.text : {color: 'red'}]}>
                                {this.props.tmpDisposable} {I18n.t('currency')}
                            </Text>
                        </View>
                    </View>
                </View>

                <View>
                    <Button rounded
                            onPress={this.props.handleSubmit}
                            style={[button.defaultButton, color.button]}
                    >
                        {this.props.budgetLoading || this.props.categoriesLoading ? (
                            <Spinner color='#D0D0D0'/>) : (
                            <Text style={text.submitButtonText}>
                                {this.props.budgetID ?
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
                <Label style={[text.defaultText, color.text]}>{item.name}</Label>
                <Item rounded style={[input.inputField, color.input, {width: '97%'}]}>
                    <Input
                        onChangeText={this.props.onCategoryChanged.bind(this, item.name, item.amount)}
                        value={String(item.amount)}
                        keyboardType="numeric"
                        style={[color.text]}
                    />
                </Item>
                </Body>
            </ListItem>
        );
    };
}
