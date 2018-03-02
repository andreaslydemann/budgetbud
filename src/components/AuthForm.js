import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Container, Item, Input, Button, Form, Label} from 'native-base';

class AuthForm extends Component {
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

    getPlaceholderText() {
        if (this.props.isSignIn)
            return ("Pinkode")
        else
            return ("Telefonnummer");
    }

    getButtonText() {
        if (this.props.isSignIn)
            return ("Log ind")
        else
            return ("Godkend");
    }

    render() {
        const placeholderText = this.getPlaceholderText();
        const buttonText = this.getButtonText();

        return (
            <Container style={styles.container}>
                <Form style={{width: 300}}>
                    <Item rounded style={styles.itemStyle}>
                        <Input value={this.props.cprNumber}
                               onChangeText={this.props.onCprNumberChange}
                               keyboardType="numeric"
                               placeholder="CPR-nummer"
                               placeholderTextColor='rgba(255,255,255,0.6)'
                               style={styles.inputStyle}
                        />
                    </Item>

                    <Item rounded style={styles.itemStyle}>
                        <Input value={this.props.secondInput}
                               onChangeText={this.props.onSecondInputChange}
                               keyboardType="numeric"
                               placeholder={placeholderText}
                               placeholderTextColor='rgba(255,255,255,0.6)'
                               style={styles.inputStyle}
                        />
                    </Item>

                    {this.renderError()}

                    <Button rounded
                            onPress={this.props.handleSubmit}
                            style={styles.buttonStyle}
                    >
                        <Label style={styles.buttonText}>{buttonText}</Label>
                    </Button>
                </Form>
            </Container>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    itemStyle: {
        marginTop: 10,
        height: 40,
        backgroundColor: 'rgba(255, 255,255,0.2)',
        borderBottomWidth: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0
    },
    inputStyle: {
        color: '#ffffff'
    },
    buttonStyle: {
        width: 300,
        height: 40,
        backgroundColor: '#1c313a',
        marginTop: 20,
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff'
    },
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
});

export default AuthForm;
