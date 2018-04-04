import React, {PureComponent} from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {
    AppHeader,
    Separator
} from "../components/";
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
import I18n from "../strings/i18n";
import {
    getAccounts,
    linkAccounts,
    accountsSelected
} from "../actions";
import {button, text, list} from "../style";

class Accounts extends PureComponent {
    componentWillMount() {
        this.props.getAccounts();
    }

    onSavePress = () => {
        this.props.linkAccounts(this.props.selectedAccounts);
    };

    onCheckBoxPress = ({accountID}) => {
        let tmp = this.props.selectedAccounts;

        if (tmp.includes(accountID)) {
            tmp.splice(tmp.indexOf(accountID), 1)
        } else {
            tmp.push(accountID);
        }

        this.props.accountsSelected(tmp);
    };

    render() {
        return (
            <Container>
                <Container>
                    <AppHeader headerText={I18n.t('accountsHeader')}
                               showBackButton={true}
                               onLeftButtonPress={() => this.props.navigation.pop()}/>

                    <Container style={{flex: 4, justifyContent: 'center'}}>
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
                            onPress={() => {if (!this.props.linkLoading) {this.onSavePress()}}}
                            style={button.defaultButton}
                    >
                        {this.props.linkLoading ? (
                            <Spinner color='#D0D0D0'/>) : (
                            <Text style={text.submitButtonText}>{I18n.t('accountsSaveButton')}</Text>
                        )}
                    </Button>
                </Container>
            </Container>
        );
    }

    renderItem = ({item}) => {
        return (
            <ListItem>
                <Body>
                <Text>{item.name}</Text>
                </Body>
                <Right style={list.listItemCheckBoxPadding}>
                    <CheckBox
                        style={{borderColor: '#777777'}}
                        checked={this.props.selectedAccounts.includes(item.accountID)}
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
        selectedAccounts,
        accountsLoading,
        linkLoading
    } = account;

    const accountItems = _.map(accounts, (item, key) => {
        return {name: item.name, accountID: item.id, key: key};
    });

    return {
        accountItems,
        selectedAccounts,
        accountsLoading,
        linkLoading
    };
};

const mapDispatchToProps = {
    getAccounts,
    linkAccounts,
    accountsSelected,
};

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
