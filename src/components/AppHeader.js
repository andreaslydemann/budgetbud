import React, {Component} from 'react';
import PopupDialog, {DialogTitle, DialogButton} from 'react-native-popup-dialog';
import {View} from "react-native";
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
import I18n from "../strings/i18n";
import {container, button, color} from "../style/";

export class AppHeader extends Component {
    render() {
        return (
            <View style={[container.iosElevation, container.androidMargin]}>
                <Header style={{backgroundColor: '#03426A'}}>
                    <Left style={{flex: 0.2}}>
                        <Button
                            transparent
                            onPress={() => this.props.onLeftButtonPress()}
                        >
                            {this.props.showBackButton ? (<Icon style={{color: '#fff'}} name="arrow-back"/>)
                                : (<Icon style={{color: '#fff'}} name="menu"/>)}
                        </Button>
                    </Left>
                    <Body style={{flex: 0.6}}>
                    <Title style={{color: '#fff', width: '100%'}}>{this.props.headerText}</Title>
                    </Body>
                    <Right style={{flex: 0.2}}>
                        <Button
                            transparent
                            onPress={() => this.popupDialog.show()}
                        >
                            <Icon style={{color: '#fff'}} name="ios-information-circle-outline"/>
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
                            buttonStyle={button.headerDialogButton}
                            textContainerStyle={[
                                container.dialogButtonTextContainer,
                                color.button]}
                            textStyle={color.white}
                            text={I18n.t('appHeaderInfoCloseButton')}
                            onPress={() => {
                                this.popupDialog.dismiss();
                            }}
                            key="button-1"
                        />
                    ]}
                >
                    <Container style={container.xyCenteredFullSpan}>
                        <Label style={color.text}>{this.props.infoButtonText}</Label>
                    </Container>
                </PopupDialog>
            </View>
        );
    }
}
