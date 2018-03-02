import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {Body, Button, Container, Form, Header, Input, Item, Label, List, ListItem, Title} from 'native-base';
import {connect} from 'react-redux';
import screenStyles from '../screens/ScreenStyles';
import {indkomstChanged, kategoriChanged} from '../actions/index';
import {Seperator} from "../components/common";


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
                <Container style={{alignSelf: 'stretch', paddingTop: '6%'}}>
                    <Header>
                        <Body>
                        <Title>Opret budget</Title>
                        </Body>
                    </Header>
                </Container>
                <Container style={{justifyContent: 'flex-start', alignSelf: 'flex-start'}}>
                    <Form>
                        <Item style={styles.inputStyle} stackedLabel>
                            <Label style={styles.itemStyle}>Indkomst</Label>
                            <Input
                                value={this.props.indkomst}
                                onChangeText={this.onIndkomstChange}>
                            </Input>
                        </Item>
                    </Form>
                </Container>

                <Seperator/>

                {/*---LISTVIEW---*/}
                <Container style={{flex: 4}}>
                        <List dataArray={items}
                              renderRow={(item) =>
                                  <ListItem noBorder style={{paddingBottom: 0}}>
                                      <Item stackedLabel style={{paddingLeft: 0, marginLeft: 0}}>
                                          <Label style={styles.itemStyle}>{item}</Label>
                                          <Input
                                              onChangeText={this.onKategoriChange}>
                                          </Input>
                                      </Item>
                                  </ListItem>
                              }>
                        </List>
                </Container>

                <Seperator/>

                {/*---CALCULATED TOTAL---*/}
                <Container style={{flexGrow: 1, alignSelf: 'stretch'}}>
                    <Form style={styles.leftContainer}>
                        <Text style={styles.itemStyle}>Totale udgifter</Text>
                    </Form>
                    <Form style={styles.leftContainer}>
                        <Text style={styles.itemStyle}>Til rådighed</Text>
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

const styles = StyleSheet.create({
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
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: '5%',
    },
    cardStyle: {
        color: '#1c313a',
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