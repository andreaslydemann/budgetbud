import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Container, Header, Content, Item, Input, Button, Form, Label} from 'native-base';
import {signUp, phoneChanged} from '../actions/index';
import styles from './styles';

class SignUp extends Component {
    onPhoneChange = (text) => {
        this.props.phoneChanged(text);
    };

    // This arrow function doesn't need .bind(this)
    handleSubmit = () => {
        const {phone} = this.props;
        this.props.signUp({phone});
    };

    renderError() {
        if (this.props.error) {
            return (
                <View style={{backgroundColor: 'white'}}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    };

    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <Form>
                        <Item floatingLabel>
                            <Label>CPR-nummer</Label>
                            {/*
                            <Input value={this.props.cpr}
                                   onChangeText={this.onCPRChange}*/}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label>Telefonnummer</Label>
                            <Input value={this.props.code}
                                   onChangeText={this.onPhoneChange}
                            />
                        </Item>
                    </Form>

                    {this.renderError()}

                    <Button onPress={this.handleSubmit}
                            block style={{margin: 15, marginTop: 50}}>
                        <Text>Godkend</Text>
                    </Button>
                </Content>
            </Container>);
    };
}

const mapStateToProps = ({auth}) => {
    const {phone, error} = auth;

    return {phone, error};
};

export default connect(mapStateToProps, {
    signUp, phoneChanged
})(SignUp);
