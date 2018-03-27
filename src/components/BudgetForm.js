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
import Separator from "./Separator";
import {container, text, button, input} from "../style/";

export class BudgetForm extends PureComponent {
    render() {
        return (
            <Container>
                {/*---INCOME FIELD<---*/}
                <Form style={container.incomeFormStyle}>
                    <Label style={text.defaultText}>Indkomst:</Label>
                    <Item rounded style={input.inputField}>
                        <Input
                            onChangeText={this.props.onIncomeChanged}
                            amount={this.props.income}
                            keyboardType="numeric"
                        />
                    </Item>
                </Form>

                <Separator/>

                {/*---LISTVIEW---*/}
                <Form style={{flex: 4, alignItems: 'stretch'}}>
                    <FlatList
                        data={this.props.categories}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id}
                        style={container.removeIndenting}
                    />
                </Form>

                <Separator/>

                {/*---CALCULATED TOTAL---*/}
                <View style={container.spacedTextWrapper}>
                    <View style={container.parenBudgetSummary}>
                        <View style={container.spacedTextChild}>
                            <Text style={text.listText}>Totale udgifter</Text>
                            <Text style={text.listText}>{this.props.totalExpenses} kr</Text>
                        </View>
                        <View style={container.spacedTextChild}>
                            <Text style={text.listText}>Til rådighed</Text>
                            <Text style={[text.listText,
                                this.props.disposable >= 0 ? {color: 'black'} : {color: 'red'}]}>
                                {this.props.disposable} kr
                            </Text>
                        </View>
                    </View>
                </View>

                {/*---CREATE/EDIT BUTTON---*/}
                <Form>
                    <Button rounded
                            onPress={this.props.handleSubmit}
                            style={button.defaultButton}
                    >
                        {this.props.loading ? (
                            <Spinner color='#D0D0D0'/>) : (
                            <Text style={text.submitButtonText}>
                                {this.props.isBudgetCreated ? 'Gem' : 'Opret budget'}
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