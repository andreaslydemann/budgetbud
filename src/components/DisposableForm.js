import React, {Component} from 'react';
import {View, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {
    Container,
    Item,
    Input,
    Button,
    Text,
    Label,
    List,
    ListItem,
    CheckBox,
    Body
} from 'native-base';
import {Separator} from '../components/';
import {
    button,
    container,
    text,
    input
} from "../style/";

export class DisposableForm extends Component {
    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <Container>
                    <View style={[container.incomeFormStyle, {paddingTop: 10}]}>
                        <Label style={text.defaultText}>Rådighedsbeløb</Label>
                        <Item rounded style={input.inputField}>
                            <Input/>
                        </Item>
                    </View>

                    <View style={{marginVertical: 10}}>
                        <Separator/>
                    </View>

                    <View style={{marginTop: 5, marginBottom: 10}}>
                        <Separator/>
                    </View>

                    <View style={{flex: 2, alignSelf: 'stretch'}}>
                        <View style={container.incomeFormStyle}>
                            <Label style={text.defaultText}>Angiv kategorier, hvor gælden skal trækkes.</Label>
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
                            onPress={() => this.props.onContinuePress()}
                            style={button.defaultButton}
                    >
                        <Text style={text.submitButtonText}>Fortsæt</Text>

                    </Button>
                </Container>
            </TouchableWithoutFeedback>
        );
    }
}