import React, {Component} from 'react';
import {Container, Content, List, ListItem, Label, Body, Left, Right, Icon} from "native-base";
import AppHeader from "../components/AppHeader";

class UserDetails extends Component {
    render() {
        return (
            <Container>
                <AppHeader headerText={'Brugeroplysninger'}
                           showBackButton={true}
                           onLeftButtonPress={() => this.props.navigation.pop()}/>

                <Content>
                    <List>
                        <ListItem icon>
                            <Left>
                                <Icon name="md-phone-portrait" />
                            </Left>
                            <Body>
                            <Label>Ændr telefonnummer</Label>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Icon name="md-lock" />
                            </Left>
                            <Body>
                            <Label>Ændr pinkode</Label>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Icon name="md-notifications-outline" />
                            </Left>
                            <Body>
                            <Label>Slet bruger</Label>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward" />
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

export default UserDetails;
