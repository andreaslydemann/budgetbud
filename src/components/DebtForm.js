import React, {Component} from 'react';
import {
    View,
    FlatList,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import {
    Container,
    Item,
    Input,
    Button,
    Text,
    Label,
    ListItem,
    CheckBox,
    Body,
    Right,
    Icon,
    Spinner
} from 'native-base';
import DatePicker from 'react-native-datepicker';
import {Separator} from '../components/';
import {
    button,
    container,
    color,
    text,
    input
} from "../style/";
import I18n from "../strings/i18n";
import {checkInputAmount} from "../helpers/validators";

export class DebtForm extends Component {
    onNameChange = (text) => {
        this.props.nameChanged(text);
    };

    onAmountChange = (amount) => {
        amount = amount.replace(/,/g, '.');
        if (checkInputAmount(amount))
            this.props.amountChanged(amount);
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
                    <View style={[container.defaultFormStyle, {paddingTop: 10}]}>
                        <Label style={[text.defaultText, color.text]}>{I18n.t('debtName')}</Label>
                        <Item rounded style={[input.inputField, color.input]}>
                            <Input
                                value={this.props.name}
                                onChangeText={this.onNameChange}
                                placeholder={I18n.t('debtNamePlaceholder')}
                                placeholderTextColor='#7F9BAA'
                                style={color.text}
                            />
                        </Item>
                    </View>

                    <View style={container.defaultFormStyle}>
                        <Label style={[text.defaultText, color.text]}>{I18n.t('debtAmount')}</Label>
                        <Item rounded style={[input.inputField, color.input]}>
                            <Input
                                value={String(this.props.amount)}
                                onChangeText={this.onAmountChange}
                                keyboardType="numeric"
                                placeholder={I18n.t('debtAmountPlaceholder')}
                                placeholderTextColor='#7F9BAA'
                                style={color.text}
                            />
                        </Item>
                    </View>

                    <View style={{marginVertical: 10}}>
                        <Separator/>
                    </View>

                    <View style={container.defaultFormStyle}>
                        <Label style={[text.defaultText, color.text]}>{I18n.t('debtExpirationDate')}</Label>
                        <DatePicker
                            date={this.props.expirationDate}
                            onDateChange={this.onExpirationDateChange}
                            format="DD-MM-YYYY"
                            minDate={new Date()}
                            style={[input.inputField, {width: '100%'}]}
                            cancelBtnText={I18n.t('datePickerCancelButton')}
                            confirmBtnText={I18n.t('datePickerOkButton')}
                            iconComponent={<Icon style={{color: '#295E80'}} name="md-calendar"/>}
                            customStyles={{
                                dateInput: {
                                    borderRadius: 100,
                                    borderColor: '#003755',
                                    backgroundColor: '#F6F7F9',
                                    borderWidth: 1,
                                    marginRight: 5
                                },
                                dateText: {
                                    color: '#003755',
                                    fontSize: 17
                                }
                            }}
                        />
                    </View>

                    <View style={{marginTop: 5, marginBottom: 10}}>
                        <Separator/>
                    </View>

                    <View style={{flex: 2, alignSelf: 'stretch'}}>
                        <View style={container.defaultFormStyle}>
                            <Label style={[text.defaultText, color.text]}>{I18n.t('debtCategories')}</Label>
                        </View>

                        {this.props.categoriesLoading ? (
                            <Container style={{justifyContent: 'center'}}>
                                <Spinner style={{
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }} color='#1c313a'/>
                            </Container>) : (
                            <FlatList
                                data={this.props.categoryItems}
                                renderItem={this.renderItem}
                                keyExtractor={item => item.categoryID}
                            />
                        )}
                    </View>

                    <View style={{marginTop: 5}}>
                        <Separator/>
                    </View>

                    <Button rounded
                            onPress={() => this.props.onContinuePress()}
                            style={[button.defaultButton, color.button]}
                    >
                        {this.props.debtLoading ? (
                            <Spinner color='#D0D0D0'/>) : (
                            <Text style={text.submitButtonText}>{I18n.t('debtContinueButton')}</Text>
                        )}
                    </Button>
                </Container>
            </TouchableWithoutFeedback>
        );
    }

    renderItem = ({item}) => {
        const checked = this.props.selectedCategories.includes(item.categoryID);

        return (
            <ListItem style={{paddingLeft: 9}}>
                <CheckBox
                    style={checked ? color.checkboxChecked : color.checkboxUnchecked}
                    checked={checked}
                    onPress={() => this.onCheckBoxPress(item)}
                />
                <Body>
                <Text style={color.text}>{item.name}</Text>
                </Body>
                <Right style={{paddingRight: 9}}>
                    <Text style={color.text}>{item.amount} {I18n.t('currency')}</Text>
                </Right>
            </ListItem>
        );
    }
}
