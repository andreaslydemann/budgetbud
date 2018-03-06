import React, {Component} from 'react';
import {Container, Item, Input, Button, Form, Label, Spinner, Icon} from 'native-base';

class AuthForm extends Component {
    renderCprNumberIcon() {
        if (0 < this.props.cprNumber.length && this.props.cprNumber.length < 10)
            return (<Icon name='close-circle' style={{color: '#db000e'}}/>);
        else if (this.props.cprNumber.length === 10)
            return (<Icon name='checkmark-circle' style={{color: '#00d219'}}/>);
    }

    renderSecondInputIcon() {
        const correctLength = this.props.isSignIn ? 4 : 8;

        if (0 < this.props.secondInput.length && this.props.secondInput.length < correctLength)
            return (<Icon name='close-circle' style={{color: '#db000e'}}/>);
        else if (this.props.secondInput.length === correctLength)
            return (<Icon name='checkmark-circle' style={{color: '#00d219'}}/>);
    }

    render() {
        return (
            <Container style={styles.container}>
                <Form style={{width: '80%'}}>
                    <Item rounded style={styles.itemStyle}>
                        <Input value={this.props.cprNumber}
                               onChangeText={this.props.onCprNumberChange}
                               keyboardType="numeric"
                               maxLength={10}
                               placeholder="CPR-nummer"
                               placeholderTextColor='rgba(255,255,255,0.6)'
                               style={styles.inputStyle}
                        />
                        {this.renderCprNumberIcon()}
                    </Item>

                    <Item rounded style={styles.itemStyle}>
                        <Input secureTextEntry={this.props.isSignIn}
                               value={this.props.secondInput}
                               onChangeText={this.props.onSecondInputChange}
                               keyboardType="numeric"
                               maxLength={this.props.isSignIn ? 4 : 8}
                               placeholder={this.props.isSignIn ? 'Pinkode' : 'Telefonnummer'}
                               placeholderTextColor='rgba(255,255,255,0.6)'
                               style={styles.inputStyle}
                        />
                        {this.renderSecondInputIcon()}
                    </Item>

                    <Button rounded
                            onPress={this.props.handleSubmit}
                            style={styles.buttonStyle}
                    >
                        {this.props.loading ? (
                            <Spinner color='#D0D0D0'/>) : (
                            <Label style={styles.buttonText}>
                                {this.props.isSignIn ? 'Log ind' : 'Registrér dig'}
                            </Label>
                        )}
                    </Button>
                </Form>
            </Container>
        );
    }
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
