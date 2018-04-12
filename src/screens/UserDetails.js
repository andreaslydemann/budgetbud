import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppHeader, ConfirmDialog} from "../components/";
import {NavigationActions} from "react-navigation";
import {
    Container,
    Content,
    List,
    ListItem,
    Label,
    Body,
    Left,
    Right,
    Icon
} from "native-base";
import I18n from '../strings/i18n';
import {deleteUser} from "../actions";
import {color, container} from "../style";

class UserDetails extends Component {
    deleteUser = () => {
        this.props.deleteUser(() => {
            this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                key: null,
                actions: [NavigationActions.navigate({
                    routeName: "SignIn"
                })],
            }));
        });
    };

    render() {
        return (
            <Container style={container.signedInContainer}>
                <ConfirmDialog
                    title={I18n.t('confirmDialogDeletionHeader')}
                    text={I18n.t('userDetailsConfirmDialogBody')}
                    confirmCallback={() => this.deleteUser()}
                    authLoading={this.props.authLoading}
                    ref={(confirmDialog) => {
                        this.confirmDialog = confirmDialog
                    }}
                />

                <Container>
                    <AppHeader headerText={I18n.t('userDetailsHeader')}
                               showBackButton={true}
                               onLeftButtonPress={() => this.props.navigation.pop()}/>

                    <Content>
                        <List>
                            <ListItem icon>
                                <Left>
                                    <Icon style={color.darkIcon} name="md-phone-portrait"/>
                                </Left>
                                <Body>
                                <Label style={color.text}>{I18n.t('userDetailsChangePhoneNumber')}</Label>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward"/>
                                </Right>
                            </ListItem>
                            <ListItem icon>
                                <Left>
                                    <Icon style={color.darkIcon} name="md-lock"/>
                                </Left>
                                <Body>
                                <Label style={color.text}>{I18n.t('userDetailsChangeCode')}</Label>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward"/>
                                </Right>
                            </ListItem>
                            <ListItem icon onPress={() => this.confirmDialog.showDialog()}>
                                <Left>
                                    <Icon style={color.darkIcon} name="md-trash"/>
                                </Left>
                                <Body>
                                <Label style={color.text}>{I18n.t('userDetailsDeleteUser')}</Label>
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
    return {authLoading} = auth;
};

const mapDispatchToProps = {
    deleteUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
