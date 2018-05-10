import React, {Component} from 'react';
import {connect} from 'react-redux';
import {AppHeader, ConfirmDialog} from "../../components";
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
import I18n from '../../strings/i18n';
import {color, container} from "../../style";
import {showWarningToast} from "../../helpers";
import {
    deleteUser,
    resetAuthError,
    resetAuthCode,
    getPhoneNumber
} from "../../redux/actions";
import {debounce} from "lodash";

class UserDetails extends Component {
    componentWillMount() {
        if (!this.props.phoneNumberInitialized)
            this.props.getPhoneNumber();

        this.props.resetAuthCode();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.authError) {
            showWarningToast(nextProps.authError);
            this.props.resetAuthError();
        }
    }

    deleteUser = () => {
        this.props.deleteUser(() => {
            this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                key: null,
                actions: [NavigationActions.navigate({
                    routeName: "AuthStack"
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
                    loading={this.props.deleteUserLoading}
                    ref={(confirmDialog) => {
                        this.confirmDialog = confirmDialog
                    }}
                />

                <Container>
                    <AppHeader headerText={I18n.t('userDetailsHeader')}
                               infoText={I18n.t('userDetailsInfo')}
                               showBackButton={true}
                               onLeftButtonPress={() => this.props.navigation.pop()}/>

                    <Content>
                        <List>
                            <ListItem icon onPress={debounce(() => {
                                this.props.navigation.navigate("ChangePhoneNumber")
                            }, 400)}>
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
                            <ListItem icon onPress={debounce(() => {
                                this.props.navigation.navigate("ChangeCode")
                            }, 400)}>
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
    return {
        phoneNumberInitialized,
        deleteUserLoading,
        authError
    } = auth;
};

const mapDispatchToProps = {
    deleteUser,
    resetAuthError,
    resetAuthCode,
    getPhoneNumber
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
