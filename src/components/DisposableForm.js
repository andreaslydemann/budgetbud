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
    text,
    input
} from "../style/";
import I18n from "../strings/i18n";

export class DisposableForm extends Component {

    onAmountChange = (text) => {
        this.props.amountChanged(text);
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
                        <Label style={text.defaultText}>{I18n.t('disposable')}</Label>
                        <Item rounded style={input.inputField}>
                            <Input
                                value={this.props.name}
                                onChangeText={this.onNameChange}
                            />
                        </Item>
                    </View>

                    <View style={{marginTop: 5, marginBottom: 10}}>
                        <Separator/>
                    </View>

                    <View style={{flex: 2, alignSelf: 'stretch'}}>
                        <View style={container.incomeFormStyle}>
                            <Label style={text.defaultText}>{I18n.t('disposableCategories')}</Label>
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
                        <Text style={text.submitButtonText}>{I18n.t('disposableContinueButton')}</Text>
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
                    <Text>{item.amount} {I18n.t('currency')}</Text>
                </Right>
            </ListItem>
        );
    }
}