import React, {PureComponent} from 'react';
import {FlatList, Text, View} from 'react-native';
import {
    Container,
    Form,
    Input,
    Item,
    Label,
    ListItem,
    Body,
    Button, Spinner
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
    render() {
        console.log(this.props.isBudgetCreated);
        return (
            <Container>
                <Form style={container.incomeFormStyle}>
                    <Label style={text.defaultText}>
                        {I18n.t('budgetIncome')}
                    </Label>

                    <Item rounded style={input.inputField}>
                        <Input
                            onChangeText={this.props.onIncomeChanged}
                            amount={this.props.income}
                            keyboardType="numeric"
                        />
                    </Item>
                </Form>

                <Separator/>

                <Form style={{flex: 4, alignItems: 'stretch'}}>
                    <FlatList
                        data={this.props.categories}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                        style={container.removeIndenting}
                    />
                </Form>

                <Separator/>

                <View style={container.spacedTextWrapper}>
                    <View style={container.parenBudgetSummary}>
                        <View style={container.spacedTextChild}>
                            <Text style={text.listText}>
                                {I18n.t('budgetTotalExpenses')}
                            </Text>
                            <Text style={text.listText}>{this.props.totalExpenses} kr</Text>
                        </View>

                        <View style={container.spacedTextChild}>
                            <Text style={text.listText}>
                                {I18n.t('budgetDisposable')}
                            </Text>
                            <Text style={[text.listText,
                                this.props.disposable >= 0 ? {color: 'black'} : {color: 'red'}]}>
                                {this.props.disposable} kr
                            </Text>
                        </View>
                    </View>
                </View>

                <Form>
                    <Button rounded
                            onPress={this.props.handleSubmit}
                            style={button.defaultButton}
                    >
                        {this.props.loading ? (
                            <Spinner color='#D0D0D0'/>) : (
                            <Text style={text.submitButtonText}>
                                {this.props.isBudgetCreated ?
                                    I18n.t('editBudgetButton') : I18n.t('createBudgetButton')}
                            </Text>
                        )}
                    </Button>
                </Form>
            </Container>
        );
    }

    renderItem = ({item}) => {
        return (
            <ListItem key={item.id}>
                <Body>
                <Label style={text.defaultText}>{item.name + ":"}</Label>
                <Item rounded style={input.inputField}>
                    <Input
                        onChangeText={this.props.onCategoryChanged.bind(this, item.name)}
                        amount={item.amount}
                        keyboardType="numeric"
                        style={{width: '90%', fontSize: 13}}
                    />
                </Item>
                </Body>
            </ListItem>
        );
    };
}