import React, {Component} from 'react';
import {Body, Button, Header, Icon, Left, Right, Title} from "native-base";

class Header extends Component {
    render() {
        return (
            <Header style={styles.headerStyle}>
                <Left>
                    <Button
                        transparent
                        onPress={() => this.props.onLeftButtonPress}
                    >
                        <Icon name="menu"/>
                    </Button>
                </Left>
                <Body>
                <Title>Settings</Title>
                </Body>
                <Right>
                    <Button
                        transparent
                        onPress={() => this.props.onRightButtonPress}
                    >
                        <Icon name="menu"/>
                    </Button>
                </Right>
            </Header>
        );
    }
}

export default Header;
