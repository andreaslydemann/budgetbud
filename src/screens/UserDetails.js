import React, {Component} from 'react';
import {connect} from 'react-redux';
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
                    routeName: "SignIn"
                })],
            }));
        });
    };

    render() {
        return (
            <Container>
                <ConfirmDialog
                    title={I18n.t('confirmDialogDeletionHeader')}
                    text={I18n.t('userDetailsConfirmDialogBody')}
                    confirmCallback={() => this.deleteUser()}
                    loading={this.props.loading}
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
                                    <Icon name="md-phone-portrait"/>
                                </Left>
                                <Body>
                                <Label>{I18n.t('userDetailsChangePhoneNumber')}</Label>
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
                                <Label>{I18n.t('userDetailsChangeCode')}</Label>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward"/>
                                </Right>
                            </ListItem>
                            <ListItem icon onPress={() => this.confirmDialog.showDialog()}>
                                <Left>
                                    <Icon name="md-trash"/>
                                </Left>
                                <Body>
                                <Label>{I18n.t('userDetailsDeleteUser')}</Label>
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

const mapDispatchToProps = {
    deleteUser
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
