import React, {Component} from 'react';
import {Container, Content, List, ListItem, Label, Body, Left, Right, Icon} from "native-base";
import {NavigationActions} from "react-navigation";
import {connect} from 'react-redux';
import AppHeader from "../components/AppHeader";
import ConfirmDialog from '../components/ConfirmDialog';
import {deleteUser} from "../actions";

class UserDetails extends Component {
    deleteUser = () => {
        this.props.deleteUser(() => {
            this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                key: null,
                actions: [NavigationActions.navigate({
                    routeName: "SignIn"})],
            }));
        });
    };

    render() {
        return (
            <Container>
                <ConfirmDialog
                    title="Bekræft sletning"
                    text="Er du sikker på, at du vil gennemføre sletningen af din bruger? Handlingen kan ikke fortrydes."
                    confirmCallback={() => this.deleteUser()}
                    loading={this.props.loading}
                    ref={(confirmDialog) => {
                    this.comfirmDialog = confirmDialog }}
                />

                <Container>
                    <AppHeader headerText={'Brugeroplysninger'}
                               showBackButton={true}
                               onLeftButtonPress={() => this.props.navigation.pop()}/>

                    <Content>
                        <List>
                            <ListItem icon>
                                <Left>
                                    <Icon name="md-phone-portrait"/>
                                </Left>
                                <Body>
                                <Label>Ændr telefonnummer</Label>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward"/>
                                </Right>
                            </ListItem>
                            <ListItem icon>
                                <Left>
                                    <Icon name="md-lock"/>
                                </Left>
                                <Body>
                                <Label>Ændr pinkode</Label>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward"/>
                                </Right>
                            </ListItem>
                            <ListItem icon onPress={() => this.comfirmDialog.showDialog()}>
                                <Left>
                                    <Icon name="md-trash"/>
                                </Left>
                                <Body>
                                <Label>Slet bruger</Label>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward"/>
                                </Right>
                            </ListItem>
                        </List>
                    </Content>
                </Container>
            </Container>
        );
    }
}

const mapStateToProps = ({auth}) => {
    return {loading} = auth;
};

export default connect(mapStateToProps, {
    deleteUser
})(UserDetails);
