import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Container, Content, Item, Form, Label, Input, Button, List, ListItem, Header, Body, Title} from 'native-base';
import {connect} from 'react-redux';
import screenStyles from '../screens/ScreenStyles';
import {indkomstChanged, kategoriChanged} from '../actions/index';


class CreateBudget extends Component {

    onIndkomstChange = (text) => {
        this.props.indkomstChanged(text);
    };

    onKategoriChange = (text) => {
        this.props.kategoriChanged(text);
    };

    handleSubmit = () => {
        const {indkomst, kategori} = this.props;
        this.props.createBudget({indkomst, kategori});
    };

    render() {
        var items = ['Kategori 1', 'Kategori 2', 'Kategori 3', 'Kategori 4', 'Kategori 5', 'Kategori 6', 'Kategori 7'];
        return (
            <Container style={screenStyles.container}>
                {/*---HEADER---*/}
                <Container style={{paddingTop: 25, flex: 2}}>
                    <Header>
                        <Body>
                        <Title>Opret budget</Title>
                        </Body>
                    </Header>
                    <Form>
                        <Item style={styles.inputStyle} stackedLabel>
                            <Label style={styles.itemStyle}>Indkomst</Label>
                            <Input
                                value={this.props.indkomst}
                                onChangeText={this.onIndkomstChange}
                            >
                            </Input>
                        </Item>
                    </Form>
                </Container>

                {/*---LISTVIEW---*/}
                <Container style={{flexGrow: 3}}>
                    <Form>
                        <Item>
                            <List dataArray={items}
                                  renderRow={(item) =>
                                      <ListItem noBorder >
                                          <Item stackedLabel>
                                              <Label style={styles.itemStyle}>{item}</Label>
                                              <Input
                                                  onChangeText={this.onKategoriChange}>
                                              </Input>
                                          </Item>
                                      </ListItem>
                                  }>
                            </List>
                        </Item>
                    </Form>
                </Container>

                {/*---CALCULATED TOTAL---*/}
                <Container style={{flexGrow: 1, backgroundColor: '#1c313a'}}>
                    <Form style={styles.leftContainer}>
                        <Item noBorder>
                            <Label style={styles.itemStyle}>Totale udgifter</Label>
                        </Item>
                        <Item noBorder>
                            <Label style={styles.itemStyle}>Til rådighed</Label>
                        </Item>
                    </Form>
                </Container>

                {/*---CREATE BUTTON---*/}
                <Container style={{flexGrow: 1}}>
                    <Form>
                        <Button style={styles.buttonStyle} rounded onPress={this.handleSubmit}>
                            <Text style={styles.itemStyle}> Opret budget </Text>
                        </Button>
                    </Form>
                </Container>
            </Container>
        );
    }
}

const styles = {
    buttonStyle: {
        width: 300,
        height: 40,
        backgroundColor: '#1c313a',
        marginTop: 20,
        justifyContent: 'center'
    },
    itemStyle: {
        fontWeight: '600',
        color: 'white'
    },
    formStyle: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'flex-start'
    }
};

const mapStateToProps = state => {
    return {
        indkomst: state.auth.indkomst,
        kategori: state.auth.kategori
    };
};

export default connect(mapStateToProps, {
    indkomstChanged, kategoriChanged
})(CreateBudget);