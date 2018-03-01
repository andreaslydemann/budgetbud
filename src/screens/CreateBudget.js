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
                <Header style={{paddingTop: 15}}>
                    <Body>
                    <Title>Opret budget</Title>
                    </Body>
                </Header>
                <Form style={styles.formStyle}>
                    <Item style={styles.inputStyle} stackedLabel>
                        <Label style={styles.labelStyle}>Indkomst</Label>
                        <Input
                            value={this.props.indkomst}
                            onChangeText={this.onIndkomstChange}
                        >
                        </Input>
                    </Item>
                </Form>
                <Form style={styles.formStyle}>
                    <Item>
                        <List dataArray={items}
                              renderRow={(item) =>
                                  <ListItem noBorder>
                                      <Item style={styles.inputStyle} stackedLabel>
                                          <Label style={styles.labelStyle}>{item}</Label>
                                          <Input
                                              onChangeText={this.onKategoriChange}>
                                          </Input>
                                      </Item>
                                  </ListItem>
                              }>
                        </List>
                    </Item>
                </Form>
                <Form>
                    <Button style={styles.buttonStyle} onPress={this.handleSubmit}>
                        <Text> Opret budget </Text>
                    </Button>
                </Form>
            </Container>
        );
    }
}

const styles = {
    buttonStyle: {
        alignSelf: 'center'
    },
    labelStyle: {
        fontWeight: '600'
    },
    formStyle: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'
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