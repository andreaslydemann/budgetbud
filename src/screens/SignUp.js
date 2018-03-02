import React, {Component} from 'react';
import {StyleSheet, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import {Container, Button, Label} from 'native-base';
import {signUp, cprNumberChanged, phoneNumberChanged} from '../actions/index';
import Logo from '../components/Logo';
import AuthForm from '../components/AuthForm';
import screenStyles from './ScreenStyles';


class SignUp extends Component {
    onCprNumberChange = (text) => {
        this.props.cprNumberChanged(text);
    };

    onPhoneNumberChange = (text) => {
        this.props.phoneNumberChanged(text);
    };

    handleSubmit = () => {
        const {cprNumber, phoneNumber} = this.props;
        this.props.signUp({cprNumber, phoneNumber});
    };

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={screenStyles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <Container style={{alignSelf: 'stretch'}}>

                        <Logo/>

                        <AuthForm handleSubmit={this.handleSubmit}
                                  onCprNumberChange={this.onCprNumberChange}
                                  onSecondInputChange={this.onPhoneNumberChange}
                                  cprNumber={this.props.cprNumber}
                                  secondInput={this.props.phoneNumber}
                                  error={this.props.error}
                                  isSignIn={false}
                        />

                        <Container style={styles.optionContainer}>
                            <Button transparent style={styles.optionButton}>
                                <Label style={styles.optionText}>Allerede registreret?</Label>
                            </Button>
                        </Container>

                    </Container>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        );
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#455a64',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%'
    },
    optionContainer: {
        flexShrink: 1,
        alignItems: 'flex-start',
        alignSelf: 'center',
        width: '80%',
        paddingTop: 13
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
    const {cprNumber, phoneNumber, error} = auth;
    return {cprNumber, phoneNumber, error};
};

export default connect(mapStateToProps, {
    signUp, cprNumberChanged, phoneNumberChanged,
})(SignUp);
