import React, {Component} from 'react';
import {Container, Content, Button, Text} from "native-base";
import AppHeader from "../components/AppHeader";
import Separator from '../components/Separator';

class DebtPreview extends Component {
    onSavePress = () => {
        this.props.navigation.pop(2);
    };

    render() {
        return (
            <Container>
                <AppHeader headerText={'Forhåndsvisning'}
                           showBackButton={true}
                           onLeftButtonPress={() => this.props.navigation.pop()}/>

                <Content style={{flex: 4}}>

                </Content>

                <Separator/>

                <Button rounded
                        onPress={() => this.onSavePress()}
                        style={styles.buttonStyle}
                >
                    <Text style={styles.itemStyle}>Gem</Text>

                </Button>
            </Container>
        );
    }
}

const styles = {
    buttonStyle: {
        width: '90%',
        height: 40,
        backgroundColor: '#1c313a',
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    itemStyle: {
        fontWeight: '600',
        alignSelf: 'center',
        color: 'white'
    }
};

export default DebtPreview;
