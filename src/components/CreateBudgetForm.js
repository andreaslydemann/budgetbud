import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {
    Button,
    Container,
    Form,
    Input,
    Item,
    Label,
    List,
    ListItem,
    View,
    Spinner
} from 'native-base';
import Separator from "./Separator";
import AppHeader from "./AppHeader";


class CreateBudgetForm extends Component {

    render() {
        const items = ['Kategori 1', 'Kategori 2', 'Kategori 3', 'Kategori 4', 'Kategori 5', 'Kategori 6', 'Kategori 7'];
        return (
            <Container style={[{alignItems: 'stretch'}]}>
                {/*---HEADER---*/}
                <AppHeader headerText={'Opret budget'} />

                {/*---INCOME FIELD<---*/}
                <Container>
                    <Form style={{alignItems: 'center'}}>
                        <Label style={styles.textStyle}>Indkomst</Label>
                        <Item rounded style={styles.inputStyle}>
                            <Input
                                value={this.props.income}
                                onChangeText={this.onIncomeChange}
                                keyboardType="numeric"
                            />
                        </Item>
                    </Form>
                </Container>

                <Separator/>

                {/*---LISTVIEW---*/}
                <Container style={{flex: 4, alignItems: 'stretch'}}>
                    <List dataArray={items}
                          renderRow={(item) =>
                              <ListItem style={styles.listItemStyle}>
                                  <Label style={styles.textStyle}>
                                      {item}
                                  </Label>
                                  <Item rounded style={styles.inputStyle}>
                                      <Input
                                          keyboardType="numeric"
                                          onChangeText={this.onCategoryChange}>
                                      </Input>
                                  </Item>
                              </ListItem>
                          }>
                    </List>
                </Container>

                <Separator/>

                {/*---CALCULATED TOTAL---*/}
                <Container style={{flexGrow: 1, alignSelf: 'stretch'}}>
                    <View style={styles.leftContainer}>
                        <Text style={[styles.textStyle, {alignSelf: 'flex-start'}]}>Totale udgifter</Text>
                        <Text style={[styles.textStyle, {alignSelf: 'flex-end'}]}>Some number</Text>
                    </View>
                    <View style={styles.leftContainer}>
                        <Text style={[styles.textStyle, {alignSelf: 'flex-start'}]}>Til rådighed</Text>
                        <Text style={[styles.textStyle, {alignSelf: 'flex-end'}]}>Some number</Text>
                    </View>
                </Container>

                {/*---CREATE BUTTON---*/}
                <Container style={{flexGrow: 1}}>
                    <Form>
                        <Button rounded
                                onPress={() => this.props.handleSubmit}
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
        paddingRight: 0
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 14
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