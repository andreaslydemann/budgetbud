import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import _ from 'lodash';
import {
    AppHeader,
    Separator
} from "../../components/index";
import {
    Container,
    ListItem,
    Body,
    Right,
    Text,
    Spinner,
    CheckBox,
    Button
} from 'native-base';
import I18n from "../../strings/i18n";
import {
    button,
    text,
    list,
    container, color
} from "../../style/index";
import {showWarningToast} from "../../helpers/index";
import {
    accountsSelected,
    getAccounts,
    linkAccounts,
    resetAccountsError
} from "../../redux/actions";

class Accounts extends PureComponent {
    componentWillMount() {
        if (!this.props.accountsInitialized)
            this.props.getAccounts();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.accountsError) {
            showWarningToast(nextProps.accountsError);
            this.props.resetAccountsError();
        }
    }

    onSavePress = () => {
        this.props.linkAccounts(this.props.linkedAccounts, () => {
            this.props.navigation.pop();
        });
    };

    onCheckBoxPress = ({accountID}) => {
        let tmp = this.props.linkedAccounts;

        if (tmp.includes(accountID)) {
            tmp.splice(tmp.indexOf(accountID), 1)
        } else {
            tmp.push(accountID);
        }

        this.props.accountsSelected(tmp);
    };

    render() {
        return (
            <Container style={container.signedInContainer}>
                <AppHeader headerText={I18n.t('accountsHeader')}
                           showBackButton={true}
                           onLeftButtonPress={() => {
                               if (!this.props.linkLoading)
                                   this.props.navigation.pop()
                           }}
                />

                <Container style={{justifyContent: 'center'}}>
                    {this.props.accountsLoading ? (
                        <Spinner style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }} color='#1c313a'/>) : (
                        <FlatList
                            data={this.props.accountItems}
                            renderItem={this.renderItem}
                        />
                    )}
                </Container>

                <Separator/>

                <Button rounded
                        onPress={() => {
                            if (!this.props.linkLoading || !this.props.accountsLoading) {
                                this.onSavePress()
                            }
                        }}
                        style={[button.defaultButton, color.button]}
                >
                    {this.props.linkLoading ? (
                        <Spinner color='#D0D0D0'/>) : (
                        <Text style={text.submitButtonText}>{I18n.t('accountsSaveButton')}</Text>
                    )}
                </Button>
            </Container>
        );
    }

    renderItem = ({item}) => {
        const checked = this.props.linkedAccounts.includes(item.accountID);

        return (
            <ListItem>
                <Body>
                <Text style={color.text}>{item.name}</Text>
                </Body>
                <Right style={list.listItemCheckBoxPadding}>
                    <CheckBox
                        style={checked ? color.checkboxChecked : color.checkboxUnchecked}
                        checked={checked}
                        onPress={() => this.onCheckBoxPress(item)}
                    />
                </Right>
            </ListItem>
        );
    }
}

const mapStateToProps = ({account}) => {
    const {
        accounts,
        linkedAccounts,
        accountsLoading,
        linkLoading,
        accountsError,
        accountsInitialized
    } = account;

    const accountItems = _.map(accounts, (item, key) => {
        return {name: item.name, accountID: item.id, key: key};
    });

    return {
        accountItems,
        linkedAccounts,
        accountsLoading,
        linkLoading,
        accountsError,
        accountsInitialized
    };
};

const mapDispatchToProps = {
    getAccounts,
    linkAccounts,
    accountsSelected,
    resetAccountsError
};

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
