import React, {Component} from 'react';
import {StyleSheet, Text, Platform} from 'react-native';
import {Body, Button, Container, Form, Header, Input, Item, Label, List, ListItem, Title, Left, Icon} from 'native-base';
import {connect} from 'react-redux';
import screenStyles from '../screens/ScreenStyles';
import {incomeChanged, categoryChanged} from '../actions/index';
import Separator from "../components/Separator";


class CreateBudget extends Component {

    onIncomeChange = (text) => {
        this.props.incomeChanged(text);
    };

    onCategoryChange = (text) => {
        this.props.categoryChanged(text);
    };

    handleSubmit = ({navigate}) => {
        const {income, category} = this.props;
        this.props.createBudget({income, category});
        navigate('budgetPreview')
    };

    render() {
        const items = ['Kategori 1', 'Kategori 2', 'Kategori 3', 'Kategori 4', 'Kategori 5', 'Kategori 6', 'Kategori 7'];
        return (
            <Container style={[{alignItems: 'stretch'}]}>
                {/*---HEADER---*/}
                <Container style={{marginTop: Platform.OS === 'android' ? 24 : 0}}>
                    <Header style={styles.headerStyle}>
                        <Left>
                            <Button
                                transparent
                                onPress={() => this.props.navigation.navigate("DrawerOpen")}
                            >
                                <Icon name="menu" />
                            </Button>
                        </Left>
                        <Body>
                        <Title>Opret budget</Title>
                        </Body>
                    </Header>
                </Container>

                {/*---INCOME FIELD<---*/}
                <Container>
                    <Form style={{alignItems: 'center'}}>
                        <Label style={styles.textStyle}>Indkomst</Label>
                        <Item rounded style={styles.inputStyle}>
                            <Input
                                keyboardType="numeric"
                                value={this.props.income}
                                onChangeText={this.onIncomeChange}>
                            </Input>
                        </Item>
                    </Form>
                </Container>

                <Separator/>

                {/*---LISTVIEW---*/}
                <Container style={{flex: 4, alignItems: 'stretch'}}>
                    <List dataArray={items}
                          renderRow={(item) =>
                              <ListItem style={styles.listItemStyle}>
                                  <Label style={styles.textStyle}>{item}</Label>
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
                    <Form style={styles.leftContainer}>
                        <Text style={[styles.textStyle, {alignSelf: 'flex-start'}]}>Totale udgifter</Text>
                    </Form>
                    <Form style={styles.leftContainer}>
                        <Text style={styles.textStyle}>Til rådighed</Text>
                    </Form>
                </Container>

                {/*---CREATE BUTTON---*/}
                <Container style={{flexGrow: 1}}>
                    <Form>
                        <Button style={styles.buttonStyle} rounded
                                onPress={() => this.props.navigation.navigate('BudgetPreview')}>
                            <Text style={styles.itemStyle}>Opret budget</Text>
                        </Button>
                    </Form>
                </Container>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: '#166a97'
    },
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
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '5%',
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

const mapStateToProps = state => {
    return {
        income: state.auth.income,
        category: state.auth.category
    };
};

export default connect(mapStateToProps, {
    incomeChanged: incomeChanged, categoryChanged: categoryChanged
})(CreateBudget);
