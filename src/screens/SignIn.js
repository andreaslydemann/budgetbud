import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Container, Content, Item, Input, Button, Form, Label} from 'native-base';
import {connect} from 'react-redux';
import {signIn, phoneChanged, codeChanged} from '../actions/index';
import styles from './styles';

class SignIn extends Component {
    onPhoneChange = (text) => {
        this.props.phoneChanged(text);
    };

    onCodeChange = (text) => {
        this.props.codeChanged(text);
    };

    handleSubmit = () => {
        const {phone, code} = this.props;
        this.props.signIn({phone, code});
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
                            <Label>Telefonnummer</Label>
                            <Input value={this.props.phone}
                                   onChangeText={this.onPhoneChange}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label>Pinkode</Label>
                            <Input secureTextEntry
                                   value={this.props.code}
                                   onChangeText={this.onCodeChange}
                            />
                        </Item>
                    </Form>

                    {this.renderError()}

                    <Button onPress={this.handleSubmit}
                            block style={{margin: 15, marginTop: 50}}>
                        <Text>Log ind</Text>
                    </Button>
                </Content>

            </Container>);
    };
}

const mapStateToProps = ({auth}) => {
    const {phone, code, error} = auth;

    return {phone, code, error};
};

export default connect(mapStateToProps, {
    signIn, phoneChanged, codeChanged
})(SignIn);

