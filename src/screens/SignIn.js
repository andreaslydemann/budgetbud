import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Container, Content, Item, Input, Button, Form, Label, Body} from 'native-base';
import {connect} from 'react-redux';
import {signIn, cprNumberChanged, codeChanged} from '../actions/index';
import screenStyles from './ScreenStyles';
import Logo from '../components/Logo';
import SignInForm from '../components/SignInForm';

class SignIn extends Component {
    onCprNumberChange = (text) => {
        this.props.cprNumberChanged(text);
    };

    onCodeChange = (text) => {
        this.props.codeChanged(text);
    };

    handleSubmit = () => {
        const {cprNumber, code} = this.props;
        this.props.signIn({cprNumber, code});
    };

    renderError() {
        if (this.props.error) {
            return (
                <View style={{backgroundColor: 'white'}}>
                    <Text style={screenStyles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            );
        }
    };

    render() {
        return (
            <Container style={screenStyles.container}>

                <Logo/>
                <SignInForm/>

                <Container style={{flexShrink: 1, padding: 13}}>
                    <Container style={styles.optionContainer}>

                        <Button transparent style={styles.optionButton}>
                            <Text style={styles.optionText}>Glempinkode?</Text>
                        </Button>

                        <Button transparent style={styles.optionButton}>
                            <Text style={styles.optionText}>Ny bruger?</Text>
                        </Button>

                    </Container>
                </Container>

            </Container>
        );

        {/*
                <Form>
                    <Item floatingLabel>
                        <Label>CPR-nummer</Label>
                        <Input value={this.props.cprNumber}
                               onChangeText={this.onCprNumberChange}
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

                <Content padder>
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={this.onPress}
                    >
                        <Text>Glemt pinkode?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={this.onPress}
                    >
                        <Text>Ny bruger?</Text>
                    </TouchableOpacity>
                </Content>*/
        }
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#455a64',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 300
    },
    optionContainer: {
        width: 300,
        alignItems: 'flex-start'
    },
    optionText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 16
    },
    optionButton: {
        height: 30,
        paddingLeft: 5
    }
});

const mapStateToProps = ({auth}) => {
    const {cprNumber, code, error} = auth;
    return {cprNumber, code, error};
};

export default connect(mapStateToProps, {
    signIn, cprNumberChanged, codeChanged
})(SignIn);

