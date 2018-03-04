import React, {Component} from 'react';
import {Body, Button, Container, Header, Icon, Left, Title} from "native-base";
import {Platform} from 'react-native';

class CategorizeTransactions extends Component {
    render() {
        return (
            <Container style={{marginTop: Platform.OS === 'android' ? 24 : 0}}>
                <Header style={styles.headerStyle}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}
                        >
                            <Icon name="menu"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>CategorizeTransactions</Title>
                    </Body>
                </Header>
            </Container>
        );
    }
}

export default CategorizeTransactions;