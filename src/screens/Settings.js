import React, {Component} from 'react';
import {Container, Content, List, ListItem, Label, Body, Left, Right, Icon} from "native-base";
import AppHeader from "../components/AppHeader";

class Settings extends Component {
    render() {
        return (
            <Container>
                <AppHeader headerText={'Indstillinger'}
                           onLeftButtonPress={() => this.props.navigation.navigate("DrawerOpen")}/>

                <Content>
                    <List>
                        <ListItem icon onPress={() => this.props.navigation.navigate("UserDetails")}>
                            <Left>
                                <Icon name="md-person"/>
                            </Left>
                            <Body>
                            <Label>Brugeroplysninger</Label>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward"/>
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Icon name="md-card"/>
                            </Left>
                            <Body>
                            <Label>Konti</Label>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward"/>
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Icon name="md-notifications-outline"/>
                            </Left>
                            <Body>
                            <Label>Alarmer</Label>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward"/>
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Icon name="md-trash"/>
                            </Left>
                            <Body>
                            <Label>Slet budget</Label>
                            </Body>
                            <Right>
                                <Icon name="arrow-forward"/>
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

export default Settings;
