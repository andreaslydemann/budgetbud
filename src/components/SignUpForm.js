import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {Container, Header, Content, Item, Input, Button} from 'native-base';
import {signUp, phoneChanged} from '../actions/index';

class SignUpForm extends Component {
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
                <Item rounded>
                    <Input placeholder='Tlf: 12 34 56 78'
                           value={this.props.phone}
                           onChangeText={this.onPhoneChange}
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
    const {phone, error} = auth;

    return {phone, error};
};

export default connect(mapStateToProps, {
    signUp, phoneChanged
})(SignUpForm);
