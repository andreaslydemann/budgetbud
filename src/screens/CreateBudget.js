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
        this.props.signIn({indkomst, kategori});
    };

    render() {
        var items = ['Kategori 1', 'Kategori 2', 'Kategori 3', 'Kategori 4', 'Kategori 5'];
        return (
            <Container style={screenStyles.container}>
                <Header>
                    <Body>
                        <Title>Opret budget</Title>
                    </Body>
                </Header>
                <Form>
                    <Item>
                        <Input
                            value={this.props.indkomst}
                            onChangeText={this.onIndkomstChange}
                        >
                            <Label>Indkomst</Label>
                        </Input>
                    </Item>
                    <Item>
                        <List dataArray={items}
                            renderRow={(item) =>
                                  <ListItem>
                                      <Label>{item}</Label>
                                      <Input
                                          onChangeText={this.onIndkomstChange}
                                      >
                                      </Input>
                                  </ListItem>
                              }>
                        </List>
                    </Item>
                    <Button style={styles.buttonStyle} primary onPress={this.handleSubmit}>
                        <Text> Opret budget </Text>
                    </Button>
                </Form>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    buttonStyle: {
        alignSelf: 'center'
    }
});

const mapStateToProps = state => {
    return {
        indkomst: state.auth.indkomst,
        kategori: state.auth.kategori
    };
};

export default connect(mapStateToProps, {
    indkomstChanged, kategoriChanged
})(CreateBudget);