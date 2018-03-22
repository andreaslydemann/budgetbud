import React, {PureComponent} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
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

class BudgetForm extends PureComponent {
    render() {
        return (
            <Container>
                {/*---INCOME FIELD<---*/}
                <Form style={styles.incomeFormStyle}>
                    <Label style={styles.textStyle}>Indkomst:</Label>
                    <Item rounded style={styles.inputStyle}>
                        <Input
                            onChangeText={this.props.onIncomeChanged}
                            value={this.props.income}
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
                        keyExtractor={item => item.name}
                        style={styles.listStyle}
                    />
                </Form>

                <Separator/>

                {/*---CALCULATED TOTAL---*/}
                <Form style={{flexGrow: 1, alignSelf: 'stretch'}}>
                    <View style={[styles.leftContainer, {justifyContent: 'space-between', marginTop: 5}]}>
                        <Text style={[styles.textStyle, {flex: 1}]}>Totale udgifter:</Text>
                        <Text style={[styles.textStyle, {flex: 1}]}>{this.props.totalExpenses}</Text>
                    </View>
                    <View style={[styles.leftContainer, {justifyContent: 'space-between'}]}>
                        <Text style={[styles.textStyle, {flex: 1}]}>Til rådighed:</Text>
                        <Text style={[styles.textStyle, {flex: 1}]}>{this.props.disposable}</Text>
                    </View>
                </Form>

                {/*---CREATE BUTTON---*/}
                <Form>
                    <Button rounded
                            onPress={this.props.handleSubmit}
                            style={styles.buttonStyle}
                    >
                        {this.props.loading ? (
                            <Spinner color='#D0D0D0'/>) : (
                            <Text style={styles.itemStyle}>
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
            <ListItem>
                <Body>
                <Label style={styles.textStyle}>{item.name + ":"}</Label>
                <Item rounded style={styles.inputStyle}>
                    <Input
                        onChangeText={this.props.onCategoryChanged.bind(this, item.name)}
                        value={item.amount}
                        keyboardType="numeric"
                        style={{width: '90%', fontSize: 13}}
                    />
                </Item>
                </Body>
            </ListItem>
        );
    };
}

const styles = StyleSheet.create({
    incomeFormStyle: {
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 5,
        width: '90%'
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: '5%',
        marginRight: '5%'
    },
    listStyle: {
        marginLeft: 0,
        marginRight: 0,
        padding: 0,

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
    itemStyle: {
        fontWeight: '600',
        alignSelf: 'flex-start',
        color: 'white'
    }
});

export default BudgetForm;
