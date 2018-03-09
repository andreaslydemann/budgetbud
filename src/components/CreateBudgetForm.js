import React, {PureComponent} from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {
    Button,
    Container,
    Form,
    Input,
    Item,
    Label,
    ListItem,
    View,
    Spinner,
    Body
} from 'native-base';
import Separator from "./Separator";
import AppHeader from "./AppHeader";


class CreateBudgetForm extends PureComponent {
    constructor() {
        super();
        // this.state = {
        //     // name: ['Kategori 1', 'Kategori 2', 'Kategori 3', 'Kategori 4', 'Kategori 5', 'Kategori 6', 'Kategori 7'],
        //
        //
        //     // categoryValue: ['10', '20', '30', '40', '50', '60', '70']
        //     category: [
        //         {name: "Kategori 1", categoryValue: '10'},
        //         {name: "Kategori 2", categoryValue: '20'},
        //         {name: "Kategori 3", categoryValue: '30'},
        //         {name: "Kategori 4", categoryValue: '40'},
        //         {name: "Kategori 5", categoryValue: '50'},
        //         {name: "Kategori 6", categoryValue: '60'},
        //         {name: "Kategori 7", categoryValue: '70'},
        //     ]
        // };
    }

    renderItem = ({item}) => {
        return (
            <ListItem style={{marginLeft: 0}}>
                <Body>
                <Label style={styles.textStyle}>{item.name}</Label>
                <Item rounded style={styles.inputStyle}>
                    <Input
                        value={item.categoryValue}
                        onChangeText={this.props.onCategoryChanged}
                        keyboardType="numeric">
                    </Input>
                </Item>
                </Body>
            </ListItem>
        );
    };

    render() {
        return (
            <Container style={[{alignItems: 'stretch'}]}>
                {/*---HEADER---*/}
                <AppHeader headerText={'Create budget'}
                           onLeftButtonPress={this.props.onMenuPressed}/>

                {/*---INCOME FIELD<---*/}
                <Container>
                    <Form style={{alignItems: 'center'}}>
                        <Label style={styles.textStyle}>Indkomst</Label>
                        <Item rounded style={styles.inputStyle}>
                            <Input
                                onChangeText={this.props.onIncomeChanged}
                                value={this.props.income}
                                keyboardType="numeric"
                            />
                        </Item>
                    </Form>
                </Container>

                <Separator/>

                {/*---LISTVIEW---*/}
                <Container style={{flex: 4, alignItems: 'stretch'}}>
                    <FlatList
                        data={this.props.data}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.name}
                    />
                </Container>

                <Separator/>

                {/*---CALCULATED TOTAL---*/}
                <Container style={{flexGrow: 1, alignSelf: 'stretch'}}>
                    <View style={[styles.leftContainer, {justifyContent: 'space-between'}]}>
                        <Text style={[styles.textStyle, {flex: 1}]}>Totale udgifter</Text>
                        <Text style={[styles.textStyle, {flex: 1}]}>Some number</Text>
                    </View>
                    <View style={[styles.leftContainer, {justifyContent: 'space-between'}]}>
                        <Text style={[styles.textStyle, {flex: 1}]}>Til rådighed</Text>
                        <Text style={[styles.textStyle, {flex: 1}]}>Some number</Text>
                    </View>
                </Container>

                {/*---CREATE BUTTON---*/}
                <Container style={{flexGrow: 1}}>
                    <Form>
                        <Button rounded
                                onPress={this.props.handleSubmit}
                                style={styles.buttonStyle}
                        >
                            {this.props.loading ? (
                                <Spinner color='#D0D0D0'/>) : (
                                <Text style={styles.itemStyle}>Opret budget</Text>
                            )}
                        </Button>
                    </Form>
                </Container>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        width: 300,
        height: 40,
        backgroundColor: '#166a97',
        marginTop: 20,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    itemStyle: {
        fontWeight: '600',
        alignSelf: 'flex-start',
        color: 'white'
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingLeft: '5%',
        paddingRight: '5%'
    },
    listItemStyle: {
        flexDirection: 'column',
        borderBottomColor: '#001',
        borderBottomWidth: 2,
        marginLeft: 0,
        marginRight: 0,
        alignSelf: 'center',
        paddingLeft: 0,
        paddingRight: 0,
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 14,
        alignSelf: 'center'
    },
    inputStyle: {
        borderColor: '#001',
        marginLeft: 0,
        marginRight: 0,
        width: '90%',
        paddingLeft: 0,
        paddingRight: 0,
        alignSelf: 'center',
        height: 40
    }
});

export default CreateBudgetForm;