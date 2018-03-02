import React, {Component} from 'react';
import {Container, Item, Input, Button, Form, Label, Icon} from 'native-base';

class AuthForm extends Component {
    render() {
        return (
            <Container style={styles.container}>
                <Form style={{width: '80%'}}>
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
                               placeholder={this.props.isSignIn ? 'Pinkode' : 'Telefonnummer'}
                               placeholderTextColor='rgba(255,255,255,0.6)'
                               style={styles.inputStyle}
                        />
                    </Item>

                    <Button rounded
                            onPress={this.props.handleSubmit}
                            style={styles.buttonStyle}
                    >
                        <Label style={styles.buttonText}>{this.props.isSignIn ? 'Log ind' : 'Godkend'}</Label>
                    </Button>
                </Form>
            </Container>
        )
    };
}

const styles = {
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
        width: '100%',
        height: 40,
        backgroundColor: '#1c313a',
        marginTop: 20,
        justifyContent: 'center'
    },
    buttonText: {
        color: '#ffffff'
    },
};

export default AuthForm;
