import React, {Component} from 'react';
import {Body, Button, Header, Icon, Left, Right, Title, Container, Label} from "native-base";
import PopupDialog, {DialogTitle, DialogButton} from 'react-native-popup-dialog';
import {View} from "react-native";
import {color, button} from "../style";
import {container} from "../style/container";

export class AppHeader extends Component {
    render() {
        return (
            <View style={[container.iosElevation, container.androidMargin]}>
                <Header>
                    <Left style={{flex: 0.2}}>
                        <Button
                            transparent
                            onPress={() => this.props.onLeftButtonPress()}
                        >
                            {this.props.showBackButton ? (<Icon name="arrow-back"/>)
                                : (<Icon name="menu"/>)}
                        </Button>
                    </Left>
                    <Body style={{flex: 0.6}}>
                    <Title style={{width: '100%'}}>{this.props.headerText}</Title>
                    </Body>
                    <Right style={{flex: 0.2}}>
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
                    dialogTitle={<DialogTitle title="Hjælpeinformation"/>}
                    ref={(popupDialog) => {
                        this.popupDialog = popupDialog
                    }}
                    dismissOnTouchOutside={false}
                    actions={[
                        <DialogButton
                            buttonStyle={button.headerDialogButton}
                            textContainerStyle={container.dialogButtonTextContainer}
                            textStyle={color.white}
                            text="Luk"
                            onPress={() => {
                                this.popupDialog.dismiss();
                            }}
                            key="button-1"
                        />
                    ]}
                >
                    <Container style={container.xyCenteredFullSpan}>
                        <Label>{this.props.infoButtonText}</Label>
                    </Container>
                </PopupDialog>
            </View>
        );
    }
}