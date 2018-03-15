import React, {Component} from 'react';
import {View, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {Container, Item, Input, Button, Text, Label, List, ListItem, CheckBox, Body, Icon} from 'native-base';
import DatePicker from 'react-native-datepicker'
import Separator from '../components/Separator';

class DebtForm extends Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <Container>
                    <View style={[styles.incomeFormStyle, {paddingTop: 10}]}>
                        <Label style={styles.textStyle}>Navn</Label>
                        <Item rounded style={styles.inputStyle}>
                            <Input/>
                        </Item>
                    </View>

                    <View style={styles.incomeFormStyle}>
                        <Label style={styles.textStyle}>Beløb</Label>
                        <Item rounded style={styles.inputStyle}>
                            <Input
                                keyboardType="numeric"
                            />
                        </Item>
                    </View>

                    <View style={{marginVertical: 10}}>
                        <Separator/>
                    </View>

                    <View style={styles.incomeFormStyle}>
                        <Label style={styles.textStyle}>Angiv ønsket dato for gennemført afbetaling.</Label>
                        <DatePicker
                            style={[styles.inputStyle, {width: '100%'}]}
                            cancelBtnText="Afbryd"
                            confirmBtnText="Ok"
                            iconComponent={<Icon name="md-calendar"/>}
                            customStyles={{
                                dateInput: {
                                    borderRadius: 100,
                                    borderColor: '#001',
                                    borderWidth: 0.5,
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
                        <View style={styles.incomeFormStyle}>
                            <Label style={styles.textStyle}>Angiv kategorier, hvor gælden skal trækkes.</Label>
                        </View>
                        <List

                            dataArray={this.props.categoryItems}
                            renderRow={(item) =>
                                <ListItem>
                                    <CheckBox checked={false}/>
                                    <Body>
                                    <Text>{item.name}</Text>
                                    </Body>
                                </ListItem>
                            }
                        />
                    </View>

                    <View style={{marginTop: 5}}>
                        <Separator/>
                    </View>

                    <Button rounded
                            style={styles.buttonStyle}
                    >
                        <Text style={styles.itemStyle}>Fortsæt</Text>

                    </Button>
                </Container>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    itemStyle: {
        fontWeight: '600',
        alignSelf: 'center',
        color: 'white'
    },
    buttonStyle: {
        width: '90%',
        height: 40,
        backgroundColor: '#1c313a',
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    buttonText: {
        color: '#ffffff'
    },
    incomeFormStyle: {
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 5,
        width: '90%'
    },
    textStyle: {
        fontWeight: '400',
        fontSize: 14,
        alignSelf: 'flex-start',
        marginLeft: 5,
    },
    inputStyle: {
        borderColor: '#001',
        marginLeft: 0,
        marginRight: 0,
        marginTop: 5,
        marginBottom: 5,
        paddingLeft: 0,
        paddingRight: 0,
        alignSelf: 'center',
        height: 40
    }
};

export default DebtForm;
