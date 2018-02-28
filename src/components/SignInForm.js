import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Container, Header, Content, Item, Input, Button} from 'native-base';
import {connect} from 'react-redux';
import {signIn, phoneChanged, codeChanged} from '../actions/index';

class SignInForm extends Component {
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
            <Container style={{width: 250}}>
                <Item rounded>
                    <Input placeholder='Tlf: 12 34 56 78'
                           value={this.props.phone}
                           onChangeText={this.onPhoneChange}
                    />
                </Item>

                <Item rounded>
                    <Input placeholder='Pinkode: 1234'
                           value={this.props.code}
                           onChangeText={this.onCodeChange}
                    />
                </Item>

                {this.renderError()}

                <Button block>
                    <Text onPress={this.handleSubmit}>Primary</Text>
                </Button>
            </Container>);
    };
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

const mapStateToProps = ({auth}) => {
    const {phone, code, error} = auth;

    return {phone, code, error};
};

export default connect(mapStateToProps, {
    signIn, phoneChanged, codeChanged
})(SignInForm);
