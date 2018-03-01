import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Container, Content, Item, Input, Button, Form, Label} from 'native-base';
import {connect} from 'react-redux';
import screenStyles from '../screens/ScreenStyles';
import {CardSection} from "./common/CardSection";


class CreateBudgetForm extends Component {

    render() {
        return (
            <Container style={screenStyles.container}>
                <Card>
                    <CardSection>

                    </CardSection>

                </Card>
            </Container>
        );
    }
}