import React, {Component} from 'react';
import {View} from "react-native";
import {Container, Label, Spinner} from "native-base";
import PopupDialog, {DialogTitle, DialogButton} from 'react-native-popup-dialog';
import I18n from '../../strings/i18n';
import {
    container,
    text,
    color,
    button,
    spinner
} from "../../style/index";

export class ConfirmDialog extends Component {
    showDialog() {
        this.popupDialog.show();
    }

    dismissDialog() {
        this.popupDialog.dismiss();
    }

    render() {
        return (
            <View style={container.iosElevation}>
                <PopupDialog
                    width={0.8}
                    dialogTitle={<DialogTitle title={this.props.title}/>}
                    ref={(popupDialog) => {
                        this.popupDialog = popupDialog
                    }}
                    dismissOnTouchOutside={false}
                >
                    <Container style={container.yCenteredFullSpan}>
                        {this.props.loading ? (<Spinner color='#1c313a' style={spinner.dialogStandard}/>) : (
                            <View/>)}
                        <View style={[container.justifyCenter, {flex: 4}]}>
                            <Label style={[text.textCenter, color.text]}>{this.props.text}</Label>
                        </View>
                        <View style={container.flexRow}>
                            <DialogButton
                                buttonStyle={button.dialogButton}
                                textContainerStyle={[
                                    container.dialogButtonTextContainer,
                                    color.button,
                                    {
                                        borderBottomLeftRadius: 8,
                                        borderBottomRightRadius: 0,
                                        borderRightWidth: 1,
                                        borderRightColor: '#fff'
                                    }]}
                                textStyle={text.dialogButtonText}
                                text={I18n.t('confirmDialogCancelButton')}
                                onPress={() => {
                                    if (!this.props.loading)
                                        this.popupDialog.dismiss();
                                }}
                                key="button-1"
                            />

                            <DialogButton
                                buttonStyle={button.dialogButton}
                                textContainerStyle={[
                                    container.dialogButtonTextContainer,
                                    color.button,
                                    {
                                        borderBottomLeftRadius: 0,
                                        borderBottomRightRadius: 8,
                                        borderLeftWidth: 1,
                                        borderLeftColor: '#fff'
                                    }]}
                                textStyle={text.dialogButtonText}
                                text={I18n.t('confirmDialogOkButton')}
                                onPress={() => {
                                    if (!this.props.loading)
                                        this.props.confirmCallback();
                                }}
                                key="button-2"
                            />
                        </View>
                    </Container>
                </PopupDialog>
            </View>
        );
    }
}
