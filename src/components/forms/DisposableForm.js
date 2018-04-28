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
    Spinner
} from 'native-base';
import {Separator} from '../index';
import {
    button,
    container,
    text,
    input
} from "../../style/index";
import I18n from "../../strings/i18n";
import {color} from "../../style/color";

export class DisposableForm extends Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <Container>
                    {this.props.budgetLoading ? (
                        <Container style={{justifyContent: 'center'}}>
                            <Spinner style={{
                                alignItems: 'center',
                                justifyContent: 'center'
                            }} color='#1c313a'/>
                        </Container>) : (
                        <View style={[container.defaultFormStyle, {paddingTop: 10}]}>
                            <Label style={[text.defaultText, color.text,]}>
                                {I18n.t('disposableAmount')}
                            </Label>
                            <Item rounded style={[input.inputField, color.input]}>
                                <Input
                                    value={String(this.props.tmpDisposable)}
                                    onChangeText={this.props.onDisposableChanged}
                                    keyboardType="numeric"
                                    style={color.text}
                                />
                            </Item>
                        </View>
                    )}

                    <View style={{marginTop: 5, marginBottom: 10}}>
                        <Separator/>
                    </View>

                    <View style={{flex: 2, alignSelf: 'stretch'}}>
                        <View style={container.defaultFormStyle}>
                            <Label style={[text.defaultText, color.text]}>{I18n.t('disposableCategories')}</Label>
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
                                keyExtractor={item => item.categoryID}
                            />
                        )}
                    </View>

                    <View style={{marginTop: 5}}>
                        <Separator/>
                    </View>

                    <Button rounded
                            onPress={() => {
                                if (!this.props.disposableCalculationLoading)
                                    this.props.onContinuePressed()
                            }}
                            style={[button.defaultButton, color.button]}
                    >
                        {this.props.disposableCalculationLoading ? (
                            <Spinner color='#D0D0D0'/>) : (
                            <Text style={text.submitButtonText}>{I18n.t('disposableContinueButton')}</Text>
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
                    onPress={() => this.props.onCheckBoxPressed(item)}
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
