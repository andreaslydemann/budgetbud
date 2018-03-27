import React, {Component} from 'react';
import {Platform, View} from "react-native";
import {
    Body,
    Button,
    Header,
    Icon,
    Left,
    Right,
    Title,
    Container,
    Label
} from "native-base";
import PopupDialog, {DialogTitle, DialogButton} from 'react-native-popup-dialog';
import I18n from "../strings/i18n";

class AppHeader extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Header style={styles.headerStyle}>
                    <Left style={{flex: 1}}>
                        <Button
                            transparent
                            onPress={() => this.props.onLeftButtonPress()}
                        >
                            {this.props.showBackButton ? (<Icon name="arrow-back"/>)
                                : (<Icon name="menu"/>)}
                        </Button>
                    </Left>

                    <Body style={{flex: 3}}>
                    <Title style={{width: '100%'}}>{this.props.headerText}</Title>
                    </Body>

                    <Right style={{flex: 1}}>
                        <Button
                            transparent
                            onPress={() => this.popupDialog.show()}
                        >
                            <Icon name="ios-information-circle-outline"/>
                        </Button>
                    </Right>
                </Header>

                <PopupDialog
                    width={0.8}
                    dialogTitle={<DialogTitle title={I18n.t('appHeaderInfoHeader')}/>}
                    ref={(popupDialog) => {
                        this.popupDialog = popupDialog
                    }}
                    dismissOnTouchOutside={false}
                    actions={[
                        <DialogButton
                            buttonStyle={styles.dialogButton}
                            textContainerStyle={styles.dialogButtonTextContainer}
                            textStyle={styles.dialogButtonText}
                            text={I18n.t('appHeaderInfoCloseButton')}
                            onPress={() => {
                                this.popupDialog.dismiss();
                            }}
                            key="button-1"
                        />
                    ]}
                >
                    <Container style={styles.dialogContentView}>
                        <Label>{this.props.infoButtonText}</Label>
                    </Container>
                </PopupDialog>
            </View>
        );
    }
}

const styles = {
    container: {
        ...Platform.select({
            ios: {
                zIndex: 1,
            },
            android: {
                marginTop: 24,
            },
        }),
    },
    dialogContentView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dialogButton: {
        height: 30,
        paddingBottom: 48,
        alignSelf: 'stretch'
    },
    dialogButtonTextContainer: {
        backgroundColor: '#002940',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0
    },
    dialogButtonText: {
        color: '#fff'
    }
};

export default AppHeader;
