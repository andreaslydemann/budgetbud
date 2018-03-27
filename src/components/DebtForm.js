import React, {Component} from 'react';
import {View, FlatList, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {Container, Item, Input, Button, Text, Label, ListItem, CheckBox, Body, Right, Icon, Spinner} from 'native-base';
import DatePicker from 'react-native-datepicker'
import Separator from '../components/Separator';
import {button, container, text, input} from "../style/";

export class DebtForm extends Component {
    onNameChange = (text) => {
        this.props.nameChanged(text);
    };

    onAmountChange = (text) => {
        this.props.amountChanged(text);
    };

    onExpirationDateChange = (text) => {
        this.props.expirationDateChanged(text);
    };

    onCheckBoxPress = ({categoryID}) => {
        let tmp = this.props.selectedCategories;

        if (tmp.includes(categoryID)) {
            tmp.splice(tmp.indexOf(categoryID), 1)
        } else {
            tmp.push(categoryID);
        }

        this.props.categoriesSelected(tmp);
    };

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <Container>
                    <View style={[container.incomeFormStyle, {paddingTop: 10}]}>
                        <Label style={text.defaultText}>Navn</Label>
                        <Item rounded style={input.inputField}>
                            <Input
                                value={this.props.name}
                                onChangeText={this.onNameChange}
                            />
                        </Item>
                    </View>

                    <View style={container.incomeFormStyle}>
                        <Label style={text.defaultText}>Beløb</Label>
                        <Item rounded style={input.inputField}>
                            <Input
                                value={String(this.props.amount)}
                                onChangeText={this.onAmountChange}
                                keyboardType="numeric"
                            />
                        </Item>
                    </View>

                    <View style={{marginVertical: 10}}>
                        <Separator/>
                    </View>

                    <View style={container.incomeFormStyle}>
                        <Label style={text.defaultText}>Angiv ønsket dato for gennemført afbetaling.</Label>
                        <DatePicker
                            date={this.props.expirationDate}
                            onDateChange={this.onExpirationDateChange}
                            format="DD-MM-YYYY"
                            style={[input.inputField, {width: '100%'}]}
                            cancelBtnText="Afbryd"
                            confirmBtnText="Ok"
                            iconComponent={<Icon style={{color: '#777777'}} name="md-calendar"/>}
                            customStyles={{
                                dateInput: {
                                    borderRadius: 100,
                                    borderColor: '#001',
                                    borderWidth: 1,
                                    marginRight: 5
                                },
                                dateText: {
                                    color: 'black',
                                    fontSize: 17
                                }
                            }}
                        />
                    </View>

                    <View style={{marginTop: 5, marginBottom: 10}}>
                        <Separator/>
                    </View>

                    <View style={{flex: 2, alignSelf: 'stretch'}}>
                        <View style={container.incomeFormStyle}>
                            <Label style={text.defaultText}>Angiv kategorier, hvor gælden skal trækkes.</Label>
                        </View>

                        {this.props.categoriesLoading ? (
                            <Container style={{justifyContent: 'center'}}>
                                <Spinner style={{
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }} color='#1c313a'/>
                            </Container>) : (
                            < FlatList
                                data={this.props.categoryItems}
                                renderItem={this.renderItem}
                            />
                        )}
                    </View>

                    <View style={{marginTop: 5}}>
                        <Separator/>
                    </View>

                    <Button rounded
                            onPress={() => this.props.onContinuePress()}
                            style={button.defaultButton}
                    >
                        <Text style={text.submitButtonText}>Fortsæt</Text>

                    </Button>
                </Container>
            </TouchableWithoutFeedback>
        );
    }

    renderItem = ({item}) => {
        return (
            <ListItem style={{paddingLeft: 9}}>
                <CheckBox
                    style={{borderColor: '#777777'}}
                    checked={this.props.selectedCategories.includes(item.categoryID)}
                    onPress={() => this.onCheckBoxPress(item)}
                />
                <Body>
                <Text>{item.name}</Text>
                </Body>
                <Right style={{paddingRight: 9}}>
                    <Text>{item.amount} KR</Text>
                </Right>
            </ListItem>
        );
    }
}