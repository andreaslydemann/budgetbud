import React, {Component} from 'react';
import {Image, View, Platform, Dimensions} from 'react-native';
import {Container, Label} from 'native-base';

const deviceHeight = Dimensions.get("window").height;

class Logo extends Component {
    render() {
        return (
            <Container style={styles.container}>
                <Image style={{width: 140, height: 140}}
                       source={require('../../assets/logo.png')}/>
                <View>
                    <Label style={styles.logoText}>Velkommen til BudgetBud</Label>
                </View>
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
        marginBottom: Platform.OS === "android" ? deviceHeight / 10 : deviceHeight / 18,
        color: 'rgba(255, 255, 255, 1)'
    }
};

export default Logo;
