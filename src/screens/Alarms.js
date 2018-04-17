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
import {
    button,
    text,
    list,
    container, color
} from "../style";

class Alarms extends PureComponent {
    render() {
        return (
            <Container style={container.signedInContainer}>
                <AppHeader headerText={I18n.t('alarmsHeader')}
                           showBackButton={true}
                           onLeftButtonPress={() => this.props.navigation.pop()}/>

                <Container style={{flex: 4, justifyContent: 'center'}}>
                </Container>

                <Separator/>

                <Button rounded
                        onPress={() => {
                            if (!this.props.enableLoading) {
                                this.onSavePress()
                            }
                        }}
                        style={[button.defaultButton, color.button]}
                >
                    {this.props.enableLoading ? (
                        <Spinner color='#D0D0D0'/>) : (
                        <Text style={text.submitButtonText}>{I18n.t('alarmsSaveButton')}</Text>
                    )}
                </Button>
            </Container>
        );
    }

    renderItem = ({item}) => {
        const checked = '';

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

const mapStateToProps = ({alarm}) => {
    const {enableLoading} = alarm;

    return {
        enableLoading
    };
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Alarms);
