import React, {Component} from 'react';
import {Image} from 'react-native';
import {Container, Label} from 'native-base';

class Logo extends Component {
    render() {
        return (
            <Container style={styles.container}>
                <Image style={{width: 140, height: 140}}
                       source={require('../../assets/logo.png')}/>
                <Label style={styles.logoText}>Velkommen til BudgetBud</Label>
            </Container>
        )
    }
}

const styles = {
    container: {
        flex: 2,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    logoText: {
        marginTop: 20,
        marginBottom: 40,
        color: 'rgba(255, 255, 255, 1)'
    }
};

export default Logo;
