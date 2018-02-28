import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Container, Content, Item, Input, Button, Form, Label} from 'native-base';
import {connect} from 'react-redux';
import {signIn, cprNumberChanged, codeChanged} from '../actions/index';
import screenStyles from './ScreenStyles';

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
                <View style={{paddingTop: 100, paddingBottom: 50, alignItems: 'center'}}>
                    <Image
                        style={{width: 150, height: 150}}
                        source={require('../../assets/logo.png')}
                    />
                    <Label>BudgetBud</Label>
                </View>

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
                </Content>
            </Container>
        );
    };
}

const styles = StyleSheet.create({
    buttonStyle: {
        padding: 7
    }
});

const mapStateToProps = ({auth}) => {
    const {cprNumber, code, error} = auth;
    return {cprNumber, code, error};
};

export default connect(mapStateToProps, {
    signIn, cprNumberChanged, codeChanged
})(SignIn);

